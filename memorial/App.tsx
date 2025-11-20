
import React, { useState } from 'react';
import { SnapshotItem } from './components/SnapshotItem';
import { AddSnapshotModal } from './components/AddSnapshotModal';
import { SnapshotEntry } from './types';
import { Plus, History, Sparkles } from 'lucide-react';
import { APP_TEXTS, INITIAL_SNAPSHOTS, THEME } from './data';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Initialize state from the centralized data file
  const [snapshots, setSnapshots] = useState<SnapshotEntry[]>(INITIAL_SNAPSHOTS);

  const handleAddSnapshot = (newEntry: SnapshotEntry) => {
    setSnapshots([newEntry, ...snapshots]);
  };

  return (
    <div className={`min-h-screen py-10 px-4 md:px-8 ${THEME.fonts.heading} relative overflow-hidden`}>
      {/* Decorative corner patterns (Sheikah Style) */}
      <div className="fixed top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-amber-100/20 rounded-tl-3xl pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-amber-100/20 rounded-br-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-4 mb-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-200"></div>
            <Sparkles className="text-amber-400 w-4 h-4" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-200"></div>
          </div>
          
          <h1 className={`text-amber-50 tracking-widest drop-shadow-lg flex flex-col items-center gap-2 ${THEME.textSizes.headerTitle}`}>
            <span className={`${THEME.fonts.body} ${THEME.textSizes.headerSubtitle} text-cyan-400 tracking-[0.3em] uppercase sheikah-glow`}>
              {APP_TEXTS.header.systemLabel}
            </span>
            <span className="font-bold">{APP_TEXTS.header.title}</span>
          </h1>
          <p className={`text-stone-500 mt-2 ${THEME.textSizes.headerSubtitle}`}>{APP_TEXTS.header.subtitle}</p>

          {/* Floating Action Button */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="absolute right-0 top-8 p-3 bg-stone-800 border border-amber-500/30 text-amber-100 rounded hover:bg-stone-700 hover:border-cyan-400 hover:text-cyan-300 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] active:scale-95 group"
            title="Analyze Tablet"
          >
            <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </header>

        {/* Timeline Container - "Inventory List" style */}
        <div className="space-y-1">
            
            {/* Top Ornamental Bar */}
            <div className="h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent w-full mb-6"></div>

            {/* List Items */}
            <div className="flex flex-col gap-6">
              {snapshots.map((entry) => (
                <SnapshotItem key={entry.id} entry={entry} />
              ))}
            </div>
            
            {/* Bottom Ornamental Bar */}
            <div className="h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent w-full mt-6"></div>
        </div>

        {/* Footer Info */}
        <div className={`mt-8 text-center text-stone-600 text-xs flex items-center justify-center gap-2 ${THEME.fonts.body} tracking-widest`}>
          <History size={12} />
          <span>{APP_TEXTS.footer.text}</span>
        </div>

      </div>

      <AddSnapshotModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddSnapshot}
      />
    </div>
  );
};

export default App;
