
import React from 'react';
import { Mix } from '../types';
import MixItem from './MixItem';

interface MixListProps {
  mixes: Mix[];
  onPlayTrack: (track: Mix) => void;
  currentTrack: Mix | null;
  isPlaying: boolean;
  className?: string;
}

const MixList: React.FC<MixListProps> = ({ mixes, onPlayTrack, currentTrack, isPlaying, className = '' }) => {
  return (
    <div className={`bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-4 space-y-2 ${className}`}>
      {mixes.map((mix) => (
        <MixItem
          key={mix.id}
          mix={mix}
          onPlayTrack={onPlayTrack}
          isCurrentTrack={currentTrack?.id === mix.id}
          isPlaying={isPlaying}
        />
      ))}
    </div>
  );
};

export default MixList;
