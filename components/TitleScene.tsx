import React, { useEffect, useState } from 'react';
import { THEME } from '../themeConfig';

interface TitleSceneProps {
  onStart: () => void;
}

const TitleScene: React.FC<TitleSceneProps> = ({ onStart }) => {
  const [showPressKey, setShowPressKey] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPressKey(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyPress = () => onStart();
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onStart]);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative z-50 cursor-pointer"
      onClick={onStart}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-8 opacity-0 animate-[fadeIn_2s_ease-out_forwards]">
          <h2 className={`${THEME.fonts.heading} text-botw-gold text-xl tracking-[0.5em] uppercase text-center mb-2`}>
            Eternal Return
          </h2>
          <h1 className={`${THEME.fonts.heading} text-6xl md:text-8xl text-white tracking-widest font-black text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]`}>
            CLIP SHIFT
          </h1>
        </div>

        <div className={`mt-16 transition-opacity duration-1000 ${showPressKey ? 'opacity-100' : 'opacity-0'}`}>
          <p className={`${THEME.fonts.body} text-botw-cream/70 tracking-[0.2em] animate-pulse text-sm`}>
            PRESS ANY KEY TO START
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center opacity-30">
        <div className="w-px h-24 bg-gradient-to-t from-transparent via-botw-gold to-transparent"></div>
      </div>
    </div>
  );
};

export default TitleScene;
