
import React from 'react';
import { Mix } from '../types';
import { PlayIcon, PauseIcon } from './icons';

interface MixItemProps {
  mix: Mix;
  onPlayTrack: (track: Mix) => void;
  isCurrentTrack: boolean;
  isPlaying: boolean;
}

const MixItem: React.FC<MixItemProps> = ({ mix, onPlayTrack, isCurrentTrack, isPlaying }) => {
  const isThisTrackPlaying = isCurrentTrack && isPlaying;
  
  const handlePlayClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onPlayTrack(mix);
  }

  return (
    <div className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${isCurrentTrack ? 'bg-cyan-500/10' : 'hover:bg-zinc-800/70'}`}>
      <button
        onClick={handlePlayClick}
        className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${isThisTrackPlaying ? 'bg-cyan-400 text-black' : 'bg-zinc-700 text-white hover:bg-cyan-500'}`}
        aria-label={isThisTrackPlaying ? `Pause ${mix.title}` : `Play ${mix.title}`}
      >
        {isThisTrackPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
      </button>
      <div className="ml-4 flex-grow">
        <p className={`font-bold transition-colors duration-200 ${isCurrentTrack ? 'text-cyan-400' : 'text-white'}`}>{mix.title}</p>
        <p className="text-sm text-zinc-400">{mix.genre}</p>
      </div>
      <div className="text-right text-zinc-400 text-sm">
        {mix.duration}
      </div>
    </div>
  );
};

export default MixItem;
