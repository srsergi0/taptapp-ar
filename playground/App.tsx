import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useLocus } from '../src/client/index.js';

declare const THREE: any;

const DEFAULT_TARGET = '../tests/assets/test-image.png';
const DEFAULT_QUERY = '../tests/assets/test-query.jpg';

export const App: React.FC = () => {
    const [fps, setFps] = useState(60);
    const [latency, setLatency] = useState('0.0');
    const [feedMode, setFeedMode] = useState<'test-query.jpg' | 'test-image.png' | 'camera'>('test-query.jpg');

    // Canvas Refs
    const containerRef = useRef<HTMLDivElement | null>(null);
    const feedCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const threeCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const currentFeedImageRef = useRef<HTMLImageElement | null>(null);

    const viewW = 1547;
    const viewH = 871;
    const mW = 1024;
    const mH = 1024;

    // 1. Official Locus AR React Hook
    const targets = useMemo(() => [{ image: DEFAULT_TARGET, label: 'test-image' }], []);
    const { state, detections, compilationProgress, error, start, stop, getProjectionMatrix } = useLocus(targets, {
        width: viewW,
        height: viewH,
        bioInspired: true
    });

    const activeDetection = detections.length > 0 ? detections[0] : null;
    const isLocked = !!activeDetection?.worldMatrix;
    const inliersCount = activeDetection?.inliersCount || 0;

    // Three.js AR Scene Refs
    const threeEngineRef = useRef<{
        scene: any;
        camera: any;
        renderer: any;
        anchorGroup: any;
    } | null>(null);

    const loadImage = (url: string): Promise<HTMLImageElement> => {
        return new Promise((res, rej) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => res(img);
            img.onerror = rej;
            img.src = url;
        });
    };

    // 2. Setup Three.js Scene ONCE
    useEffect(() => {
        if (!threeCanvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.Camera();
        camera.matrixAutoUpdate = false;

        const renderer = new THREE.WebGLRenderer({
            canvas: threeCanvasRef.current,
            alpha: true,
            antialias: true
        });
        renderer.setSize(viewW, viewH);
        renderer.setPixelRatio(window.devicePixelRatio || 1);

        const anchorGroup = new THREE.Group();
        anchorGroup.matrixAutoUpdate = false;
        anchorGroup.visible = false;
        scene.add(anchorGroup);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        scene.add(ambientLight);

        threeEngineRef.current = { scene, camera, renderer, anchorGroup };
    }, []);

    // 3. Initialize & Start useLocus on Mount
    useEffect(() => {
        let isMounted = true;

        async function initFeed() {
            if (feedCanvasRef.current) {
                feedCanvasRef.current.width = viewW;
                feedCanvasRef.current.height = viewH;
            }
            if (overlayCanvasRef.current) {
                overlayCanvasRef.current.width = viewW;
                overlayCanvasRef.current.height = viewH;
            }
            if (threeCanvasRef.current) {
                threeCanvasRef.current.width = viewW;
                threeCanvasRef.current.height = viewH;
            }

            const queryImg = await loadImage(DEFAULT_QUERY);
            currentFeedImageRef.current = queryImg;

            const feedCtx = feedCanvasRef.current?.getContext('2d');
            feedCtx?.drawImage(queryImg, 0, 0, viewW, viewH);

            if (isMounted && feedCanvasRef.current) {
                // Start useLocus on simulation feed canvas
                start(feedCanvasRef.current);
            }
        }

        initFeed();

        return () => {
            isMounted = false;
            stop();
        };
    }, [start, stop]);

    // 4. Update Three.js Projection & World Matrix from useLocus
    useEffect(() => {
        if (!threeEngineRef.current) return;

        if (state === 'tracking') {
            const proj = getProjectionMatrix();
            if (proj && proj.length === 16) {
                threeEngineRef.current.camera.projectionMatrix.fromArray(proj);
            }
        }

        if (activeDetection?.worldMatrix) {
            threeEngineRef.current.anchorGroup.visible = true;
            threeEngineRef.current.anchorGroup.matrix.fromArray(activeDetection.worldMatrix);
        } else {
            threeEngineRef.current.anchorGroup.visible = false;
        }
    }, [state, activeDetection, getProjectionMatrix]);

    // 5. Render Loop (60 FPS)
    useEffect(() => {
        let animationFrameId: number;
        let lastTime = performance.now();
        let frameCounter = 0;

        const renderLoop = () => {
            const now = performance.now();
            const delta = now - lastTime;
            lastTime = now;
            frameCounter++;

            if (frameCounter % 15 === 0) {
                setFps(Math.round(1000 / Math.max(delta, 1)));
                setLatency(delta.toFixed(1));
            }

            // A. Draw background feed if static image
            if (feedCanvasRef.current && currentFeedImageRef.current) {
                const ctx = feedCanvasRef.current.getContext('2d');
                ctx?.drawImage(currentFeedImageRef.current, 0, 0, viewW, viewH);
            }

            // B. Draw 2D Overlay (Inliers + Bounding Quad)
            if (overlayCanvasRef.current) {
                const ctx = overlayCanvasRef.current.getContext('2d');
                if (ctx) {
                    ctx.clearRect(0, 0, viewW, viewH);

                    // Draw inliers from useLocus detection
                    if (activeDetection?.screenCoords && activeDetection.screenCoords.length > 0) {
                        ctx.fillStyle = '#10b981';
                        for (let i = 0; i < activeDetection.screenCoords.length; i++) {
                            const pt = activeDetection.screenCoords[i];
                            ctx.beginPath();
                            ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }

                    // 3D Projected Bounding Quad
                    if (threeEngineRef.current?.anchorGroup.visible && threeEngineRef.current?.camera) {
                        const corners = [
                            new THREE.Vector3(0, 0, 0),
                            new THREE.Vector3(mW, 0, 0),
                            new THREE.Vector3(mW, mH, 0),
                            new THREE.Vector3(0, mH, 0)
                        ];

                        const screenCorners = corners.map(c => {
                            c.applyMatrix4(threeEngineRef.current!.anchorGroup.matrix);
                            c.project(threeEngineRef.current!.camera);
                            return {
                                x: (c.x * 0.5 + 0.5) * viewW,
                                y: (-c.y * 0.5 + 0.5) * viewH
                            };
                        });

                        ctx.save();
                        ctx.strokeStyle = '#10b981';
                        ctx.lineWidth = 4;
                        ctx.shadowColor = '#10b981';
                        ctx.shadowBlur = 15;

                        ctx.beginPath();
                        ctx.moveTo(screenCorners[0].x, screenCorners[0].y);
                        for (let i = 1; i < 4; i++) {
                            ctx.lineTo(screenCorners[i].x, screenCorners[i].y);
                        }
                        ctx.closePath();
                        ctx.stroke();

                        ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
                        ctx.fill();

                        ctx.fillStyle = '#34d399';
                        for (let i = 0; i < 4; i++) {
                            ctx.beginPath();
                            ctx.arc(screenCorners[i].x, screenCorners[i].y, 6, 0, Math.PI * 2);
                            ctx.fill();
                        }

                        ctx.restore();
                    }
                }
            }

            // C. Render Three.js 3D Target Plane
            if (threeEngineRef.current) {
                threeEngineRef.current.renderer.render(
                    threeEngineRef.current.scene,
                    threeEngineRef.current.camera
                );
            }

            animationFrameId = requestAnimationFrame(renderLoop);
        };

        renderLoop();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [activeDetection]);

    // Switch Scene
    const switchFeed = async (url: string, mode: 'test-query.jpg' | 'test-image.png') => {
        setFeedMode(mode);
        const img = await loadImage(url);
        currentFeedImageRef.current = img;
        if (feedCanvasRef.current) {
            feedCanvasRef.current.style.display = 'block';
            if (videoRef.current) videoRef.current.style.display = 'none';
            start(feedCanvasRef.current);
        }
    };

    const activateCamera = async () => {
        if (!videoRef.current) return;
        try {
            setFeedMode('camera');
            if (feedCanvasRef.current) feedCanvasRef.current.style.display = 'none';
            videoRef.current.style.display = 'block';
            await start(videoRef.current);
        } catch (err: any) {
            alert('Error al acceder a la cámara: ' + err.message);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', background: '#090d16', color: '#f8fafc', overflow: 'hidden' }}>
            {/* Top Bar */}
            <header style={{ height: '56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', background: '#0f172a', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>⚛️</span>
                    <strong style={{ fontSize: '16px' }}>Locus AR • useLocus React Playground</strong>
                </div>
                <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '600',
                    background: isLocked ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: isLocked ? '#34d399' : '#f87171',
                    border: `1px solid ${isLocked ? '#10b981' : '#ef4444'}`
                }}>
                    {isLocked ? `🎯 Marcador Fijado (${inliersCount} inliers)` : state === 'compiling' ? `⚡ Compilando (${compilationProgress}%)` : '🔍 Buscando Marcador...'}
                </span>
            </header>

            {/* Main Area */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', flex: 1, overflow: 'hidden' }}>
                {/* Viewport */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617', overflow: 'hidden' }}>
                    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <canvas ref={feedCanvasRef} style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute' }} />
                        <video ref={videoRef} style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', display: 'none' }} playsInline muted />
                        <canvas ref={overlayCanvasRef} style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', pointerEvents: 'none', zIndex: 2 }} />
                        <canvas ref={threeCanvasRef} style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', pointerEvents: 'none', zIndex: 3 }} />

                        {/* HUD Stats */}
                        <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10 }}>
                            <div style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '13px', fontWeight: '600' }}>
                                ⚡ {fps} FPS <span style={{ color: '#94a3b8', fontSize: '11px', marginLeft: '6px' }}>({latency} ms)</span>
                            </div>
                            <div style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '13px', fontWeight: '600', color: inliersCount > 0 ? '#34d399' : '#94a3b8' }}>
                                🎯 Inliers: {inliersCount}
                            </div>
                            <div style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '13px', fontWeight: '600', color: '#38bdf8' }}>
                                🧪 {feedMode}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <aside style={{ background: '#0f172a', borderLeft: '1px solid rgba(255, 255, 255, 0.08)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', textTransform: 'uppercase', color: '#94a3b8' }}>🖼️ Escenas de Prueba</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <button
                                onClick={() => switchFeed(DEFAULT_QUERY, 'test-query.jpg')}
                                style={{ padding: '12px', borderRadius: '8px', background: feedMode === 'test-query.jpg' ? '#10b981' : 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', textAlign: 'left', fontWeight: '600' }}
                            >
                                🖥️ test-query.jpg
                                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Monitor Samsung con reflejos</div>
                            </button>
                            <button
                                onClick={() => switchFeed(DEFAULT_TARGET, 'test-image.png')}
                                style={{ padding: '12px', borderRadius: '8px', background: feedMode === 'test-image.png' ? '#10b981' : 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', textAlign: 'left', fontWeight: '600' }}
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
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>ESTADO `useLocus`</div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: error ? '#f87171' : '#34d399' }}>
                            {error ? `Error: ${error}` : `Estado: ${state.toUpperCase()}`}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};
