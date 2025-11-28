import React, { useState } from 'react';

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

const MapDemo: React.FC<{ onBackToMenu: () => void, onExtraction?: () => void, onNodeSelect?: (nodeType: string) => void, progressLevel?: number }> = ({ onBackToMenu, onExtraction, onNodeSelect, progressLevel = 0 }) => {
    const [hoveredNode, setHoveredNode] = useState<MapNode | null>(null);

    // Determine current level and position based on progressLevel
    // progressLevel 0: Start (No current node, select Level 0)
    // progressLevel 1: After Battle (Current '0-0', select Level 1)
    // progressLevel 3: Pre-Boss (Current '3-0', select Level 4)
    let currentNodeId: string | null = null;
    if (progressLevel === 1) currentNodeId = '0-0';
    if (progressLevel === 3) currentNodeId = '3-0';

    const handleNodeClick = (node: MapNode) => {
        // Validation based on progressLevel
        if (progressLevel === 0) {
            if (node.level === 0) {
                if (onNodeSelect) onNodeSelect(node.type);
            }
            return;
        }

        if (progressLevel === 1) {
            // Can only select Level 1 nodes connected to '0-0'
            if (node.level === 1 && node.parents.includes('0-0')) {
                if (onNodeSelect) onNodeSelect(node.type);
            }
            return;
        }

        if (progressLevel === 3) {
            // Can only select Level 4 (Boss) connected to '3-0'
            if (node.level === 4 && node.parents.includes('3-0')) {
                if (onNodeSelect) onNodeSelect(node.type);
            }
            return;
        }

        // Default behavior (fallback)
        if (onNodeSelect) {
            onNodeSelect(node.type);
        }
    };

    const getNodeIcon = (type: string) => {
        switch (type) {
            case 'battle': return <span className="text-xl">⚔️</span>;
            case 'elite': return <span className="text-xl">👿</span>;
            case 'event': return <span className="text-xl">❓</span>;
            case 'rest': return <span className="text-xl">🔥</span>;
            case 'boss': return <span className="text-2xl">👑</span>;
            default: return <span className="text-xl">⚔️</span>;
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

                let isVisitedPath = false;
                let isNextPath = false;

                if (progressLevel === 3) {
                    // All paths up to level 3 are visited
                    if (node.level <= 3 && parent.level <= 3) isVisitedPath = true;
                    // Path to boss is next
                    if (node.level === 4 && parent.id === '3-0') isNextPath = true;
                } else if (progressLevel === 1) {
                    // We are at 0-0. Paths connected to 0-0 are Next.
                    if (parent.id === '0-0' && node.level === 1) isNextPath = true;
                }

                paths.push(
                    <line
                        key={`${parent.id}-${node.id}`}
                        x1={pX} y1={pY} x2={cX} y2={cY}
                        stroke="#ffd700"
                        strokeWidth="1"
                        strokeDasharray={isNextPath ? "0" : "4 4"}
                        className={isVisitedPath ? "opacity-20" : (isNextPath ? "opacity-80 animate-pulse shadow-magical-glow" : "opacity-30")}
                    />
                );
            }
        }
    }

    return (
        <div className="w-full h-full flex flex-col relative p-6 bg-magical-dark">
            {/* Header HUD */}
            <div className="w-full flex justify-between items-start pointer-events-none z-20 relative flex-shrink-0 h-20">
                <button
                    onClick={onBackToMenu}
                    className="pointer-events-auto group flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity"
                >
                    <div className="w-8 h-8 border border-magical-gold rotate-45 flex items-center justify-center group-hover:bg-magical-gold/20 transition-colors">
                        <div className="w-2 h-2 bg-magical-gold -rotate-45"></div>
                    </div>
                    <span className="font-serif text-magical-gold text-sm tracking-widest uppercase">Return to System</span>
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
                    <h2 className="text-2xl font-serif font-bold text-magical-gold">SECTOR MAP</h2>
                    <div className="text-xs font-serif text-magical-text opacity-60 tracking-widest">Procedural Generation V1</div>
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

                        // Determine node state
                        let isVisited = false;
                        let isCurrent = false;
                        let isNext = false;
                        let isLocked = true;

                        if (progressLevel === 0) {
                            if (node.level === 0) {
                                isNext = true;
                                isLocked = false;
                            }
                        } else if (progressLevel === 1) {
                            if (node.id === '0-0') isCurrent = true;
                            if (node.level === 1 && node.parents.includes('0-0')) {
                                isNext = true;
                                isLocked = false;
                            }
                            if (node.level === 0 && node.id !== '0-0') isLocked = true; // Other start nodes locked
                        } else if (progressLevel === 3) {
                            if (node.level <= 3) isVisited = true;
                            if (node.id === '3-0') {
                                isVisited = false;
                                isCurrent = true;
                            }
                            if (node.level === 4 && node.parents.includes('3-0')) {
                                isNext = true;
                                isLocked = false;
                            }
                        }

                        // Override for visual clarity
                        if (isCurrent) isLocked = false;
                        if (isVisited) isLocked = false;

                        return (
                            <div
                                key={node.id}
                                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10 ${isLocked ? 'pointer-events-none' : ''}`}
                                style={{ left: x, top: y }}
                                onMouseEnter={() => setHoveredNode(node)}
                                onMouseLeave={() => setHoveredNode(null)}
                                onClick={() => handleNodeClick(node)}
                            >
                                {/* Node Visual */}
                                <div className={`
                                    rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-[#0a0a0a] relative z-20
                                    ${node.type === 'boss' ? 'w-20 h-20 border-magical-pink/50' : 'w-12 h-12 border-magical-gold/50'}
                                    ${isHovered && !isLocked ? 'border-magical-blue shadow-magical-glow scale-110' : 'shadow-[0_0_10px_rgba(255,215,0,0.1)]'}
                                    ${isVisited ? 'border-magical-gold/20' : ''}
                                    ${isCurrent ? 'bg-magical-blue/20 border-magical-blue animate-pulse' : ''}
                                    ${isLocked ? 'border-zinc-800 grayscale opacity-100' : ''} 
                                 `}>
                                    {/* Inner Icon */}
                                    <div className={`
                                        transition-colors
                                        ${isHovered && !isLocked ? 'text-magical-blue' : (node.type === 'boss' ? 'text-magical-pink' : 'text-magical-gold')}
                                        ${isLocked ? 'text-zinc-700' : ''}
                                        ${isVisited ? 'text-magical-gold/20' : ''}
                                    `}>
                                        {getNodeIcon(node.type)}
                                    </div>

                                    {/* Active/Current Indicator */}
                                    {(isCurrent) && (
                                        <div className="absolute -bottom-6 text-[0.5rem] text-magical-gold uppercase tracking-widest whitespace-nowrap opacity-50">
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
                <div className={`bg-magical-uiDark/90 backdrop-blur border border-magical-gold/30 px-12 py-4 flex flex-col items-center transition-all duration-300 ${hoveredNode ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    {/* Ornamental Borders */}
                    <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-magical-gold"></div>
                    <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-magical-gold"></div>
                    <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-magical-gold"></div>
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-magical-gold"></div>

                    <h3 className="text-lg font-serif font-bold text-magical-gold uppercase tracking-widest mb-1">
                        {hoveredNode ? getNodeLabel(hoveredNode.type) : ''}
                    </h3>
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-magical-blue to-transparent"></div>
                    <p className="text-xs font-serif text-magical-text/60 mt-2">
                        Sector Level: {hoveredNode?.level}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MapDemo;
