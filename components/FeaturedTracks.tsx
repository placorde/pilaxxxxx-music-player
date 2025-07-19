
import React, { useState } from 'react';
import { Mix } from '../types';
import MixList from './MixList';
import { danceGenres, favouriteDanceTracks } from '../data/mixes';

interface FavouriteDanceTracksProps {
  onPlayTrack: (track: Mix) => void;
  currentTrack: Mix | null;
  isPlaying: boolean;
}

const FavouriteDanceTracks: React.FC<FavouriteDanceTracksProps> = ({ onPlayTrack, currentTrack, isPlaying }) => {
  const [selectedGenre, setSelectedGenre] = useState<string>(danceGenres[0]);

  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="font-orbitron text-4xl sm:text-5xl font-bold tracking-wider text-white">Favourite Dance Tracks</h2>
        <p className="text-zinc-400 mt-2">A handpicked selection of genres to make you move.</p>
      </div>

      <div className="relative mb-8">
        <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-10 sm:hidden"></div>
        <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-4 px-4 sm:px-0 scrollbar-hide">
          {danceGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-5 py-2 text-sm font-bold rounded-full whitespace-nowrap transition-all duration-300 transform hover:-translate-y-1 ${
                selectedGenre === genre
                  ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
        <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10 sm:hidden"></div>
      </div>

      <div className="max-w-4xl mx-auto">
         {selectedGenre && (
           <div className="animate-fade-in-down">
             <MixList 
                key={selectedGenre}
                mixes={favouriteDanceTracks[selectedGenre]}
                onPlayTrack={onPlayTrack}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
              />
           </div>
         )}
      </div>
    </section>
  );
};

export default FavouriteDanceTracks;
