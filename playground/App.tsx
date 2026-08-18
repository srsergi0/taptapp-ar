import React, { useState } from 'react';
import { Locus, LocusTransform } from '../src/client/index.js';

const DEFAULT_TARGET = '../tests/assets/test-image.png';
const DEFAULT_QUERY = '../tests/assets/test-query.jpg';

export const App: React.FC = () => {
    const [feedSource, setFeedSource] = useState<string | undefined>(DEFAULT_QUERY);
    const [feedName, setFeedName] = useState('test-query.jpg');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', background: '#090d16', color: '#f8fafc', overflow: 'hidden' }}>
            {/* Header */}
            <header style={{ height: '56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', background: '#0f172a', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '22px' }}>💎</span>
                    <strong style={{ fontSize: '16px' }}>Locus AR • Componente &lt;Locus /&gt; + &lt;LocusTransform /&gt;</strong>
                </div>
                <div style={{ fontSize: '13px', color: '#38bdf8', fontWeight: '600' }}>
                    🧪 Modo: {feedName}
                </div>
            </header>

            {/* Main Area */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', flex: 1, overflow: 'hidden' }}>
                {/* Viewport: Pure <Locus> Component */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617', overflow: 'hidden' }}>
                    <Locus
                        targets={{ image: DEFAULT_TARGET, label: 'test-image' }}
                        source={feedSource}
                        width={1547}
                        height={871}
                        bioInspired={true}
                        style={{ width: '100%', height: '100%' }}
                    >
                        {(detections) =>
                            detections.map((det) => (
                                <LocusTransform
                                    key={det.targetIndex}
                                    matrix={det.worldMatrix}
                                    screenCoords={det.screenCoords}
                                >
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        background: 'rgba(15, 23, 42, 0.88)',
                                        backdropFilter: 'blur(12px)',
                                        border: '2.5px solid #10b981',
                                        borderRadius: '10px',
                                        padding: '10px',
                                        color: 'white',
                                        boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        boxSizing: 'border-box'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ fontSize: '14px' }}>🎯</span>
                                            <strong style={{ fontSize: '11px', color: '#34d399' }}>{det.label}</strong>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '9px', color: '#94a3b8', lineHeight: 1.2 }}>
                                            Fijado con &lt;LocusTransform /&gt;
                                        </p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: 'bold' }}>
                                            <span style={{ color: '#38bdf8' }}>Inliers: {det.inliersCount}</span>
                                            <span style={{ color: '#10b981' }}>{((det.stability || 1) * 100).toFixed(0)}%</span>
                                        </div>
                                    </div>
                                </LocusTransform>
                            ))
                        }
                    </Locus>
                </div>

                {/* Sidebar Controls */}
                <aside style={{ background: '#0f172a', borderLeft: '1px solid rgba(255, 255, 255, 0.08)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', textTransform: 'uppercase', color: '#94a3b8' }}>🖼️ Escenas de Prueba</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <button
                                onClick={() => { setFeedSource(DEFAULT_QUERY); setFeedName('test-query.jpg'); }}
                                style={{ padding: '12px', borderRadius: '8px', background: feedName === 'test-query.jpg' ? '#10b981' : 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', textAlign: 'left', fontWeight: '600' }}
                            >
                                🖥️ test-query.jpg
                                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Monitor Samsung con reflejos</div>
                            </button>
                            <button
                                onClick={() => { setFeedSource(DEFAULT_TARGET); setFeedName('test-image.png'); }}
                                style={{ padding: '12px', borderRadius: '8px', background: feedName === 'test-image.png' ? '#10b981' : 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', textAlign: 'left', fontWeight: '600' }}
                            >
                                🖼️ test-image.png
                                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Target original 1024x1024</div>
                            </button>
                            <button
                                onClick={() => { setFeedSource(undefined); setFeedName('Cámara Real'); }}
                                style={{ padding: '12px', borderRadius: '8px', background: feedName === 'Cámara Real' ? '#6366f1' : 'rgba(99, 102, 241, 0.2)', color: 'white', border: '1px solid #6366f1', cursor: 'pointer', textAlign: 'left', fontWeight: '600' }}
                            >
                                📷 Activar Cámara Real
                            </button>
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto', padding: '14px', background: 'rgba(0, 0, 0, 0.4)', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>PARADIGMA ACTIVO</div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#34d399' }}>
                            &lt;Locus /&gt; + &lt;LocusTransform /&gt;
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};
