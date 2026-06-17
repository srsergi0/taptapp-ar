import { BioInspiredController } from '../src/runtime/bio-inspired-controller.js';
import { OfflineCompiler } from '../src/compiler/offline-compiler.js';
import { AR_CONFIG } from '../src/core/constants.js';

// DOM Elements
const videoFeed = document.getElementById('video-feed') as HTMLVideoElement;
const renderCanvas = document.getElementById('render-canvas') as HTMLCanvasElement;
const uploadPanel = document.getElementById('upload-panel') as HTMLDivElement;
const dragZone = document.getElementById('drag-zone') as HTMLDivElement;
const fileInput = document.getElementById('file-input') as HTMLInputElement;
const btnUseDefault = document.getElementById('btn-use-default') as HTMLButtonElement;
const btnReset = document.getElementById('btn-reset') as HTMLButtonElement;
const btnStopTracking = document.getElementById('btn-stop-tracking') as HTMLButtonElement;
const compilerProgressContainer = document.getElementById('compiler-progress-container') as HTMLDivElement;
const compilerProgressBar = document.getElementById('compiler-progress-bar') as HTMLDivElement;
const compilerStatusText = document.getElementById('compiler-status-text') as HTMLDivElement;
const trackerStatusBar = document.getElementById('tracker-status-bar') as HTMLDivElement;
const targetDetailsContainer = document.getElementById('target-details-container') as HTMLDivElement;

const toggleBio = document.getElementById('toggle-bio') as HTMLInputElement;
const toggleMesh = document.getElementById('toggle-mesh') as HTMLInputElement;
const togglePoints = document.getElementById('toggle-points') as HTMLInputElement;

const valFps = document.getElementById('val-fps') as HTMLSpanElement;
const valInliers = document.getElementById('val-inliers') as HTMLSpanElement;
const valMode = document.getElementById('val-mode') as HTMLSpanElement;
const valOctave = document.getElementById('val-octave') as HTMLSpanElement;
const consoleLogs = document.getElementById('console-logs') as HTMLDivElement;

// Constants & Settings
const WIDTH = AR_CONFIG.VIEWPORT_WIDTH; // 640
const HEIGHT = AR_CONFIG.VIEWPORT_HEIGHT; // 480

// Offscreen canvas for scaling camera frames & uploading targets
const processingCanvas = document.createElement('canvas');
processingCanvas.width = WIDTH;
processingCanvas.height = HEIGHT;
const processingCtx = processingCanvas.getContext('2d')!;

const debugCtx = renderCanvas.getContext('2d')!;

// App State
let controller: BioInspiredController | null = null;
let isRunning = false;
let currentTargetImgData: ImageData | null = null;
let currentTargetName = '';
let lastFrameTime = performance.now();
let frameCount = 0;
let fps = 0.0;
let activeTargetIndex = 0;
let lastScreenCoords: any[] | null = null;
let lastDeformedMesh: any = null;
let lastFoveaCenter: any = null;
let activeTracks = new Map<number, any>();

// Logging Utility
function logToConsole(msg: string, type: 'info' | 'error' | 'warning' = 'info') {
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.className = `log-entry`;
    if (type === 'error') entry.classList.add('log-error');
    if (type === 'warning') entry.classList.add('log-warning');
    entry.innerHTML = `<span class="log-time">[${time}]</span>${msg}`;
    consoleLogs.appendChild(entry);
    consoleLogs.scrollTop = consoleLogs.scrollHeight;
}

// Adjust render canvas dimensions dynamically to overlap video element correctly
function resizeRenderCanvas() {
    const rect = videoFeed.getBoundingClientRect();
    renderCanvas.width = rect.width;
    renderCanvas.height = rect.height;
    logToConsole(`Canvas de renderizado redimensionado: ${rect.width.toFixed(0)}x${rect.height.toFixed(0)}px`);
}
window.addEventListener('resize', resizeRenderCanvas);

// --- File Selection & Drop Zone Handlers ---
dragZone.addEventListener('click', (e) => {
    if (e.target !== btnUseDefault) {
        fileInput.click();
    }
});

dragZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dragZone.style.borderColor = 'var(--accent)';
});

dragZone.addEventListener('dragleave', () => {
    dragZone.style.borderColor = 'rgba(99, 102, 241, 0.3)';
});

dragZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dragZone.style.borderColor = 'rgba(99, 102, 241, 0.3)';
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
        handleImageFile(files[0]);
    }
});

fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    if (files && files.length > 0) {
        handleImageFile(files[0]);
    }
});

btnUseDefault.addEventListener('click', (e) => {
    e.stopPropagation();
    loadDemoImage();
});

// Process image file
function handleImageFile(file: File) {
    currentTargetName = file.name;
    logToConsole(`Imagen elegida: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            processSelectedImage(img);
        };
        img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
}

// Load default demo target
async function loadDemoImage() {
    currentTargetName = 'test-image.png (Demo)';
    logToConsole('Cargando imagen demo por defecto...');
    try {
        const img = new Image();
        img.onload = () => {
            processSelectedImage(img);
        };
        img.onerror = () => {
            logToConsole('Error al cargar la imagen demo. Asegúrate de compilar y colocar el recurso en tests/assets.', 'error');
        };
        img.src = './assets/test-image.png';
    } catch (err) {
        logToConsole(`Error cargando imagen demo: ${(err as Error).message}`, 'error');
    }
}

function processSelectedImage(img: HTMLImageElement) {
    // Determine dimensions (max target size e.g. 512 for optimization)
    const maxDim = 512;
    let w = img.width;
    let h = img.height;
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
    tempCtx.drawImage(img, 0, 0, w, h);
    
    currentTargetImgData = tempCtx.getImageData(0, 0, w, h);
    logToConsole(`Imagen procesada a resolución de target: ${w}x${h}px`);
    
    // Update target details in sidebar
    targetDetailsContainer.innerHTML = `
        <div class="target-card">
            <img class="target-thumb" src="${tempCanvas.toDataURL()}">
            <div class="target-info">
                <div class="target-name">${currentTargetName}</div>
                <div class="target-meta">${w}x${h}px</div>
            </div>
        </div>
    `;

    // Start compiling target
    compileAndStartAR();
}

// --- Compilation and Controller Launch ---
async function compileAndStartAR() {
    if (!currentTargetImgData) return;

    compilerProgressContainer.style.display = 'block';
    compilerProgressBar.style.width = '0%';
    compilerStatusText.textContent = 'Inicializando compilador...';

    logToConsole('Compilando target con Laplacian Eigenmaps...');
    const compiler = new OfflineCompiler();
    
    const targetImages = [
        {
            width: currentTargetImgData.width,
            height: currentTargetImgData.height,
            data: new Uint8Array(currentTargetImgData.data.buffer)
        },
        {
            width: currentTargetImgData.width,
            height: currentTargetImgData.height,
            data: new Uint8Array(currentTargetImgData.data.buffer)
        }
    ];

    try {
        await compiler.compileImageTargets(targetImages, (progress) => {
            compilerProgressBar.style.width = `${progress}%`;
            compilerStatusText.textContent = `Compilando target: ${Math.round(progress)}%`;
        });

        compilerStatusText.textContent = 'Guardando datos compilados...';
        const buffer = compiler.exportData();
        const cleanBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
        
        logToConsole('Compilación exitosa. Inicializando AR Controller...');

        // Setup controller
        controller = new BioInspiredController({
            inputWidth: WIDTH,
            inputHeight: HEIGHT,
            debugMode: true,
            maxTrack: 2,
            bioInspired: {
                enabled: toggleBio.checked,
                aggressiveSkipping: true
            },
            onUpdate: handleARUpdate
        });

        await controller.addImageTargetsFromBuffer(cleanBuffer);
        logToConsole('AR Controller configurado. Solicitando acceso a la cámara...');

        // Start video feed
        await startCamera();

        // UI transitions
        uploadPanel.classList.add('hidden');
        btnReset.style.display = 'inline-flex';
        btnStopTracking.style.display = 'inline-flex';
        resizeRenderCanvas();

        // Run loop
        isRunning = true;
        lastFrameTime = performance.now();
        frameCount = 0;
        requestAnimationFrame(renderLoop);

        logToConsole('¡Visualización AR en marcha!', 'info');
        trackerStatusBar.textContent = 'Buscando imagen objetivo...';

    } catch (err) {
        logToConsole(`Error durante compilación/inicio: ${(err as Error).message}`, 'error');
        compilerStatusText.textContent = 'Error al iniciar';
        compilerProgressBar.style.backgroundColor = '#ef4444';
    }
}

// Webcam start
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            },
            audio: false
        });
        videoFeed.srcObject = stream;
        
        return new Promise<void>((resolve) => {
            videoFeed.onloadedmetadata = () => {
                videoFeed.play();
                resolve();
            };
        });
    } catch (err) {
        logToConsole(`Fallo al acceder a la webcam: ${(err as Error).message}`, 'error');
        alert('No se pudo acceder a la webcam. Por favor concede permisos.');
        throw err;
    }
}

// Stop Camera
function stopCamera() {
    const stream = videoFeed.srcObject as MediaStream;
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    videoFeed.srcObject = null;
    logToConsole('Cámara apagada.');
}

// --- Main AR Run Loop ---
function renderLoop(time: number) {
    if (!isRunning) return;

    try {
        // Calculate FPS
        frameCount++;
        const elapsed = time - lastFrameTime;
        if (elapsed >= 1000) {
            fps = (frameCount * 1000) / elapsed;
            valFps.textContent = fps.toFixed(1);
            frameCount = 0;
            lastFrameTime = time;
        }

        // Draw current camera frame to offscreen processing canvas (scaled to fit)
        drawVideoToCanvas(processingCtx, videoFeed, WIDTH, HEIGHT);

        // Trigger process frame
        if (controller) {
            controller.processVideo(processingCanvas);
        }
    } catch (err) {
        logToConsole(`Error en renderLoop: ${(err as Error).message}`, 'error');
        console.error(err);
    }

    requestAnimationFrame(renderLoop);
}

// Draw video element to target bounds on canvas
function drawVideoToCanvas(ctx: CanvasRenderingContext2D, videoEl: HTMLVideoElement, targetW: number, targetH: number) {
    const videoW = videoEl.videoWidth;
    const videoH = videoEl.videoHeight;
    if (videoW === 0 || videoH === 0) return;

    const videoRatio = videoW / videoH;
    const targetRatio = targetW / targetH;

    let sx = 0, sy = 0, sw = videoW, sh = videoH;
    if (videoRatio > targetRatio) {
        sw = videoH * targetRatio;
        sx = (videoW - sw) / 2;
    } else {
        sh = videoW / targetRatio;
        sy = (videoH - sh) / 2;
    }

    ctx.drawImage(videoEl, sx, sy, sw, sh, 0, 0, targetW, targetH);
}

// --- Handle Updates from Controller ---
function handleARUpdate(data: any) {
    if (!isRunning) return;

    try {
        // Dynamically adjust render canvas dimension to overlap video stream perfectly
        const rect = videoFeed.getBoundingClientRect();
        if (renderCanvas.width !== rect.width || renderCanvas.height !== rect.height) {
            renderCanvas.width = rect.width;
            renderCanvas.height = rect.height;
        }

        const scaleX = renderCanvas.width / WIDTH;
        const scaleY = renderCanvas.height / HEIGHT;

        if (data.type === 'updateMatrix') {
            const { targetIndex, worldMatrix, screenCoords, deformedMesh, foveaCenter, skipped } = data;
            const hasDetection = targetIndex !== undefined && targetIndex >= 0 && worldMatrix !== null;

            if (hasDetection) {
                if (!skipped) {
                    if (!activeTracks.has(targetIndex)) {
                        activeTracks.set(targetIndex, {});
                    }
                    const track = activeTracks.get(targetIndex);
                    track.screenCoords = screenCoords || null;
                    track.deformedMesh = deformedMesh || null;
                    track.foveaCenter = foveaCenter || null;
                    track.octaveIndex = data.octaveIndex !== undefined ? data.octaveIndex : 0;
                    track.skipped = false;
                } else if (activeTracks.has(targetIndex)) {
                    activeTracks.get(targetIndex).skipped = true;
                }
            } else {
                activeTracks.delete(targetIndex);
            }
        }

        if (data.type === 'processDone') {
            // Clear canvas
            debugCtx.clearRect(0, 0, renderCanvas.width, renderCanvas.height);

            let totalInliers = 0;
            let isAnyDeformable = false;
            let activeOctave = 0;

            for (const [targetIndex, track] of activeTracks.entries()) {
                const currentScreenCoords = track.screenCoords;
                const currentDeformedMesh = track.deformedMesh;
                const currentFoveaCenter = track.foveaCenter;

                if (currentScreenCoords) {
                    totalInliers += currentScreenCoords.length;
                    if (currentDeformedMesh) isAnyDeformable = true;
                    activeOctave = track.octaveIndex;

                    // Draw tracking points / corners (Green)
                    if (togglePoints.checked && currentScreenCoords.length >= 4) {
                        drawBoundingBox(currentScreenCoords, scaleX, scaleY);
                    }

                    // Draw non-rigid mesh overlay (Pink)
                    if (toggleMesh.checked && currentDeformedMesh) {
                        drawDeformableMesh(currentDeformedMesh, scaleX, scaleY);
                    }

                    // Draw foveal attention region (Blue dashed circle)
                    if (toggleBio.checked && currentFoveaCenter) {
                        drawFoveaAttention(currentFoveaCenter, scaleX, scaleY);
                    }
                }
            }

            // Update UI status/telemetry
            if (activeTracks.size > 0) {
                trackerStatusBar.textContent = `Tracking ${activeTracks.size} targets [Inliers: ${totalInliers}]`;
                valInliers.textContent = totalInliers.toString();
                valMode.textContent = isAnyDeformable ? 'DEFORMABLE' : 'PLANAR';
                valMode.className = 'stat-value success';
                valOctave.textContent = activeOctave.toString();
            } else {
                trackerStatusBar.textContent = 'Buscando imagen objetivo...';
                valInliers.textContent = '0';
                valMode.textContent = 'OFF';
                valMode.className = 'stat-value warning';
                valOctave.textContent = '-';
            }
        }
    } catch (err) {
        logToConsole(`Error en handleARUpdate: ${(err as Error).message}`, 'error');
        console.error(err);
    }
}

// Draw standard tracking green bounding box
function drawBoundingBox(coords: any[], sx: number, sy: number) {
    debugCtx.strokeStyle = 'rgba(16, 185, 129, 0.85)'; // Emerald green
    debugCtx.lineWidth = 3;
    debugCtx.setLineDash([]);
    
    // Check if we have 4 corner points
    if (coords.length >= 4) {
        debugCtx.beginPath();
        debugCtx.moveTo(coords[0].x * sx, coords[0].y * sy);
        debugCtx.lineTo(coords[1].x * sx, coords[1].y * sy);
        debugCtx.lineTo(coords[3].x * sx, coords[3].y * sy);
        debugCtx.lineTo(coords[2].x * sx, coords[2].y * sy);
        debugCtx.closePath();
        debugCtx.stroke();
    }

    // Optional: Draw keypoints
    debugCtx.fillStyle = 'rgba(16, 185, 129, 0.6)';
    for (const p of coords) {
        debugCtx.beginPath();
        debugCtx.arc(p.x * sx, p.y * sy, 3, 0, 2 * Math.PI);
        debugCtx.fill();
    }
}

// Draw Deformable mesh (Pink outline and dots)
function drawDeformableMesh(deformedMesh: { vertices: Float32Array; triangles: Uint16Array }, sx: number, sy: number) {
    const { vertices, triangles } = deformedMesh;
    debugCtx.strokeStyle = 'rgba(236, 72, 153, 0.7)'; // Vibrant pink
    debugCtx.lineWidth = 1.5;
    debugCtx.setLineDash([]);
    
    // Draw all triangles of the mesh
    for (let i = 0; i < triangles.length; i += 3) {
        const idx0 = triangles[i] * 2;
        const idx1 = triangles[i + 1] * 2;
        const idx2 = triangles[i + 2] * 2;

        debugCtx.beginPath();
        debugCtx.moveTo(vertices[idx0] * sx, vertices[idx0 + 1] * sy);
        debugCtx.lineTo(vertices[idx1] * sx, vertices[idx1 + 1] * sy);
        debugCtx.lineTo(vertices[idx2] * sx, vertices[idx2 + 1] * sy);
        debugCtx.closePath();
        debugCtx.stroke();
    }

    // Draw vertex dots
    debugCtx.fillStyle = 'rgba(236, 72, 153, 0.9)';
    for (let i = 0; i < vertices.length; i += 2) {
        debugCtx.beginPath();
        debugCtx.arc(vertices[i] * sx, vertices[i + 1] * sy, 2.5, 0, 2 * Math.PI);
        debugCtx.fill();
    }
}

// Draw foveal attention circle (Blue)
function drawFoveaAttention(foveaCenter: { x: number; y: number }, sx: number, sy: number) {
    if (!foveaCenter) return;
    
    debugCtx.strokeStyle = 'rgba(59, 130, 246, 0.5)'; // Blue attention boundary
    debugCtx.lineWidth = 2;
    debugCtx.setLineDash([4, 4]); // Dashed circle
    
    debugCtx.beginPath();
    // A fovea is about 15% of viewport width in target coordinates (640px)
    const radius = 640 * 0.15 * sx; 
    debugCtx.arc(foveaCenter.x * sx, foveaCenter.y * sy, radius, 0, 2 * Math.PI);
    debugCtx.stroke();
    
    // Draw center dot
    debugCtx.fillStyle = 'rgba(59, 130, 246, 0.8)';
    debugCtx.beginPath();
    debugCtx.arc(foveaCenter.x * sx, foveaCenter.y * sy, 4, 0, 2 * Math.PI);
    debugCtx.fill();
    debugCtx.setLineDash([]); // Reset
}

// --- Toggle Config Listeners ---
toggleBio.addEventListener('change', () => {
    if (controller) {
        controller.setBioEnabled(toggleBio.checked);
        logToConsole(`Orquestador Bio-Inspired: ${toggleBio.checked ? 'Habilitado' : 'Deshabilitado'}`);
    }
});

// --- Reset / Clean App ---
function resetPlayground() {
    isRunning = false;
    stopCamera();
    
    if (controller) {
        controller.dispose();
        controller = null;
    }

    lastScreenCoords = null;
    lastDeformedMesh = null;
    lastFoveaCenter = null;
    activeTracks.clear();

    // Clean canvases
    debugCtx.clearRect(0, 0, renderCanvas.width, renderCanvas.height);
    
    // UI Transitions
    uploadPanel.classList.remove('hidden');
    compilerProgressContainer.style.display = 'none';
    btnReset.style.display = 'none';
    btnStopTracking.style.display = 'none';
    trackerStatusBar.textContent = 'Esperando imagen objetivo...';
    
    valFps.textContent = '0.0';
    valInliers.textContent = '0';
    valMode.textContent = 'OFF';
    valMode.className = 'stat-value warning';
    valOctave.textContent = '-';

    logToConsole('Playground reiniciado.');
}

btnReset.addEventListener('click', resetPlayground);
btnStopTracking.addEventListener('click', resetPlayground);
