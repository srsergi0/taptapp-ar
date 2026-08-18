import { useState, useEffect, useRef, useCallback } from 'react';
import { BioInspiredController } from '../runtime/bio-inspired-controller.js';
import { OfflineCompiler } from '../compiler/offline-compiler.js';
import { LocusConfig, LocusTarget, LocusState, LocusDetection } from './types.js';

const DEFAULT_CONFIG: Required<LocusConfig> = {
    width: 640,
    height: 480,
    maxTrack: 1,
    debugMode: false,
    bioInspired: true,
    facingMode: 'environment'
};

export function useLocus(targets: LocusTarget[], config: LocusConfig = {}) {
    const [state, setState] = useState<LocusState>('idle');
    const [detections, setDetections] = useState<LocusDetection[]>([]);
    const [compilationProgress, setCompilationProgress] = useState(0);
    const [error, setError] = useState<string | undefined>();

    const controllerRef = useRef<BioInspiredController | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const requestRef = useRef<number>();
    const isRunningRef = useRef(false);

    const fullConfigRef = useRef({ ...DEFAULT_CONFIG, ...config });
    fullConfigRef.current = { ...DEFAULT_CONFIG, ...config };

    const stop = useCallback(() => {
        isRunningRef.current = false;
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
            requestRef.current = undefined;
        }
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        if (controllerRef.current) {
            controllerRef.current.dispose();
            controllerRef.current = null;
        }
        setState('idle');
        setDetections([]);
    }, []);

    const start = useCallback(async (sourceElement?: HTMLVideoElement | HTMLCanvasElement | HTMLImageElement) => {
        if (state !== 'idle' && state !== 'error') return;

        setState('initializing');
        setError(undefined);

        try {
            let stream: MediaStream | null = null;

            // 1. Setup Source
            if (sourceElement instanceof HTMLVideoElement) {
                videoRef.current = sourceElement;
                if (!sourceElement.srcObject) {
                    stream = await navigator.mediaDevices.getUserMedia({
                        video: {
                            facingMode: fullConfigRef.current.facingMode,
                            width: { ideal: 1280 },
                            height: { ideal: 720 }
                        }
                    });
                    sourceElement.srcObject = stream;
                    await new Promise<void>((resolve) => {
                        sourceElement.onloadedmetadata = () => resolve();
                    });
                }
            }

            // 2. Prepare Processing Canvas
            if (!canvasRef.current) {
                canvasRef.current = document.createElement('canvas');
            }
            canvasRef.current.width = fullConfigRef.current.width;
            canvasRef.current.height = fullConfigRef.current.height;
            const ctx = canvasRef.current.getContext('2d', { willReadFrequently: true });
            if (!ctx) throw new Error('Could not create canvas context');

            // 3. Compile Targets with natural aspect ratio
            setState('compiling');
            const compiler = new OfflineCompiler();
            const imagesToCompile = await Promise.all(targets.map(async (t) => {
                const imageData = await getTargetImageData(t.image);
                return {
                    data: new Uint8Array(imageData.data.buffer),
                    width: imageData.width,
                    height: imageData.height
                };
            }));

            await compiler.compileImageTargets(imagesToCompile, (progress) => {
                setCompilationProgress(Math.round(progress));
            });

            const buffer = compiler.exportData();
            const cleanBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

            // 4. Initialize Controller
            const activeDetections: Map<number, LocusDetection> = new Map();
            let lastStableDetections: LocusDetection[] = [];

            controllerRef.current = new BioInspiredController({
                inputWidth: fullConfigRef.current.width,
                inputHeight: fullConfigRef.current.height,
                debugMode: fullConfigRef.current.debugMode,
                maxTrack: fullConfigRef.current.maxTrack,
                bioInspired: {
                    enabled: fullConfigRef.current.bioInspired,
                    aggressiveSkipping: false // Disable aggressive skips in hook to keep continuous display
                },
                onUpdate: (data) => {
                    if (data.type === 'updateMatrix') {
                        const { targetIndex, worldMatrix, modelViewTransform, screenCoords, stabilities } = data;
                        if (targetIndex !== undefined) {
                            if (worldMatrix) {
                                activeDetections.set(targetIndex, {
                                    targetIndex,
                                    worldMatrix,
                                    modelViewTransform: modelViewTransform || null,
                                    screenCoords,
                                    label: targets[targetIndex]?.label,
                                    inliersCount: screenCoords?.length || 0,
                                    stability: stabilities?.length ? stabilities.reduce((a: number, b: number) => a + b, 0) / stabilities.length : 1
                                });
                            } else {
                                activeDetections.delete(targetIndex);
                            }
                        }
                    } else if (data.type === 'processDone') {
                        const next = Array.from(activeDetections.values());
                        if (next.length > 0) {
                            lastStableDetections = next;
                            setDetections(next);
                        } else if (lastStableDetections.length > 0 && activeDetections.size === 0) {
                            // Only clear after full loss
                            setDetections([]);
                            lastStableDetections = [];
                        }
                    }
                }
            });

            await controllerRef.current.addImageTargetsFromBuffer(cleanBuffer);

            // 5. Draw initial frame & start controller loop once
            if (sourceElement) {
                drawVideoToCanvas(ctx!, sourceElement, fullConfigRef.current.width, fullConfigRef.current.height);
            }
            controllerRef.current.processVideo(canvasRef.current);

            isRunningRef.current = true;
            setState('tracking');

            const loop = () => {
                if (!isRunningRef.current || !canvasRef.current) return;

                if (sourceElement) {
                    drawVideoToCanvas(ctx!, sourceElement, fullConfigRef.current.width, fullConfigRef.current.height);
                }

                requestRef.current = requestAnimationFrame(loop);
            };

            loop();

        } catch (err: any) {
            console.error('[Locus] Initialization error:', err);
            setError(err.message || 'Unknown error');
            setState('error');
            stop();
        }
    }, [targets, stop]);

    const getProjectionMatrix = useCallback((): number[] => {
        return controllerRef.current?.getProjectionMatrix() || [];
    }, []);

    const getProjectionTransform = useCallback((): number[][] => {
        return controllerRef.current?.projectionTransform || [];
    }, []);

    const getMarkerDimensions = useCallback((): number[][] => {
        return controllerRef.current?.allDimensions || [];
    }, []);

    useEffect(() => {
        return () => {
            stop();
        };
    }, [stop]);

    return {
        state,
        detections,
        compilationProgress,
        error,
        start,
        stop,
        getProjectionMatrix,
        getProjectionTransform,
        getMarkerDimensions
    };
}

// Helpers
async function getTargetImageData(image: string | HTMLImageElement | ImageData): Promise<ImageData> {
    if (image instanceof ImageData) return image;

    let img: HTMLImageElement;
    if (typeof image === 'string') {
        img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = image;
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });
    } else {
        img = image;
        if (!img.complete) {
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });
        }
    }

    const naturalWidth = img.naturalWidth || img.width;
    const naturalHeight = img.naturalHeight || img.height;

    const canvas = document.createElement('canvas');
    canvas.width = naturalWidth;
    canvas.height = naturalHeight;
    const ctx = canvas.getContext('2d')!;

    ctx.drawImage(img, 0, 0, naturalWidth, naturalHeight);
    return ctx.getImageData(0, 0, naturalWidth, naturalHeight);
}

function drawVideoToCanvas(
    ctx: CanvasRenderingContext2D,
    element: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement,
    targetWidth: number,
    targetHeight: number
) {
    const elementWidth = (element as HTMLVideoElement).videoWidth ||
        (element as HTMLImageElement).naturalWidth ||
        (element as HTMLCanvasElement).width;
    const elementHeight = (element as HTMLVideoElement).videoHeight ||
        (element as HTMLImageElement).naturalHeight ||
        (element as HTMLCanvasElement).height;

    if (!elementWidth || !elementHeight) return;

    const elementRatio = elementWidth / elementHeight;
    const targetRatio = targetWidth / targetHeight;

    let sx, sy, sw, sh;

    if (elementRatio > targetRatio) {
        sh = elementHeight;
        sw = sh * targetRatio;
        sx = (elementWidth - sw) / 2;
        sy = 0;
    } else {
        sw = elementWidth;
        sh = sw / targetRatio;
        sx = 0;
        sy = (elementHeight - sh) / 2;
    }

    ctx.drawImage(element, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);
}
