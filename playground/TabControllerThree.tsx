import React, { useEffect, useRef, useState } from 'react';
import { Controller, OfflineCompiler } from 'locus-ar';

declare const THREE: any;

const DEFAULT_TARGET = '../tests/assets/test-image.png';
const DEFAULT_QUERY = '../tests/assets/test-query.jpg';

export const TabControllerThree: React.FC = () => {
    const [status, setStatus] = useState<string>('Inicializando...');
    const [fps, setFps] = useState(60);
    const [latency, setLatency] = useState('0.0');
    const [feedMode, setFeedMode] = useState<'test-query.jpg' | 'test-image.png' | 'camera'>('test-query.jpg');
    const [inliers, setInliers] = useState(0);
    const [feedDims, setFeedDims] = useState<{ width: number; height: number }>({ width: 1547, height: 871 });

    const containerRef = useRef<HTMLDivElement | null>(null);
    const feedCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const threeCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const controllerRef = useRef<Controller | null>(null);
    const isRunningRef = useRef(false);
    const currentFeedImageRef = useRef<HTMLImageElement | null>(null);
    const compiledTargetRef = useRef<ArrayBuffer | null>(null);

    const sceneRef = useRef<any>(null);
    const cameraRef = useRef<any>(null);
    const rendererRef = useRef<any>(null);
    const anchorGroupRef = useRef<any>(null);

    const loadImage = (url: string): Promise<HTMLImageElement> => {
        return new Promise((res, rej) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => res(img);
            img.onerror = rej;
            img.src = url;
        });
    };

    const startTrackingFeed = async (
        inputSource: HTMLCanvasElement | HTMLVideoElement,
        width: number,
        height: number
    ) => {
        if (!compiledTargetRef.current || !threeCanvasRef.current || !rendererRef.current) return;

        if (controllerRef.current) {
            controllerRef.current.stopProcessVideo();
            controllerRef.current.dispose();
            controllerRef.current = null;
        }

        if (feedCanvasRef.current) {
            feedCanvasRef.current.width = width;
            feedCanvasRef.current.height = height;
        }
        if (threeCanvasRef.current) {
            threeCanvasRef.current.width = width;
            threeCanvasRef.current.height = height;
        }

        rendererRef.current.setSize(width, height, false);

        const controller = new Controller({
            inputWidth: width,
            inputHeight: height,
            onUpdate: (data) => {
                if (data.type === 'updateMatrix') {
                    if (data.worldMatrix && anchorGroupRef.current) {
                        anchorGroupRef.current.visible = true;
                        anchorGroupRef.current.matrix.fromArray(data.worldMatrix);
                        if (data.screenCoords) setInliers(data.screenCoords.length);
                    } else if (anchorGroupRef.current) {
                        anchorGroupRef.current.visible = false;
                        setInliers(0);
                    }
                }
            }
        });
        controllerRef.current = controller;

        if (cameraRef.current) {
            cameraRef.current.projectionMatrix.fromArray(controller.getProjectionMatrix());
        }

        await controller.addImageTargetsFromBuffer(compiledTargetRef.current);
        setStatus('Tracking activo');

        controller.processVideo(inputSource);
        isRunningRef.current = true;
    };

    useEffect(() => {
        let isMounted = true;
        let animationFrameId: number;

        async function initThreeAR() {
            if (!threeCanvasRef.current || !feedCanvasRef.current) return;

            const initialW = 1547;
            const initialH = 871;

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
            renderer.setSize(initialW, initialH, false);
            rendererRef.current = renderer;

            const anchorGroup = new THREE.Group();
            anchorGroup.matrixAutoUpdate = false;
            anchorGroup.visible = false;
            scene.add(anchorGroup);
            anchorGroupRef.current = anchorGroup;

            // 1x1 Unit Mesh centered on marker
            const planeGeo = new THREE.PlaneGeometry(1, 1);
            const planeMat = new THREE.MeshBasicMaterial({
                color: 0x10b981,
                transparent: true,
                opacity: 0.5,
                side: THREE.DoubleSide
            });
            const plane = new THREE.Mesh(planeGeo, planeMat);
            anchorGroup.add(plane);

            const edges = new THREE.EdgesGeometry(planeGeo);
            const lineMat = new THREE.LineBasicMaterial({ color: 0x34d399, linewidth: 3 });
            const border = new THREE.LineSegments(edges, lineMat);
            anchorGroup.add(border);

            setStatus('Compilando target...');
            const targetImg = await loadImage(DEFAULT_TARGET);
            const targetCanvas = document.createElement('canvas');
            targetCanvas.width = targetImg.naturalWidth;
            targetCanvas.height = targetImg.naturalHeight;
            const targetCtx = targetCanvas.getContext('2d')!;
            targetCtx.drawImage(targetImg, 0, 0);
            const imgData = targetCtx.getImageData(0, 0, targetCanvas.width, targetCanvas.height);

            const compiler = new OfflineCompiler();
            await compiler.compileImageTargets([{
                width: imgData.width,
                height: imgData.height,
                data: new Uint8Array(imgData.data.buffer)
            }], (progress) => {
                setStatus(`Compilando target (${Math.round(progress)}%)...`);
            });

            const buffer = compiler.exportData();
            const cleanBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
            compiledTargetRef.current = cleanBuffer;

            const queryImg = await loadImage(DEFAULT_QUERY);
            currentFeedImageRef.current = queryImg;

            const curW = queryImg.naturalWidth || initialW;
            const curH = queryImg.naturalHeight || initialH;
            setFeedDims({ width: curW, height: curH });

            const feedCtx = feedCanvasRef.current.getContext('2d')!;
            feedCtx.drawImage(queryImg, 0, 0, curW, curH);

            await startTrackingFeed(feedCanvasRef.current, curW, curH);

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

                if (feedCanvasRef.current && currentFeedImageRef.current && feedCanvasRef.current.style.display !== 'none') {
                    const ctx = feedCanvasRef.current.getContext('2d');
                    ctx?.drawImage(currentFeedImageRef.current, 0, 0, feedCanvasRef.current.width, feedCanvasRef.current.height);
                }

                renderer.render(scene, camera);

                if (isMounted) {
                    animationFrameId = requestAnimationFrame(animate);
                }
            };

            animate();
        }

        initThreeAR();

        return () => {
            isMounted = false;
            isRunningRef.current = false;
            cancelAnimationFrame(animationFrameId);
            controllerRef.current?.stopProcessVideo();
            controllerRef.current?.dispose();
        };
    }, []);

    const switchFeed = async (url: string, mode: 'test-query.jpg' | 'test-image.png') => {
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

        if (feedCanvasRef.current) {
            feedCanvasRef.current.width = curW;
            feedCanvasRef.current.height = curH;
            const ctx = feedCanvasRef.current.getContext('2d')!;
            ctx.drawImage(img, 0, 0, curW, curH);
            await startTrackingFeed(feedCanvasRef.current, curW, curH);
        }
    };

    const activateCamera = async () => {
        if (!videoRef.current) return;
        try {
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

            await startTrackingFeed(videoRef.current, curW, curH);
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
                        <div style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '13px', fontWeight: '600', color: inliers > 0 ? '#34d399' : '#94a3b8' }}>
                            🎯 Inliers: {inliers}
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
                        background: inliers > 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: inliers > 0 ? '#34d399' : '#f87171',
                        border: `1px solid ${inliers > 0 ? '#10b981' : '#ef4444'}`
                    }}>
                        {inliers > 0 ? `🎯 Marcador Fijado (${inliers} inliers)` : status}
                    </span>

                    <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', textTransform: 'uppercase', color: '#94a3b8' }}>🖼️ Escenas de Prueba</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button
                            onClick={() => switchFeed(DEFAULT_QUERY, 'test-query.jpg')}
                            style={{ padding: '12px', borderRadius: '8px', background: feedMode === 'test-query.jpg' ? '#10b981' : 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', textAlign: 'left', fontWeight: '600' }}
                        >
                            🖥️ test-query.jpg
                            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Monitor Samsung con perspectiva</div>
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
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>FORMA DE USO #1</div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#34d399', fontFamily: 'monospace' }}>
                        import &#123; Controller, OfflineCompiler &#125; from 'locus-ar';
                    </div>
                    <p style={{ fontSize: '11px', color: '#64748b', marginTop: '6px', lineHeight: '1.4' }}>
                        Control total de ciclo de vida del motor AR, compilador sin conexión e integración directa con escena Three.js nativa.
                    </p>
                </div>
            </aside>
        </div>
    );
};
