import React from 'react';
import { THEME } from '../themeConfig';
import { PlayArrowIcon } from './icons';

interface MainMenuProps {
    onStartGame: () => void;
    onGacha: () => void;
    onMemorial: () => void;
}

const MainMenu: React.FC<MainMenuProps & { disabledItems?: string[] }> = ({ onStartGame, onGacha, onMemorial, disabledItems = [] }) => {
    const menuItems = [
        { label: 'START OPERATION', action: onStartGame, primary: true },
        { label: 'MEMORIAL', action: onMemorial },
        { label: 'GACHA', action: onGacha },
        { label: 'OPTIONS', action: () => console.log('Options clicked') },
        { label: 'EXIT', action: () => console.log('Exit clicked') },
    ];

    return (
        <div className="w-full h-full flex items-center justify-start pl-24 relative z-40">
            <div className="flex flex-col gap-6">
                {menuItems.map((item, index) => {
                    const isDisabled = disabledItems.includes(item.label);
                    return (
                        <button
                            key={item.label}
                            onClick={isDisabled ? undefined : item.action}
                            disabled={isDisabled}
                            className={`
              group relative flex items-center gap-4 text-left transition-all duration-300
              ${item.primary ? 'text-4xl' : 'text-2xl'}
              ${isDisabled ? 'opacity-30 cursor-not-allowed grayscale' : 'cursor-pointer'}
            `}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Hover Indicator */}
                            {!isDisabled && (
                                <div className={`
                w-2 h-2 bg-botw-gold rotate-45 transform transition-all duration-300 opacity-0 
                group-hover:opacity-100 group-hover:translate-x-2
                `}></div>
                            )}

                            <span className={`
              ${THEME.fonts.heading} tracking-widest
              ${item.primary ? 'text-white font-bold' : 'text-botw-cream/80'}
              ${!isDisabled && 'group-hover:text-botw-gold group-hover:pl-4'} transition-all duration-300
            `}>
                                {item.label}
                            </span>

                            {/* Background Hover Line */}
                            {!isDisabled && (
                                <div className="absolute bottom-0 left-0 w-0 h-px bg-botw-gold/50 transition-all duration-500 group-hover:w-full"></div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Right side decoration */}
            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-black/80 to-transparent pointer-events-none"></div>
        </div>
    );
};

export default MainMenu;
