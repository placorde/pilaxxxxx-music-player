
import React, { useState } from 'react';
import { Mix } from '../types';
import MixList from './MixList';
import { ChevronDownIcon } from './icons';

interface MusicSectionProps {
  title: string;
  mixes: Mix[];
  onPlayTrack: (track: Mix) => void;
  currentTrack: Mix | null;
  isPlaying: boolean;
}

const MusicSection: React.FC<MusicSectionProps> = ({ title, mixes, onPlayTrack, currentTrack, isPlaying }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <div
        className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 sm:p-8 flex items-center cursor-pointer transition-all duration-300 hover:bg-zinc-800/60"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsOpen(!isOpen); }}
      >
        <div className="flex-1"></div>
        <h2 className="font-orbitron text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider text-white text-center">
          {title}
        </h2>
        <div className="flex-1 flex justify-end">
          <ChevronDownIcon
            className={`w-8 h-8 sm:w-10 sm:h-10 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </div>
      <div
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
           <MixList mixes={mixes} onPlayTrack={onPlayTrack} currentTrack={currentTrack} isPlaying={isPlaying} />
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
