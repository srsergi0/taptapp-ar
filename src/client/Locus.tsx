import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { useLocus } from './useLocus.js';
import { LocusConfig, LocusTarget, LocusDetection } from './types.js';

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

interface LocusContextType {
    detections: LocusDetection[];
    container: HTMLElement | null;
    state: string;
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

    const { state, detections, error, start } = useLocus(targets, config);

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
                        canvasFeedRef.current.width = img.naturalWidth || 1547;
                        canvasFeedRef.current.height = img.naturalHeight || 871;
                        const ctx = canvasFeedRef.current.getContext('2d');
                        ctx?.drawImage(img, 0, 0, canvasFeedRef.current.width, canvasFeedRef.current.height);
                        start(canvasFeedRef.current);
                    }
                };
            } else if (source instanceof HTMLCanvasElement || source instanceof HTMLImageElement) {
                start(source);
            }
        } else if (videoRef.current) {
            start(videoRef.current);
        }
    }, [autoStart, source, start]);

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
        objectFit: 'contain'
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
                    screenCoords={detections[0].screenCoords}
                    container={containerRef.current}
                >
                    {children}
                </LocusTransform>
            );
        }

        return children;
    };

    return (
        <LocusContext.Provider value={{ detections, container: containerRef.current, state }}>
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
                        gap: '12px'
                    }}>
                        <div className="spinner" style={{
                            width: '30px',
                            height: '30px',
                            border: '3px solid rgba(99, 102, 241, 0.3)',
                            borderTopColor: '#6366f1',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }} />
                        Compiling Target...
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
                        boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                    }}>
                        <strong>Camera Error:</strong> {error}
                    </div>
                )}
            </div>
        </LocusContext.Provider>
    );
};

/**
 * LocusTransform - Positions children on top of a detection.
 */
export const LocusTransform: React.FC<{
    matrix: number[] | null;
    screenCoords?: { x: number; y: number }[] | null;
    container?: HTMLElement | null;
    children: ReactNode;
}> = ({ matrix, screenCoords, container: containerProp, children }) => {
    const ctx = React.useContext(LocusContext);
    const container = containerProp || ctx.container;

    if (!matrix || !screenCoords || !container) return null;

    // Use homography for more stable DOM alignment
    const homography = solveHomographyFromPoints(screenCoords, container);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100px', // Base size (matching solveHomography)
            height: '100px',
            transformOrigin: '0 0',
            transform: `matrix3d(${homography.join(',')})`,
            pointerEvents: 'auto',
            zIndex: 10
        }}>
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
                // Map points to 0-100 scale for SVG
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
 * Calculates a homography matrix to map a 100x100 square to the 4 screen corners.
 */
function solveHomographyFromPoints(pts: { x: number; y: number }[], container: HTMLElement) {
    if (!pts || pts.length < 4) return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    const rect = container.getBoundingClientRect();
    const w = rect.width || container.clientWidth || 1547;
    const h = rect.height || container.clientHeight || 871;

    // Check media element inside container
    const mediaEl = container.querySelector('video, canvas') as HTMLVideoElement | HTMLCanvasElement | null;
    const inputW = (mediaEl as HTMLVideoElement)?.videoWidth || (mediaEl as HTMLCanvasElement)?.width || 1547;
    const inputH = (mediaEl as HTMLVideoElement)?.videoHeight || (mediaEl as HTMLCanvasElement)?.height || 871;

    const containerRatio = w / h;
    const mediaRatio = inputW / inputH;

    let renderW = w;
    let renderH = h;
    let offsetX = 0;
    let offsetY = 0;

    if (containerRatio > mediaRatio) {
        renderH = h;
        renderW = renderH * mediaRatio;
        offsetX = (w - renderW) / 2;
    } else {
        renderW = w;
        renderH = renderW / mediaRatio;
        offsetY = (h - renderH) / 2;
    }

    const scaleX = renderW / inputW;
    const scaleY = renderH / inputH;

    // Find bounding corners from inliers
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    for (const p of pts) {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
    }

    const p1 = { x: offsetX + minX * scaleX, y: offsetY + minY * scaleY }; // Upper-Left (pUL)
    const p2 = { x: offsetX + maxX * scaleX, y: offsetY + minY * scaleY }; // Upper-Right (pUR)
    const p3 = { x: offsetX + minX * scaleX, y: offsetY + maxY * scaleY }; // Lower-Left (pLL)
    const p4 = { x: offsetX + maxX * scaleX, y: offsetY + maxY * scaleY }; // Lower-Right (pLR)

    return solveHomography(100, 100, p1, p2, p3, p4);
}

function solveHomography(w: number, h: number, p1: any, p2: any, p3: any, p4: any) {
    const x1 = p1.x, y1 = p1.y;
    const x2 = p2.x, y2 = p2.y;
    const x3 = p3.x, y3 = p3.y;
    const x4 = p4.x, y4 = p4.y;

    const dx1 = x2 - x4, dx2 = x3 - x4, dx3 = x1 - x2 + x4 - x3;
    const dy1 = y2 - y4, dy2 = y3 - y4, dy3 = y1 - y2 + y4 - y3;

    let a, b, c, d, e, f, g, h_coeff;
    const det = dx1 * dy2 - dx2 * dy1;
    if (Math.abs(det) < 0.000001) return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

    g = (dx3 * dy2 - dx2 * dy3) / det;
    h_coeff = (dx1 * dy3 - dx3 * dy1) / det;
    a = x2 - x1 + g * x2;
    b = x3 - x1 + h_coeff * x3;
    c = x1;
    d = y2 - y1 + g * y2;
    e = y3 - y1 + h_coeff * y3;
    f = y1;

    return [
        a / w, d / w, 0, g / w,
        b / h, e / h, 0, h_coeff / h,
        0, 0, 1, 0,
        c, f, 0, 1
    ];
}
