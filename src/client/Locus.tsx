import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { useLocus } from './useLocus.js';
import { LocusConfig, LocusTarget, LocusDetection } from './types.js';
import { projectToScreen } from '../core/utils/projection.js';

interface LocusProps extends LocusConfig {
    /** Single target image source or array of target objects. */
    targets: string | LocusTarget | LocusTarget[];
    /** Custom feed source (e.g. image URL, HTMLCanvasElement, or HTMLImageElement) for digital simulation */
    source?: string | HTMLImageElement | HTMLCanvasElement;
    /** Children can be a function receiving detections or React nodes. */
    children?: ReactNode | ((detections: LocusDetection[]) => ReactNode);
    /** CSS class for the container. */
    className?: string;
    /** Inline styles for the container. */
    style?: React.CSSProperties;
    /** Auto-start when camera is ready. Default: true */
    autoStart?: boolean;
}

export interface LocusContextType {
    detections: LocusDetection[];
    container: HTMLElement | null;
    state: string;
    projectionMatrix?: number[];
    projectionTransform?: number[][];
    markerDimensions?: number[][];
    inputWidth?: number;
    inputHeight?: number;
}

export const LocusContext = React.createContext<LocusContextType>({
    detections: [],
    container: null,
    state: 'idle'
});

/**
 * Locus Component - High-level AR view for React.
 */
export const Locus: React.FC<LocusProps> = ({
    targets: targetsProp,
    source,
    children,
    className,
    style,
    autoStart = true,
    ...config
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasFeedRef = useRef<HTMLCanvasElement>(null);
    const [, forceUpdate] = useState({});

    // Normalize targets
    const targets = React.useMemo(() => {
        if (typeof targetsProp === 'string') {
            return [{ image: targetsProp, id: 'default' }];
        }
        if (!Array.isArray(targetsProp)) {
            return [targetsProp];
        }
        return targetsProp;
    }, [targetsProp]);

    const {
        state,
        detections,
        error,
        start,
        getProjectionMatrix,
        getProjectionTransform,
        getMarkerDimensions
    } = useLocus(targets, config);

    useEffect(() => {
        if (containerRef.current) {
            forceUpdate({});
        }
    }, []);

    useEffect(() => {
        if (!autoStart) return;

        if (source) {
            if (typeof source === 'string') {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.src = source;
                img.onload = () => {
                    if (canvasFeedRef.current) {
                        const curW = img.naturalWidth || config.width || 1547;
                        const curH = img.naturalHeight || config.height || 871;
                        canvasFeedRef.current.width = curW;
                        canvasFeedRef.current.height = curH;
                        const ctx = canvasFeedRef.current.getContext('2d');
                        ctx?.drawImage(img, 0, 0, curW, curH);
                        start(canvasFeedRef.current);
                    }
                };
            } else if (source instanceof HTMLCanvasElement || source instanceof HTMLImageElement) {
                start(source);
            }
        } else if (videoRef.current) {
            start(videoRef.current);
        }
    }, [autoStart, source, start, config.width, config.height]);

    const containerStyle: React.CSSProperties = {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        overflow: 'hidden',
        ...style
    };

    const videoStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        display: 'block'
    };

    const overlayContainerStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
    };

    // Helper to render children
    const renderChildren = () => {
        if (typeof children === 'function') {
            return (children as (detections: LocusDetection[]) => ReactNode)(detections);
        }

        // If it's a single target case, auto-apply transform to all children
        if (targets.length === 1 && detections.length === 1) {
            return (
                <LocusTransform
                    matrix={detections[0].worldMatrix}
                    modelViewTransform={detections[0].modelViewTransform}
                    screenCoords={detections[0].screenCoords}
                    targetIndex={detections[0].targetIndex}
                    container={containerRef.current}
                >
                    {children}
                </LocusTransform>
            );
        }

        return children;
    };

    return (
        <LocusContext.Provider value={{
            detections,
            container: containerRef.current,
            state,
            projectionMatrix: getProjectionMatrix(),
            projectionTransform: getProjectionTransform(),
            markerDimensions: getMarkerDimensions(),
            inputWidth: config.width || 1547,
            inputHeight: config.height || 871
        }}>
            <div ref={containerRef} className={className} style={containerStyle}>
                {source ? (
                    <canvas ref={canvasFeedRef} style={videoStyle} />
                ) : (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        style={videoStyle}
                    />
                )}

                <div style={overlayContainerStyle}>
                    {renderChildren()}
                </div>

                {config.debugMode && (
                    <DebugOverlay detections={detections} />
                )}

                {state === 'compiling' && (
                    <div className="locus-loader" style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'rgba(15, 23, 42, 0.9)',
                        backdropFilter: 'blur(8px)',
                        color: '#fff',
                        padding: '24px 32px',
                        borderRadius: '20px',
                        fontSize: '1rem',
                        fontWeight: 700,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px',
                        zIndex: 30
                    }}>
                        <div className="spinner" style={{
                            width: '30px',
                            height: '30px',
                            border: '3px solid rgba(99, 102, 241, 0.3)',
                            borderTopColor: '#6366f1',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }} />
                        Compilando Target...
                        <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
              `}</style>
                    </div>
                )}

                {error && (
                    <div style={{
                        position: 'absolute',
                        bottom: '24px',
                        left: '24px',
                        right: '24px',
                        background: 'rgba(220, 38, 38, 0.9)',
                        backdropFilter: 'blur(4px)',
                        color: '#fff',
                        padding: '16px',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                        zIndex: 30
                    }}>
                        <strong>Camera Error:</strong> {error}
                    </div>
                )}
            </div>
        </LocusContext.Provider>
    );
};

export interface LocusTransformProps {
    matrix: number[] | null;
    modelViewTransform?: number[][] | null;
    screenCoords?: { x: number; y: number }[] | null;
    targetIndex?: number;
    container?: HTMLElement | null;
    children: ReactNode;
    style?: React.CSSProperties;
    className?: string;
}

/**
 * LocusTransform - Positions children on top of a detection in exact 3D perspective.
 */
export const LocusTransform: React.FC<LocusTransformProps> = ({
    matrix,
    modelViewTransform,
    screenCoords,
    targetIndex = 0,
    container: containerProp,
    children,
    style,
    className
}) => {
    const ctx = React.useContext(LocusContext);
    const container = containerProp || ctx.container;

    if (!container || (!matrix && !modelViewTransform && (!screenCoords || screenCoords.length < 4))) {
        return null;
    }

    const homography = solveHomographyFromTarget(
        modelViewTransform || null,
        matrix || null,
        screenCoords || null,
        targetIndex,
        ctx,
        container
    );

    if (!homography) return null;

    return (
        <div
            className={className}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100px', // Base coordinate system (0..100 maps to 0..markerWidth, 0..markerHeight)
                height: '100px',
                transformOrigin: '0 0',
                transform: `matrix3d(${homography.join(',')})`,
                pointerEvents: 'auto',
                zIndex: 10,
                ...style
            }}
        >
            {children}
        </div>
    );
};

const DebugOverlay: React.FC<{ detections: LocusDetection[] }> = ({ detections }) => {
    return (
        <svg
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
        >
            {detections.map((det, i) => {
                if (!det.screenCoords) return null;
                const pts = det.screenCoords.map(p => `${(p.x / 640) * 100},${(p.y / 480) * 100}`).join(' ');
                return (
                    <polygon
                        key={i}
                        points={pts}
                        fill="rgba(34, 197, 94, 0.2)"
                        stroke="#22c55e"
                        strokeWidth="0.5"
                    />
                );
            })}
        </svg>
    );
};

/**
 * Calculates the exact 4-corner homography matrix from the target pose.
 */
function solveHomographyFromTarget(
    mVT: number[][] | null,
    worldMatrix: number[] | null,
    screenCoords: { x: number; y: number }[] | null,
    targetIndex: number,
    ctx: LocusContextType,
    container: HTMLElement
) {
    const rect = container.getBoundingClientRect();
    const w = rect.width || container.clientWidth || 1547;
    const h = rect.height || container.clientHeight || 871;

    const mediaEl = container.querySelector('video, canvas') as HTMLVideoElement | HTMLCanvasElement | null;
    const inputW = (mediaEl as HTMLVideoElement)?.videoWidth || (mediaEl as HTMLCanvasElement)?.width || ctx.inputWidth || 1547;
    const inputH = (mediaEl as HTMLVideoElement)?.videoHeight || (mediaEl as HTMLCanvasElement)?.height || ctx.inputHeight || 871;

    const markerDims = (ctx.markerDimensions && ctx.markerDimensions[targetIndex]) || [1024, 1024];
    const markerW = markerDims[0];
    const markerH = markerDims[1];

    let pUL: { sx: number; sy: number };
    let pUR: { sx: number; sy: number };
    let pLL: { sx: number; sy: number };
    let pLR: { sx: number; sy: number };

    if (mVT && ctx.projectionTransform && ctx.projectionTransform.length === 3) {
        pUL = projectToScreen(0, 0, 0, mVT, ctx.projectionTransform, inputW, inputH, rect, false);
        pUR = projectToScreen(markerW, 0, 0, mVT, ctx.projectionTransform, inputW, inputH, rect, false);
        pLL = projectToScreen(0, markerH, 0, mVT, ctx.projectionTransform, inputW, inputH, rect, false);
        pLR = projectToScreen(markerW, markerH, 0, mVT, ctx.projectionTransform, inputW, inputH, rect, false);
    } else if (worldMatrix && ctx.projectionMatrix && ctx.projectionMatrix.length === 16) {
        const proj = ctx.projectionMatrix;
        const projectPoint = (x: number, y: number, z: number) => {
            const xc = worldMatrix[0] * x + worldMatrix[4] * y + worldMatrix[8] * z + worldMatrix[12];
            const yc = worldMatrix[1] * x + worldMatrix[5] * y + worldMatrix[9] * z + worldMatrix[13];
            const zc = worldMatrix[2] * x + worldMatrix[6] * y + worldMatrix[10] * z + worldMatrix[14];
            const wc = worldMatrix[3] * x + worldMatrix[7] * y + worldMatrix[11] * z + worldMatrix[15];

            const clip_x = proj[0] * xc + proj[4] * yc + proj[8] * zc + proj[12] * wc;
            const clip_y = proj[1] * xc + proj[5] * yc + proj[9] * zc + proj[13] * wc;
            const clip_w = proj[3] * xc + proj[7] * yc + proj[11] * zc + proj[15] * wc;

            const ndc_x = clip_x / clip_w;
            const ndc_y = clip_y / clip_w;

            return {
                sx: (ndc_x * 0.5 + 0.5) * w,
                sy: (-ndc_y * 0.5 + 0.5) * h
            };
        };

        pUL = projectPoint(-0.5, 0.5 * (markerH / markerW), 0);
        pUR = projectPoint(0.5, 0.5 * (markerH / markerW), 0);
        pLL = projectPoint(-0.5, -0.5 * (markerH / markerW), 0);
        pLR = projectPoint(0.5, -0.5 * (markerH / markerW), 0);
    } else {
        return null;
    }

    return solveHomography(100, 100, pUL, pUR, pLL, pLR);
}

function solveHomography(
    w: number,
    h: number,
    p1: { sx: number; sy: number },
    p2: { sx: number; sy: number },
    p3: { sx: number; sy: number },
    p4: { sx: number; sy: number }
) {
    const x1 = p1.sx, y1 = p1.sy;
    const x2 = p2.sx, y2 = p2.sy;
    const x3 = p3.sx, y3 = p3.sy;
    const x4 = p4.sx, y4 = p4.sy;

    const dx1 = x2 - x4, dx2 = x3 - x4, dx3 = x1 - x2 + x4 - x3;
    const dy1 = y2 - y4, dy2 = y3 - y4, dy3 = y1 - y2 + y4 - y3;

    const det = dx1 * dy2 - dx2 * dy1;
    if (Math.abs(det) < 0.000001) return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

    const g = (dx3 * dy2 - dx2 * dy3) / det;
    const h_coeff = (dx1 * dy3 - dx3 * dy1) / det;
    const a = x2 - x1 + g * x2;
    const b = x3 - x1 + h_coeff * x3;
    const c = x1;
    const d = y2 - y1 + g * y2;
    const e = y3 - y1 + h_coeff * y3;
    const f = y1;

    return [
        a / w, d / w, 0, g / w,
        b / h, e / h, 0, h_coeff / h,
        0, 0, 1, 0,
        c, f, 0, 1
    ];
}
