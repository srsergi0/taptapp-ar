import { OfflineCompiler } from '../src/compiler/offline-compiler.js';
import { DetectorLite } from '../src/core/detector/detector-lite.js';
import { Matcher } from '../src/core/matching/matcher.js';
import { Estimator } from '../src/core/estimation/estimator.js';
import { Tracker } from '../src/core/tracker/tracker.js';
import { AR_CONFIG } from '../src/core/constants.js';

// DOM Elements
const inputTarget = document.getElementById('input-target') as HTMLInputElement;
const inputScene = document.getElementById('input-scene') as HTMLInputElement;
const dropTarget = document.getElementById('drop-target') as HTMLDivElement;
const dropScene = document.getElementById('drop-scene') as HTMLDivElement;
const btnDemoTarget = document.getElementById('btn-demo-target') as HTMLButtonElement;
const btnDemoScene = document.getElementById('btn-demo-scene') as HTMLButtonElement;
const btnRunDiag = document.getElementById('btn-run-diag') as HTMLButtonElement;
const targetPreview = document.getElementById('target-preview') as HTMLDivElement;
const scenePreview = document.getElementById('scene-preview') as HTMLDivElement;

const canvasTarget = document.getElementById('canvas-target') as HTMLCanvasElement;
const canvasScene = document.getElementById('canvas-scene') as HTMLCanvasElement;
const canvasMatches = document.getElementById('canvas-matches') as HTMLCanvasElement;
const canvasWarp = document.getElementById('canvas-warp') as HTMLCanvasElement;
const canvasMesh = document.getElementById('canvas-mesh') as HTMLCanvasElement;

const placeholderTarget = document.getElementById('placeholder-target') as HTMLDivElement;
const placeholderScene = document.getElementById('placeholder-scene') as HTMLDivElement;
const placeholderMatches = document.getElementById('placeholder-matches') as HTMLDivElement;
const placeholderWarp = document.getElementById('placeholder-warp') as HTMLDivElement;
const placeholderMesh = document.getElementById('placeholder-mesh') as HTMLDivElement;

const badgeTargetPts = document.getElementById('badge-target-pts') as HTMLSpanElement;
const badgeScenePts = document.getElementById('badge-scene-pts') as HTMLSpanElement;
const badgeWarp = document.getElementById('badge-warp') as HTMLSpanElement;
const badgeMesh = document.getElementById('badge-mesh') as HTMLSpanElement;

const consoleLogs = document.getElementById('console-logs') as HTMLDivElement;
const statusDot = document.getElementById('console-status-dot') as HTMLSpanElement;

const btnFilterAll = document.getElementById('btn-filter-all') as HTMLButtonElement;
const btnFilterHough = document.getElementById('btn-filter-hough') as HTMLButtonElement;
const btnFilterInliers = document.getElementById('btn-filter-inliers') as HTMLButtonElement;

// App State
let targetImg: HTMLImageElement | null = null;
let sceneImg: HTMLImageElement | null = null;
let compiledBuffer: ArrayBuffer | null = null;
let currentFilter: 'all' | 'hough' | 'inliers' = 'all';
let diagnosticData: any = null;

// Logging Utility
function logToConsole(msg: string, type: 'info' | 'error' | 'warning' | 'success' = 'info') {
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.className = `terminal-entry`;
    let msgClass = `entry-msg`;
    if (type === 'error') msgClass += ' entry-error';
    if (type === 'warning') msgClass += ' entry-warning';
    if (type === 'success') msgClass += ' entry-success';
    if (type === 'info') msgClass += ' entry-info';
    
    entry.innerHTML = `<span class="entry-time">[${time}]</span><span class="${msgClass}">${msg}</span>`;
    consoleLogs.appendChild(entry);
    consoleLogs.scrollTop = consoleLogs.scrollHeight;
}

// UI State Helper
function setStatus(active: boolean) {
    if (active) {
        statusDot.className = 'terminal-dot success';
    } else {
        statusDot.className = 'terminal-dot';
    }
}

// Set up triggers
dropTarget.addEventListener('click', () => inputTarget.click());
dropScene.addEventListener('click', () => inputScene.click());

// File upload callbacks
inputTarget.addEventListener('change', () => {
    if (inputTarget.files && inputTarget.files.length > 0) {
        loadTarget(inputTarget.files[0]);
    }
});

inputScene.addEventListener('change', () => {
    if (inputScene.files && inputScene.files.length > 0) {
        loadScene(inputScene.files[0]);
    }
});

btnDemoTarget.addEventListener('click', () => {
    loadDemoTarget();
});

btnDemoScene.addEventListener('click', () => {
    loadDemoScene();
});

// Drag and drop handlers
function setupDragDrop(zone: HTMLDivElement, callback: (f: File) => void) {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.style.borderColor = 'var(--accent)';
    });
    zone.addEventListener('dragleave', () => {
        zone.style.borderColor = 'rgba(99, 102, 241, 0.3)';
    });
    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.style.borderColor = 'rgba(99, 102, 241, 0.3)';
        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
            callback(files[0]);
        }
    });
}
setupDragDrop(dropTarget, loadTarget);
setupDragDrop(dropScene, loadScene);

// Match Filter triggers
btnFilterAll.addEventListener('click', () => {
    setFilter('all');
});
btnFilterHough.addEventListener('click', () => {
    setFilter('hough');
});
btnFilterInliers.addEventListener('click', () => {
    setFilter('inliers');
});

function setFilter(filter: 'all' | 'hough' | 'inliers') {
    currentFilter = filter;
    btnFilterAll.classList.toggle('active', filter === 'all');
    btnFilterHough.classList.toggle('active', filter === 'hough');
    btnFilterInliers.classList.toggle('active', filter === 'inliers');
    
    if (diagnosticData) {
        drawMatchesView();
    }
}

// Load default target demo
function loadDemoTarget() {
    logToConsole('Cargando imagen target demo por defecto...');
    const img = new Image();
    img.onload = () => {
        targetImg = img;
        updatePreview(targetPreview, img, 'test-image.png (Demo)');
        logToConsole('Target demo cargado correctamente. Iniciando pre-compilación...');
        compileTarget();
    };
    img.onerror = () => {
        logToConsole('Error cargando target demo. Asegúrate de compilar y colocar tests/assets/test-image.png.', 'error');
    };
    img.src = './assets/test-image.png';
}

function loadDemoScene() {
    logToConsole('Cargando imagen escena demo...');
    const img = new Image();
    img.onload = () => {
        sceneImg = img;
        updatePreview(scenePreview, img, 'test-image.png (Demo Escena)');
        logToConsole('Imagen escena demo cargada correctamente.', 'success');
    };
    img.onerror = () => {
        logToConsole('Error cargando escena demo.', 'error');
    };
    img.src = './assets/test-image.png';
}

function loadTarget(file: File) {
    logToConsole(`Cargando archivo de target: ${file.name}`);
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            targetImg = img;
            updatePreview(targetPreview, img, file.name);
            logToConsole('Target cargado. Iniciando pre-compilación...');
            compileTarget();
        };
        img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
}

function loadScene(file: File) {
    logToConsole(`Cargando archivo de escena (query): ${file.name}`);
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            sceneImg = img;
            updatePreview(scenePreview, img, file.name);
            logToConsole('Imagen de escena cargada y lista para diagnóstico.', 'success');
        };
        img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
}

function updatePreview(container: HTMLDivElement, img: HTMLImageElement, name: string) {
    container.innerHTML = `
        <div class="target-preview-card">
            <img class="target-preview-img" src="${img.src}">
            <div class="target-preview-info">
                <div class="target-preview-name">${name}</div>
                <div class="target-preview-meta">${img.width}x${img.height}px</div>
            </div>
        </div>
    `;
}

// --- Target Compiler ---
async function compileTarget() {
    if (!targetImg) return;
    
    // Scale target if too big for performance
    const maxDim = 512;
    let w = targetImg.width;
    let h = targetImg.height;
    if (w > maxDim || h > maxDim) {
        if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
        } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
        }
    }
    
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = w;
    tempCanvas.height = h;
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCtx.drawImage(targetImg, 0, 0, w, h);
    const targetData = tempCtx.getImageData(0, 0, w, h);
    
    logToConsole(`Procesando target a resolución de compilación: ${w}x${h}px`);
    const compiler = new OfflineCompiler();
    
    const targetImages = [{
        width: w,
        height: h,
        data: new Uint8Array(targetData.data.buffer)
    }];
    
    try {
        await compiler.compileImageTargets(targetImages, (progress) => {
            // progress updates
        });
        const buffer = compiler.exportData();
        compiledBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
        logToConsole(`Compilación de target finalizada con éxito. Tamaño del buffer: ${(compiledBuffer.byteLength / 1024).toFixed(1)} KB`, 'success');
    } catch (err) {
        logToConsole(`Fallo al compilar el target: ${(err as Error).message}`, 'error');
    }
}

// --- Run Diagnostic Pipeline ---
btnRunDiag.addEventListener('click', () => {
    runDiagnostic();
});

async function runDiagnostic() {
    if (!targetImg || !sceneImg || !compiledBuffer) {
        logToConsole('Faltan recursos: Por favor carga target, escena y espera a que el target se compile.', 'warning');
        return;
    }
    
    setStatus(false);
    logToConsole('--- INICIANDO DIAGNÓSTICO DE DETECCIÓN Y TRACKING ---', 'info');
    
    try {
        // --- 1. Grayscale Conversions ---
        // Resize scene to standard viewport width (640x480) for tracking simulations
        const sceneW = AR_CONFIG.VIEWPORT_WIDTH;
        const sceneH = Math.round((sceneW * sceneImg.height) / sceneImg.width);
        
        const canvasSceneTemp = document.createElement('canvas');
        canvasSceneTemp.width = sceneW;
        canvasSceneTemp.height = sceneH;
        const ctxSceneTemp = canvasSceneTemp.getContext('2d')!;
        ctxSceneTemp.drawImage(sceneImg, 0, 0, sceneW, sceneH);
        
        const sceneImgData = ctxSceneTemp.getImageData(0, 0, sceneW, sceneH);
        const sceneGrayscale = new Uint8Array(sceneW * sceneH);
        for (let i = 0; i < sceneGrayscale.length; i++) {
            const offset = i * 4;
            sceneGrayscale[i] = (sceneImgData.data[offset] * 77 + sceneImgData.data[offset + 1] * 150 + sceneImgData.data[offset + 2] * 29) >> 8;
        }
        
        logToConsole(`Escena escalada a resolución del tracker: ${sceneW}x${sceneH}px`);
        
        // --- 2. Initial Matching (Detection Phase) ---
        // Detect keypoints in query/scene image
        logToConsole('Ejecutando DetectorLite sobre la imagen de escena...');
        const detector = new DetectorLite(sceneW, sceneH, {
            useLSH: AR_CONFIG.USE_LSH,
            maxFeaturesPerBucket: AR_CONFIG.MAX_FEATURES_PER_BUCKET
        });
        const { featurePoints: sceneFeatures } = detector.detect(sceneGrayscale);
        logToConsole(`DetectorLite: Encontró ${sceneFeatures.length} puntos en la escena.`);
        
        // Decode .taar target keyframe matching data
        logToConsole('Decodificando matchingDataList del target compiled...');
        const decoderResult = compilerImport(compiledBuffer);
        const targetMatchingData = decoderResult.matchingDataList[0];
        
        const maximaCount = targetMatchingData[0].max.x.length;
        const minimaCount = targetMatchingData[0].min.x.length;
        logToConsole(`Target compilado contiene: Maxima=${maximaCount} puntos, Minima=${minimaCount} puntos.`);
        
        // Match features on main thread
        logToConsole('Ejecutando Matcher en hilo principal con debugMode activado...');
        const matcher = new Matcher(sceneW, sceneH, true);
        const matchResult = matcher.matchDetection(targetMatchingData, sceneFeatures);
        
        const debugFrame = matchResult.debugExtra?.frames?.[0] || {};
        const allMatches = debugFrame.constellationMatches || [];
        const houghMatches = debugFrame.houghMatches || [];
        const inliers = debugFrame.inlierMatches || [];
        const isDeformable = debugFrame.deformableResult ? true : false;
        const deformableInliers = debugFrame.deformableResult?.inliers || [];
        
        logToConsole(`Detección Completada:`);
        logToConsole(`- Coincidencias de descriptor iniciales: ${allMatches.length}`);
        logToConsole(`- Coincidencias filtradas por Hough: ${houghMatches.length}`);
        
        let hasPose = false;
        let modelViewTransform: number[][] | null = null;
        
        if (matchResult.keyframeIndex !== -1) {
            hasPose = true;
            const estimator = new Estimator(buildProjectionTransform(sceneW, sceneH));
            modelViewTransform = estimator.estimate({
                screenCoords: matchResult.screenCoords,
                worldCoords: matchResult.worldCoords
            });
            logToConsole(`- RANSAC Homografía: ¡CONSEGUIDO! ${inliers.length} inliers encontrados.`, 'success');
        } else if (isDeformable && debugFrame.deformableResult) {
            hasPose = true;
            logToConsole(`- RANSAC Deformable (Consenso Espectral): ¡CONSEGUIDO! ${deformableInliers.length} inliers.`, 'success');
            // Estimate translation pose matrix using spectral inliers
            const estimator = new Estimator(buildProjectionTransform(sceneW, sceneH));
            modelViewTransform = estimator.estimate({
                screenCoords: deformableInliers.map((m: any) => m.querypoint),
                worldCoords: deformableInliers.map((m: any) => ({ x: m.keypoint.x + 0.5, y: m.keypoint.y + 0.5, z: 0 }))
            });
        } else {
            logToConsole(`- Detección fallida: Consensus RANSAC por debajo de los inliers mínimos (${AR_CONFIG.MIN_NUM_INLIERS}).`, 'error');
        }
        
        // --- 3. Tracking Warping simulation ---
        let trackerResult: any = null;
        if (hasPose && modelViewTransform) {
            logToConsole('Simulando fase de Tracking (warp, matching en deformación, y relajación de malla)...');
            const tracker = new Tracker(
                decoderResult.markerDimensions,
                decoderResult.trackingDataList,
                buildProjectionTransform(sceneW, sceneH),
                sceneW,
                sceneH,
                true
            );
            
            trackerResult = tracker.track(sceneGrayscale, modelViewTransform, 0);
            logToConsole(`Tracking simulado completado: octaveIndex=${trackerResult.octaveIndex}, goodTrack=${trackerResult.indices.length} puntos.`, 'success');
            
            if (trackerResult.deformedMesh) {
                logToConsole(`Malla deformable relajada con éxito: ${trackerResult.deformedMesh.triangles.length / 3} triángulos construidos.`, 'success');
            } else {
                logToConsole(`Malla deformable no generada: faltan características suficientes en la región.`, 'warning');
            }
        }
        
        // Store diagnostic data for renderers
        diagnosticData = {
            sceneW,
            sceneH,
            sceneGrayscale,
            sceneFeatures,
            targetMatchingData,
            trackingDataList: decoderResult.trackingDataList,
            allMatches,
            houghMatches,
            inliers: isDeformable ? deformableInliers : inliers,
            isDeformable,
            hasPose,
            modelViewTransform,
            trackerResult
        };
        
        // Trigger Render Card elements
        drawTargetView();
        drawSceneView();
        drawMatchesView();
        drawWarpView();
        drawMeshView();
        
        setStatus(true);
        logToConsole('--- DIAGNÓSTICO FINALIZADO CORRECTAMENTE ---', 'success');
        
    } catch (err) {
        logToConsole(`Error en diagnóstico: ${(err as Error).message}`, 'error');
        console.error(err);
    }
}

// --- Import buffer and decode taar data ---
function compilerImport(buffer: ArrayBuffer) {
    const compiler = new OfflineCompiler();
    const result = compiler.importData(buffer);
    
    // Extract targets dimensions
    const markerDimensions = result.dataList.map((item: any) => [item.targetImage.width, item.targetImage.height]);
    const trackingDataList = result.dataList.map((item: any) => item.trackingData);
    const matchingDataList = result.dataList.map((item: any) => item.matchingData);
    
    return { markerDimensions, trackingDataList, matchingDataList };
}

// --- Build standard projectionTransform ---
function buildProjectionTransform(w: number, h: number) {
    const fovy = (AR_CONFIG.DEFAULT_FOVY * Math.PI) / 180;
    const f = h / 2 / Math.tan(fovy / 2);
    return [
        [f, 0, w / 2],
        [0, f, h / 2],
        [0, 0, 1],
    ];
}

// --- Render Card: Target View ---
function drawTargetView() {
    if (!targetImg || !diagnosticData) return;
    
    placeholderTarget.style.display = 'none';
    const targetW = targetImg.width;
    const targetH = targetImg.height;
    
    canvasTarget.width = targetW;
    canvasTarget.height = targetH;
    
    const ctx = canvasTarget.getContext('2d')!;
    ctx.drawImage(targetImg, 0, 0);
    
    // Draw target features
    const keyframe = diagnosticData.targetMatchingData[0];
    const octave0 = keyframe?.[0];
    const scaleX = octave0 ? (targetW / octave0.w) : 1.0;
    const scaleY = octave0 ? (targetH / octave0.h) : 1.0;
    
    const maxima = octave0?.max || { x: [] };
    const minima = octave0?.min || { x: [] };
    
    badgeTargetPts.textContent = `${maxima.x.length + minima.x.length} Puntos`;
    
    // Draw Maxima (Cyan)
    ctx.fillStyle = 'rgba(6, 182, 212, 0.7)';
    for (let i = 0; i < maxima.x.length; i++) {
        ctx.beginPath();
        ctx.arc(maxima.x[i] * scaleX, maxima.y[i] * scaleY, 3, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    // Draw Minima (Purple)
    ctx.fillStyle = 'rgba(168, 85, 247, 0.7)';
    for (let i = 0; i < minima.x.length; i++) {
        ctx.beginPath();
        ctx.arc(minima.x[i] * scaleX, minima.y[i] * scaleY, 3, 0, 2 * Math.PI);
        ctx.fill();
    }
}

// --- Render Card: Scene View ---
function drawSceneView() {
    if (!sceneImg || !diagnosticData) return;
    
    placeholderScene.style.display = 'none';
    const { sceneW, sceneH, sceneFeatures } = diagnosticData;
    
    canvasScene.width = sceneW;
    canvasScene.height = sceneH;
    
    const ctx = canvasScene.getContext('2d')!;
    ctx.drawImage(sceneImg, 0, 0, sceneW, sceneH);
    
    badgeScenePts.textContent = `${sceneFeatures.length} Puntos`;
    
    // Draw Scene Features (Yellow)
    ctx.fillStyle = 'rgba(245, 158, 11, 0.7)';
    for (const f of sceneFeatures) {
        ctx.beginPath();
        ctx.arc(f.x, f.y, 2.5, 0, 2 * Math.PI);
        ctx.fill();
    }
}

// --- Render Card: Matches Connection Visualizer ---
function drawMatchesView() {
    if (!targetImg || !sceneImg || !diagnosticData) return;
    
    placeholderMatches.style.display = 'none';
    const { allMatches, houghMatches, inliers } = diagnosticData;
    
    let selectedMatches = allMatches;
    let color = 'rgba(6, 182, 212, 0.3)'; // Cyan
    if (currentFilter === 'hough') {
        selectedMatches = houghMatches;
        color = 'rgba(168, 85, 247, 0.5)'; // Purple
    } else if (currentFilter === 'inliers') {
        selectedMatches = inliers;
        color = 'rgba(16, 185, 129, 0.8)'; // Emerald
    }
    
    const targetW = targetImg.width;
    const targetH = targetImg.height;
    const sceneW = diagnosticData.sceneW;
    const sceneH = diagnosticData.sceneH;
    
    // Joint Canvas (Target on the left, Scene on the right)
    canvasMatches.width = targetW + sceneW + 20; // 20px gap
    canvasMatches.height = Math.max(targetH, sceneH);
    
    const ctx = canvasMatches.getContext('2d')!;
    ctx.fillStyle = '#0f111a';
    ctx.fillRect(0, 0, canvasMatches.width, canvasMatches.height);
    
    // Draw images
    ctx.drawImage(targetImg, 0, 0, targetW, targetH);
    ctx.drawImage(sceneImg, targetW + 20, 0, sceneW, sceneH);
    
    // Calculate target scaling
    const keyframe = diagnosticData.targetMatchingData[0];
    const octave0 = keyframe?.[0];
    const scaleTargetX = octave0 ? (targetW / octave0.w) : 1.0;
    const scaleTargetY = octave0 ? (targetH / octave0.h) : 1.0;
    
    // Draw connection lines
    ctx.lineWidth = 1.5;
    for (const m of selectedMatches) {
        const qp = m.querypoint;
        const kp = m.keypoint;
        
        // Scale kp coordinates from target compiled resolution to visualizer targetImg scale
        const targetX = kp.x * scaleTargetX;
        const targetY = kp.y * scaleTargetY;
        
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(targetX, targetY);
        ctx.lineTo(targetW + 20 + qp.x, qp.y);
        ctx.stroke();
        
        // Draw keypoint dots
        ctx.fillStyle = 'rgba(236, 72, 153, 0.8)';
        ctx.beginPath();
        ctx.arc(targetX, targetY, 3, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = 'rgba(245, 158, 11, 0.8)';
        ctx.beginPath();
        ctx.arc(targetW + 20 + qp.x, qp.y, 3, 0, 2 * Math.PI);
        ctx.fill();
    }
}

// --- Render Card: Warped Projected view ---
function drawWarpView() {
    if (!diagnosticData) return;
    
    placeholderWarp.style.display = 'none';
    const { trackerResult, hasPose } = diagnosticData;
    
    if (!hasPose || !trackerResult || !trackerResult.debugExtra?.projectedImage) {
        badgeWarp.textContent = 'NO POSE';
        badgeWarp.className = 'diag-badge badge-pink';
        canvasWarp.width = 100;
        canvasWarp.height = 100;
        const ctx = canvasWarp.getContext('2d')!;
        ctx.clearRect(0,0,100,100);
        placeholderWarp.style.display = 'block';
        placeholderWarp.textContent = 'Pose no encontrada. Imposible calcular proyección.';
        return;
    }
    
    badgeWarp.textContent = 'PROYECTADO';
    badgeWarp.className = 'diag-badge badge-emerald';
    
    // Get projected image buffer
    const projImage = trackerResult.debugExtra.projectedImage; // Float32Array
    
    // Target octaves prebuiltData width and height
    const keyframe = trackerResult.debugExtra.octaveIndex;
    const marker = trackerResult.debugExtra.goodTrack.length > 0;
    
    // Retrieve correct dimensions from trackingDataList using keyframe octave index
    const trackingOctaves = diagnosticData.trackingDataList?.[0];
    const octaveWidth = trackingOctaves?.[keyframe]?.w || 256;
    const octaveHeight = trackingOctaves?.[keyframe]?.h || 256;
    
    canvasWarp.width = octaveWidth;
    canvasWarp.height = octaveHeight;
    const ctx = canvasWarp.getContext('2d')!;
    
    // Draw projected pixels
    const imgData = ctx.createImageData(octaveWidth, octaveHeight);
    for (let i = 0; i < projImage.length; i++) {
        const val = Math.min(255, Math.max(0, projImage[i]));
        const offset = i * 4;
        imgData.data[offset] = val;     // R
        imgData.data[offset + 1] = val; // G
        imgData.data[offset + 2] = val; // B
        imgData.data[offset + 3] = 255; // A
    }
    ctx.putImageData(imgData, 0, 0);
}

// --- Render Card: Deformable Mesh Alignment overlay ---
function drawMeshView() {
    if (!sceneImg || !diagnosticData) return;
    
    placeholderMesh.style.display = 'none';
    const { trackerResult, hasPose, sceneW, sceneH } = diagnosticData;
    
    canvasMesh.width = sceneW;
    canvasMesh.height = sceneH;
    const ctx = canvasMesh.getContext('2d')!;
    ctx.drawImage(sceneImg, 0, 0, sceneW, sceneH);
    
    if (!hasPose || !trackerResult || !trackerResult.deformedMesh) {
        badgeMesh.textContent = 'SIN MALLA';
        badgeMesh.className = 'diag-badge badge-pink';
        return;
    }
    
    badgeMesh.textContent = 'ACTIVO';
    badgeMesh.className = 'diag-badge badge-pink';
    
    // Draw relaxed mesh triangles and vertices
    const { vertices, triangles } = trackerResult.deformedMesh;
    
    ctx.strokeStyle = 'rgba(236, 72, 153, 0.7)'; // Neon Pink
    ctx.lineWidth = 1.5;
    
    // Draw triangles
    for (let i = 0; i < triangles.length; i += 3) {
        const idx0 = triangles[i] * 2;
        const idx1 = triangles[i + 1] * 2;
        const idx2 = triangles[i + 2] * 2;
        
        ctx.beginPath();
        ctx.moveTo(vertices[idx0], vertices[idx0 + 1]);
        ctx.lineTo(vertices[idx1], vertices[idx1 + 1]);
        ctx.lineTo(vertices[idx2], vertices[idx2 + 1]);
        ctx.closePath();
        ctx.stroke();
    }
    
    // Draw vertices
    ctx.fillStyle = 'rgba(236, 72, 153, 0.9)';
    for (let i = 0; i < vertices.length; i += 2) {
        ctx.beginPath();
        ctx.arc(vertices[i], vertices[i + 1], 2.5, 0, 2 * Math.PI);
        ctx.fill();
    }
}

// --- Auto Load Defaults on Page Startup ---
async function autoLoadResources() {
    logToConsole('Iniciando carga automática de recursos por defecto (test-image.png y test-query.jpg)...');
    
    // Load target image
    const targetPromise = new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('No se pudo cargar ./assets/test-image.png'));
        img.src = './assets/test-image.png';
    });

    // Load scene image
    const scenePromise = new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('No se pudo cargar ./assets/test-query.jpg'));
        img.src = './assets/test-query.jpg';
    });

    try {
        const [tImg, sImg] = await Promise.all([targetPromise, scenePromise]);
        
        targetImg = tImg;
        updatePreview(targetPreview, tImg, 'test-image.png (Target)');
        
        sceneImg = sImg;
        updatePreview(scenePreview, sImg, 'test-query.jpg (Escena)');
        
        logToConsole('Recursos cargados correctamente. Compilando e iniciando diagnóstico...');
        await compileTarget();
        
        runDiagnostic();
    } catch (err) {
        logToConsole(`Error en carga automática: ${(err as Error).message}`, 'warning');
        logToConsole('Por favor, asegúrate de colocar "test-query.jpg" en "tests/assets/" o cárgala manualmente usando la barra lateral.', 'info');
    }
}

window.addEventListener('load', () => {
    autoLoadResources();
});
