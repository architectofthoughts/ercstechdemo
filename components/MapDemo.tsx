
import React, { useState } from 'react';
import { SwordIcon, CampfireIcon, QuestionIcon, SkullIcon, CrownIcon } from './icons';

interface MapNode {
    id: string;
    type: 'battle' | 'elite' | 'event' | 'rest' | 'boss';
    x: number; // percentage (0-100)
    level: number; // 0 (bottom) to 4 (top)
    parents: string[];
}

// Symmetrical Tech Demo Map Layout
// Level 4 (Top) -> Boss
// Level 3 -> Rest
// Level 2 -> Elites
// Level 1 -> Mixed
// Level 0 (Bottom) -> Starts
const PREMADE_MAP_NODES: MapNode[] = [
    // Level 4: Boss (Center)
    { id: '4-0', type: 'boss', x: 50, level: 4, parents: ['3-0'] },

    // Level 3: Rest (Center)
    { id: '3-0', type: 'rest', x: 50, level: 3, parents: ['2-0', '2-1'] },

    // Level 2: Elites (Split)
    { id: '2-0', type: 'elite', x: 30, level: 2, parents: ['1-0', '1-1'] },
    { id: '2-1', type: 'elite', x: 70, level: 2, parents: ['1-1', '1-2'] },

    // Level 1: Events/Battles
    { id: '1-0', type: 'event', x: 20, level: 1, parents: ['0-0'] },
    { id: '1-1', type: 'battle', x: 50, level: 1, parents: ['0-0', '0-1', '0-2'] },
    { id: '1-2', type: 'event', x: 80, level: 1, parents: ['0-2'] },

    // Level 0: Starts
    { id: '0-0', type: 'battle', x: 20, level: 0, parents: [] },
    { id: '0-1', type: 'battle', x: 50, level: 0, parents: [] },
    { id: '0-2', type: 'battle', x: 80, level: 0, parents: [] },
];

const MapDemo: React.FC<{ onBackToMenu: () => void, onExtraction?: () => void }> = ({ onBackToMenu, onExtraction }) => {
    const [hoveredNode, setHoveredNode] = useState<MapNode | null>(null);

    const getNodeIcon = (type: string) => {
        switch (type) {
            case 'battle': return <SwordIcon className="w-5 h-5" />;
            case 'elite': return <SkullIcon className="w-6 h-6" />;
            case 'event': return <QuestionIcon className="w-5 h-5" />;
            case 'rest': return <CampfireIcon className="w-5 h-5" />;
            case 'boss': return <CrownIcon className="w-8 h-8" />;
            default: return <SwordIcon className="w-5 h-5" />;
        }
    };

    const getNodeLabel = (type: string) => {
        switch (type) {
            case 'battle': return 'Sector Battle';
            case 'elite': return 'Elite Threat';
            case 'event': return 'Unknown Signal';
            case 'rest': return 'Maintenance';
            case 'boss': return 'Sector Guardian';
            default: return 'Unknown';
        }
    };

    // Fixed container dimensions for consistent drawing
    const CONTAINER_HEIGHT = 600;
    const LEVEL_HEIGHT = 120;

    // Helper to get pixel coordinates
    const getCoords = (node: MapNode) => {
        // Invert Y: Level 4 is at Top (small Y), Level 0 is at Bottom (large Y)
        // Add padding to ensure top/bottom aren't cut off
        const y = CONTAINER_HEIGHT - (node.level * LEVEL_HEIGHT) - 60;
        const x = `${node.x}%`;
        return { x, y };
    };

    // Calculate SVG Paths
    const paths = [];
    for (const node of PREMADE_MAP_NODES) {
        const { x: cX, y: cY } = getCoords(node);

        for (const parentId of node.parents) {
            const parent = PREMADE_MAP_NODES.find(n => n.id === parentId);
            if (parent) {
                const { x: pX, y: pY } = getCoords(parent);

                paths.push(
                    <line
                        key={`${parent.id}-${node.id}`}
                        x1={pX} y1={pY} x2={cX} y2={cY}
                        stroke="#e2c774"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        className="opacity-30"
                    />
                );
            }
        }
    }

    return (
        <div className="w-full h-full flex flex-col relative p-6 bg-botw-dark">
            {/* Header HUD */}
            <div className="w-full flex justify-between items-start pointer-events-none z-20 relative flex-shrink-0 h-20">
                <button
                    onClick={onBackToMenu}
                    className="pointer-events-auto group flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"
                >
                    <div className="w-8 h-8 border border-botw-gold rotate-45 flex items-center justify-center group-hover:bg-botw-gold/20 transition-colors">
                        <div className="w-2 h-2 bg-botw-gold -rotate-45"></div>
                    </div>
                    <span className="font-serif text-botw-gold text-sm tracking-widest uppercase">Return to System</span>
                </button>

                {onExtraction && (
                    <button
                        onClick={onExtraction}
                        className="pointer-events-auto ml-4 px-6 py-2 border border-botw-blue/50 bg-botw-blue/10 hover:bg-botw-blue/20 text-botw-blue font-serif tracking-widest uppercase text-xs transition-all"
                    >
                        Simulate Act Clear
                    </button>
                )}

                <div className="flex flex-col items-end">
                    <h2 className="text-2xl font-serif font-bold text-botw-gold">SECTOR MAP</h2>
                    <div className="text-xs font-serif text-botw-cream opacity-60 tracking-widest">Procedural Generation V1</div>
                </div>
            </div>

            {/* Map Container */}
            <div className="flex-1 w-full flex justify-center items-center overflow-hidden">
                <div className="relative w-full max-w-3xl" style={{ height: CONTAINER_HEIGHT }}>
                    {/* Background Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                        {paths}
                    </svg>

                    {/* Nodes */}
                    {PREMADE_MAP_NODES.map(node => {
                        const isHovered = hoveredNode?.id === node.id;
                        const { x, y } = getCoords(node);

                        return (
                            <div
                                key={node.id}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                                style={{ left: x, top: y }}
                                onMouseEnter={() => setHoveredNode(node)}
                                onMouseLeave={() => setHoveredNode(null)}
                            >
                                {/* Node Visual */}
                                <div className={`
                                    rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-botw-dark relative
                                    ${node.type === 'boss' ? 'w-20 h-20 border-botw-red/50' : 'w-12 h-12 border-botw-gold/50'}
                                    ${isHovered ? 'border-botw-blue shadow-[0_0_20px_rgba(77,232,254,0.5)] scale-110' : 'shadow-[0_0_10px_rgba(226,199,116,0.1)]'}
                                 `}>
                                    {/* Inner Icon */}
                                    <div className={`${isHovered ? 'text-botw-blue' : (node.type === 'boss' ? 'text-botw-red' : 'text-botw-gold')} transition-colors`}>
                                        {getNodeIcon(node.type)}
                                    </div>

                                    {/* Active/Current Indicator (Level 0) */}
                                    {node.level === 0 && (
                                        <div className="absolute -bottom-6 text-[0.5rem] text-botw-gold uppercase tracking-widest whitespace-nowrap opacity-50">
                                            Current Pos
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Info Panel Overlay (Bottom Center) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none h-24">
                <div className={`bg-botw-slate/90 backdrop-blur border border-botw-gold/30 px-12 py-4 flex flex-col items-center transition-all duration-300 ${hoveredNode ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    {/* Ornamental Borders */}
                    <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-botw-gold"></div>
                    <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-botw-gold"></div>
                    <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-botw-gold"></div>
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-botw-gold"></div>

                    <h3 className="text-lg font-serif font-bold text-botw-gold uppercase tracking-widest mb-1">
                        {hoveredNode ? getNodeLabel(hoveredNode.type) : ''}
                    </h3>
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-botw-blue to-transparent"></div>
                    <p className="text-xs font-serif text-zinc-400 mt-2">
                        Sector Level: {hoveredNode?.level}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MapDemo;
