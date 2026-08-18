import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useLocus } from 'locus-ar/client';

declare const THREE: any;

const DEFAULT_TARGET = '../tests/assets/test-image.png';
const DEFAULT_QUERY = '../tests/assets/test-query.jpg';

export const TabUseLocus: React.FC = () => {
    const [feedMode, setFeedMode] = useState<'test-query.jpg' | 'test-image.png' | 'camera'>('test-query.jpg');
    const [feedDims, setFeedDims] = useState<{ width: number; height: number }>({ width: 1547, height: 871 });
    const [fps, setFps] = useState(60);
    const [latency, setLatency] = useState('0.0');

    const containerRef = useRef<HTMLDivElement | null>(null);
    const feedCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const threeCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const currentFeedImageRef = useRef<HTMLImageElement | null>(null);

    const sceneRef = useRef<any>(null);
    const cameraRef = useRef<any>(null);
    const rendererRef = useRef<any>(null);
    const anchorGroupRef = useRef<any>(null);

    const targets = useMemo(() => [
        { image: DEFAULT_TARGET, label: 'Locus Marker' }
    ], []);

    const config = useMemo(() => ({
        width: feedDims.width,
        height: feedDims.height,
        maxTrack: 1,
        bioInspired: true,
        debugMode: false
    }), [feedDims.width, feedDims.height]);

    const { state, detections, compilationProgress, error, start, stop, getProjectionMatrix } = useLocus(targets, config);

    const activeDetection = detections.length > 0 ? detections[0] : null;
    const inliers = activeDetection?.inliersCount || 0;

    const loadImage = (url: string): Promise<HTMLImageElement> => {
        return new Promise((res, rej) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => res(img);
            img.onerror = rej;
            img.src = url;
        });
    };

    // 1. Initialize Three.js Scene
    useEffect(() => {
        if (!threeCanvasRef.current) return;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.Camera();
        camera.matrixAutoUpdate = false;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({
            canvas: threeCanvasRef.current,
            alpha: true,
            antialias: true
        });
        renderer.setPixelRatio(1);
        renderer.setSize(feedDims.width, feedDims.height, false);
        rendererRef.current = renderer;

        const anchorGroup = new THREE.Group();
        anchorGroup.matrixAutoUpdate = false;
        anchorGroup.visible = false;
        scene.add(anchorGroup);
        anchorGroupRef.current = anchorGroup;

        // 🟩 Glowing 3D Target Plane
        const planeGeo = new THREE.PlaneGeometry(1, 1);
        const planeMat = new THREE.MeshBasicMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.45,
            side: THREE.DoubleSide
        });
        const plane = new THREE.Mesh(planeGeo, planeMat);
        anchorGroup.add(plane);

        const edges = new THREE.EdgesGeometry(planeGeo);
        const lineMat = new THREE.LineBasicMaterial({ color: 0x818cf8, linewidth: 3 });
        const border = new THREE.LineSegments(edges, lineMat);
        anchorGroup.add(border);

        // Center Marker Icon
        const centerGeo = new THREE.RingGeometry(0.08, 0.12, 32);
        const centerMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide });
        const centerMesh = new THREE.Mesh(centerGeo, centerMat);
        anchorGroup.add(centerMesh);

        let isMounted = true;
        let animationFrameId: number;
        let lastTime = performance.now();
        let frameCounter = 0;

        const animate = () => {
            const now = performance.now();
            const delta = now - lastTime;
            lastTime = now;
            frameCounter++;

            if (frameCounter % 15 === 0) {
                setFps(Math.round(1000 / Math.max(delta, 1)));
                setLatency(delta.toFixed(1));
            }

            if (feedCanvasRef.current && currentFeedImageRef.current && feedMode !== 'camera') {
                const ctx = feedCanvasRef.current.getContext('2d');
                ctx?.drawImage(currentFeedImageRef.current, 0, 0, feedCanvasRef.current.width, feedCanvasRef.current.height);
            }

            renderer.render(scene, camera);

            if (isMounted) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animate();

        return () => {
            isMounted = false;
            cancelAnimationFrame(animationFrameId);
            renderer.dispose();
        };
    }, []);

    // 2. Start initial feed tracking with test-query.jpg
    useEffect(() => {
        let isCancelled = false;

        async function initFeed() {
            const img = await loadImage(DEFAULT_QUERY);
            if (isCancelled) return;
            currentFeedImageRef.current = img;

            const w = img.naturalWidth || 1547;
            const h = img.naturalHeight || 871;
            setFeedDims({ width: w, height: h });

            if (feedCanvasRef.current && threeCanvasRef.current && rendererRef.current) {
                feedCanvasRef.current.width = w;
                feedCanvasRef.current.height = h;
                threeCanvasRef.current.width = w;
                threeCanvasRef.current.height = h;
                rendererRef.current.setSize(w, h, false);

                const ctx = feedCanvasRef.current.getContext('2d')!;
                ctx.drawImage(img, 0, 0, w, h);

                await start(feedCanvasRef.current);
            }
        }

        initFeed();

        return () => {
            isCancelled = true;
            stop();
        };
    }, [start, stop]);

    // 3. Sync Three.js camera projection & anchor group from useLocus detections
    useEffect(() => {
        if (cameraRef.current) {
            const proj = getProjectionMatrix();
            if (proj && proj.length === 16) {
                cameraRef.current.projectionMatrix.fromArray(proj);
            }
        }

        if (anchorGroupRef.current) {
            if (activeDetection && activeDetection.worldMatrix) {
                anchorGroupRef.current.visible = true;
                anchorGroupRef.current.matrix.fromArray(activeDetection.worldMatrix);
            } else {
                anchorGroupRef.current.visible = false;
            }
        }
    }, [activeDetection, getProjectionMatrix]);

    // Switch Feed Source
    const switchFeed = async (url: string, mode: 'test-query.jpg' | 'test-image.png') => {
        stop();
        setFeedMode(mode);

        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(t => t.stop());
            videoRef.current.srcObject = null;
        }

        const img = await loadImage(url);
        currentFeedImageRef.current = img;
        const curW = img.naturalWidth;
        const curH = img.naturalHeight;
        setFeedDims({ width: curW, height: curH });

        if (feedCanvasRef.current && threeCanvasRef.current && rendererRef.current) {
            feedCanvasRef.current.width = curW;
            feedCanvasRef.current.height = curH;
            threeCanvasRef.current.width = curW;
            threeCanvasRef.current.height = curH;
            rendererRef.current.setSize(curW, curH, false);

            const ctx = feedCanvasRef.current.getContext('2d')!;
            ctx.drawImage(img, 0, 0, curW, curH);

            await start(feedCanvasRef.current);
        }
    };

    const activateCamera = async () => {
        if (!videoRef.current) return;
        try {
            stop();
            setFeedMode('camera');
            currentFeedImageRef.current = null;

            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
            });
            videoRef.current.srcObject = stream;
            await videoRef.current.play();

            const curW = videoRef.current.videoWidth || 1280;
            const curH = videoRef.current.videoHeight || 720;
            setFeedDims({ width: curW, height: curH });

            if (threeCanvasRef.current && rendererRef.current) {
                threeCanvasRef.current.width = curW;
                threeCanvasRef.current.height = curH;
                rendererRef.current.setSize(curW, curH, false);
            }

            await start(videoRef.current);
        } catch (err: any) {
            alert('Error cámara: ' + err.message);
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', flex: 1, overflow: 'hidden', height: '100%' }}>
            {/* Viewport */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617', overflow: 'hidden', padding: '20px' }}>
                <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{
                        position: 'relative',
                        aspectRatio: `${feedDims.width} / ${feedDims.height}`,
                        maxWidth: '100%',
                        maxHeight: '100%',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <canvas
                            ref={feedCanvasRef}
                            style={{
                                width: '100%',
                                height: '100%',
                                display: feedMode === 'camera' ? 'none' : 'block'
                            }}
                        />
                        <video
                            ref={videoRef}
                            style={{
                                width: '100%',
                                height: '100%',
                                display: feedMode === 'camera' ? 'block' : 'none',
                                objectFit: 'contain'
                            }}
                            playsInline
                            muted
                        />
                        <canvas
                            ref={threeCanvasRef}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                pointerEvents: 'none',
                                zIndex: 3
                            }}
                        />
                    </div>

                    {/* HUD Stats */}
                    <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10 }}>
                        <div style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '13px', fontWeight: '600' }}>
                            ⚡ {fps} FPS <span style={{ color: '#94a3b8', fontSize: '11px', marginLeft: '6px' }}>({latency} ms)</span>
                        </div>
                        <div style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '13px', fontWeight: '600', color: inliers > 0 ? '#818cf8' : '#94a3b8' }}>
                            🎯 Inliers: {inliers} {activeDetection ? `(${Math.round((activeDetection.stability || 1) * 100)}% est.)` : ''}
                        </div>
                        <div style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '13px', fontWeight: '600', color: '#38bdf8' }}>
                            🧪 {feedMode} ({feedDims.width}x{feedDims.height})
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <aside style={{ background: '#0f172a', borderLeft: '1px solid rgba(255, 255, 255, 0.08)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        marginBottom: '16px',
                        background: inliers > 0 ? 'rgba(99, 102, 241, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: inliers > 0 ? '#818cf8' : '#f87171',
                        border: `1px solid ${inliers > 0 ? '#6366f1' : '#ef4444'}`
                    }}>
                        {state === 'compiling' ? `Compilando (${compilationProgress}%)` : (inliers > 0 ? `🎯 Marcador Fijado (${inliers} inliers)` : `Estado: ${state}`)}
                    </span>

                    {error && (
                        <div style={{ padding: '8px 12px', borderRadius: '6px', background: 'rgba(239,68,68,0.2)', color: '#f87171', fontSize: '12px', marginBottom: '12px' }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', textTransform: 'uppercase', color: '#94a3b8' }}>🖼️ Escenas de Prueba</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button
                            onClick={() => switchFeed(DEFAULT_QUERY, 'test-query.jpg')}
                            style={{ padding: '12px', borderRadius: '8px', background: feedMode === 'test-query.jpg' ? '#6366f1' : 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', textAlign: 'left', fontWeight: '600' }}
                        >
                            🖥️ test-query.jpg
                            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Monitor Samsung con perspectiva</div>
                        </button>
                        <button
                            onClick={() => switchFeed(DEFAULT_TARGET, 'test-image.png')}
                            style={{ padding: '12px', borderRadius: '8px', background: feedMode === 'test-image.png' ? '#6366f1' : 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', textAlign: 'left', fontWeight: '600' }}
                        >
                            🖼️ test-image.png
                            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Target original 1024x1024</div>
                        </button>
                        <button
                            onClick={activateCamera}
                            style={{ padding: '12px', borderRadius: '8px', background: feedMode === 'camera' ? '#6366f1' : 'rgba(99, 102, 241, 0.2)', color: 'white', border: '1px solid #6366f1', cursor: 'pointer', textAlign: 'left', fontWeight: '600' }}
                        >
                            📷 Activar Cámara Real
                        </button>
                    </div>
                </div>

                <div style={{ marginTop: 'auto', padding: '14px', background: 'rgba(0, 0, 0, 0.4)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>FORMA DE USO #2</div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#818cf8', fontFamily: 'monospace' }}>
                        import &#123; useLocus &#125; from 'locus-ar/client';
                    </div>
                    <p style={{ fontSize: '11px', color: '#64748b', marginTop: '6px', lineHeight: '1.4' }}>
                        Hook reactivo con compilación al vuelo, gestión de estado, lista de detecciones y acceso a matrices de mundo y proyección.
                    </p>
                </div>
            </aside>
        </div>
    );
};
