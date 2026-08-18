import React, { useState } from 'react';
import { TabControllerThree } from './TabControllerThree.js';
import { TabUseLocus } from './TabUseLocus.js';
import { TabDeclarativeLocus } from './TabDeclarativeLocus.js';

type TabId = 'controller-three' | 'use-locus' | 'declarative-locus';

export const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('controller-three');

    const tabs = [
        {
            id: 'controller-three' as TabId,
            title: 'Three.js + Controller',
            subtitle: "import { Controller } from 'locus-ar'",
            icon: '🔺',
            badge: 'Bajo Nivel / Three.js',
            badgeColor: '#10b981'
        },
        {
            id: 'use-locus' as TabId,
            title: 'useLocus() Hook',
            subtitle: "import { useLocus } from 'locus-ar/client'",
            icon: '🪝',
            badge: 'React Hook',
            badgeColor: '#6366f1'
        },
        {
            id: 'declarative-locus' as TabId,
            title: '<Locus /> Declarativo',
            subtitle: "import { Locus } from 'locus-ar/client'",
            icon: '⚛️',
            badge: 'JSX Declarativo',
            badgeColor: '#a855f7'
        }
    ];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            background: '#090d16',
            color: '#f8fafc',
            overflow: 'hidden',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            {/* Main Header & Tab Navigation Bar */}
            <header style={{
                height: '64px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 20px',
                background: '#0f172a',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                zIndex: 20
            }}>
                {/* Brand / Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #10b981, #6366f1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                    }}>
                        ⚡
                    </div>
                    <div>
                        <div style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '-0.3px', background: 'linear-gradient(135deg, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Locus AR Playground
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>
                            3 Formas de Uso de la Misma Librería
                        </div>
                    </div>
                </div>

                {/* Tab Switcher Pills */}
                <div style={{
                    display: 'flex',
                    background: 'rgba(0, 0, 0, 0.4)',
                    padding: '4px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    gap: '4px'
                }}>
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    border: isActive ? `1px solid ${tab.badgeColor}55` : '1px solid transparent',
                                    background: isActive ? `${tab.badgeColor}22` : 'transparent',
                                    color: isActive ? '#ffffff' : '#94a3b8',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    fontWeight: isActive ? 700 : 500,
                                    fontSize: '13px'
                                }}
                            >
                                <span style={{ fontSize: '15px' }}>{tab.icon}</span>
                                <span>{tab.title}</span>
                                <span style={{
                                    fontSize: '10px',
                                    padding: '2px 6px',
                                    borderRadius: '6px',
                                    background: isActive ? `${tab.badgeColor}44` : 'rgba(255,255,255,0.06)',
                                    color: isActive ? tab.badgeColor : '#64748b',
                                    fontWeight: 700
                                }}>
                                    {tab.badge}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Import snippet preview */}
                <div style={{
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    color: '#94a3b8',
                    background: 'rgba(0,0,0,0.3)',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    {tabs.find(t => t.id === activeTab)?.subtitle}
                </div>
            </header>

            {/* Active Tab View */}
            <main style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
                {activeTab === 'controller-three' && <TabControllerThree key="controller-three" />}
                {activeTab === 'use-locus' && <TabUseLocus key="use-locus" />}
                {activeTab === 'declarative-locus' && <TabDeclarativeLocus key="declarative-locus" />}
            </main>
        </div>
    );
};
