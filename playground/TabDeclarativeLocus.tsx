import React, { useState } from 'react';
import { Locus, LocusTransform } from 'locus-ar/client';

const DEFAULT_TARGET = '../tests/assets/test-image.png';
const DEFAULT_QUERY = '../tests/assets/test-query.jpg';

export const TabDeclarativeLocus: React.FC = () => {
    const [feedMode, setFeedMode] = useState<'test-query.jpg' | 'test-image.png' | 'camera'>('test-query.jpg');
    const [likeCount, setLikeCount] = useState(42);
    const [isHovered, setIsHovered] = useState(false);

    // Source prop passed to <Locus />
    const currentSource = feedMode === 'camera' ? undefined : (feedMode === 'test-query.jpg' ? DEFAULT_QUERY : DEFAULT_TARGET);
    const feedDims = feedMode === 'test-image.png' ? { width: 1024, height: 1024 } : (feedMode === 'camera' ? { width: 1280, height: 720 } : { width: 1547, height: 871 });

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', flex: 1, overflow: 'hidden', height: '100%' }}>
            {/* Main AR Viewport */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617', overflow: 'hidden', padding: '20px' }}>
                <div style={{
                    position: 'relative',
                    aspectRatio: `${feedDims.width} / ${feedDims.height}`,
                    maxWidth: '100%',
                    maxHeight: '100%',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#000',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <Locus
                        key={feedMode} // Re-mount when feed mode changes
                        targets={{ image: DEFAULT_TARGET, label: 'Cyber Target' }}
                        source={currentSource}
                        width={feedDims.width}
                        height={feedDims.height}
                        bioInspired={true}
                        debugMode={false}
                        style={{ width: '100%', height: '100%' }}
                    >
                        {(detections) => (
                            detections.map((det) => (
                                <LocusTransform
                                    key={det.targetIndex}
                                    matrix={det.worldMatrix}
                                    modelViewTransform={det.modelViewTransform}
                                    screenCoords={det.screenCoords}
                                    targetIndex={det.targetIndex}
                                >
                                    {/* 🌟 AR Card perfectly aligned and bounded to the physical target */}
                                    <div
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            boxSizing: 'border-box',
                                            padding: '12px',
                                            borderRadius: '16px',
                                            background: 'rgba(15, 23, 42, 0.88)',
                                            backdropFilter: 'blur(16px)',
                                            border: '2px solid rgba(168, 85, 247, 0.6)',
                                            boxShadow: isHovered
                                                ? '0 20px 40px rgba(168, 85, 247, 0.4), inset 0 0 20px rgba(168, 85, 247, 0.3)'
                                                : '0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(168, 85, 247, 0.15)',
                                            color: '#f8fafc',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                                            pointerEvents: 'auto',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ fontSize: '18px' }}>🔮</span>
                                                <strong style={{ fontSize: '13px', color: '#c084fc' }}>Locus AR Element</strong>
                                            </div>
                                            <span style={{
                                                fontSize: '10px',
                                                padding: '2px 8px',
                                                borderRadius: '10px',
                                                background: 'rgba(34, 197, 94, 0.2)',
                                                color: '#4ade80',
                                                border: '1px solid rgba(34, 197, 94, 0.4)',
                                                fontWeight: 700
                                            }}>
                                                LIVE
                                            </span>
                                        </div>

                                        <p style={{ margin: '4px 0', fontSize: '11px', color: '#cbd5e1', lineHeight: '1.3' }}>
                                            Componente interactivo React con dimensiones y perspectiva 3D fijadas al marcador.
                                        </p>

                                        {/* Tracking HUD inside AR Card */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', fontSize: '11px' }}>
                                            <span style={{ color: '#94a3b8' }}>Inliers:</span>
                                            <strong style={{ color: '#a855f7' }}>{det.inliersCount || det.screenCoords?.length || 0} pts</strong>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setLikeCount(c => c + 1);
                                            }}
                                            style={{
                                                width: '100%',
                                                padding: '8px 12px',
                                                borderRadius: '8px',
                                                border: 'none',
                                                background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                                                color: 'white',
                                                fontWeight: 600,
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '6px',
                                                boxShadow: '0 4px 12px rgba(168, 85, 247, 0.3)'
                                            }}
                                        >
                                            <span>❤️ Me gusta</span>
                                            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '1px 6px', borderRadius: '10px', fontSize: '10px' }}>{likeCount}</span>
                                        </button>
                                    </div>
                                </LocusTransform>
                            ))
                        )}
                    </Locus>
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
                        background: 'rgba(168, 85, 247, 0.2)',
                        color: '#c084fc',
                        border: '1px solid #a855f7'
                    }}>
                        ⚛️ Componente React Declarativo
                    </span>

                    <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', textTransform: 'uppercase', color: '#94a3b8' }}>🖼️ Escenas de Prueba</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button
                            onClick={() => setFeedMode('test-query.jpg')}
                            style={{ padding: '12px', borderRadius: '8px', background: feedMode === 'test-query.jpg' ? '#a855f7' : 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', textAlign: 'left', fontWeight: '600' }}
                        >
                            🖥️ test-query.jpg
                            <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '2px' }}>Monitor Samsung con perspectiva</div>
                        </button>
                        <button
                            onClick={() => setFeedMode('test-image.png')}
                            style={{ padding: '12px', borderRadius: '8px', background: feedMode === 'test-image.png' ? '#a855f7' : 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', textAlign: 'left', fontWeight: '600' }}
                        >
                            🖼️ test-image.png
                            <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '2px' }}>Target original 1024x1024</div>
                        </button>
                        <button
                            onClick={() => setFeedMode('camera')}
                            style={{ padding: '12px', borderRadius: '8px', background: feedMode === 'camera' ? '#6366f1' : 'rgba(99, 102, 241, 0.2)', color: 'white', border: '1px solid #6366f1', cursor: 'pointer', textAlign: 'left', fontWeight: '600' }}
                        >
                            📷 Activar Cámara Real
                        </button>
                    </div>
                </div>

                <div style={{ marginTop: 'auto', padding: '14px', background: 'rgba(0, 0, 0, 0.4)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>FORMA DE USO #3</div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#c084fc', fontFamily: 'monospace' }}>
                        import &#123; Locus, LocusTransform &#125; from 'locus-ar/client';
                    </div>
                    <p style={{ fontSize: '11px', color: '#64748b', marginTop: '6px', lineHeight: '1.4' }}>
                        Sintaxis declarativa JSX 100% React. Coloca cualquier componente o interfaz interactiva directamente ajustada al tamaño y perspectiva de tus marcadores físicos.
                    </p>
                </div>
            </aside>
        </div>
    );
};
