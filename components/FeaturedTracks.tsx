
import React from 'react';
import { Mix } from '../types';
import MixItem from './MixItem';

interface FeaturedTracksProps {
  tracks: Mix[];
  onPlayTrack: (track: Mix) => void;
  currentTrack: Mix | null;
  isPlaying: boolean;
}

const FeaturedTracks: React.FC<FeaturedTracksProps> = ({ tracks, onPlayTrack, currentTrack, isPlaying }) => {
  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="font-orbitron text-4xl sm:text-5xl font-bold tracking-wider text-white">Mes Pépites</h2>
        <p className="text-zinc-400 mt-2">A personal selection of tracks I love.</p>
      </div>
      <div className="max-w-3xl mx-auto bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-4 space-y-2">
        {tracks.map((track) => (
           <MixItem
            key={track.id}
            mix={track}
            onPlayTrack={onPlayTrack}
            isCurrentTrack={currentTrack?.id === track.id}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedTracks;
