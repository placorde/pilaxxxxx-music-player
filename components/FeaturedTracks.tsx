
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mix } from '../types';
import MixList from './MixList';
import { danceGenres, favouriteDanceTracks } from '../data/mixes';
import { BackwardIcon, ForwardIcon } from './icons';

interface FavouriteDanceTracksProps {
  onPlayTrack: (track: Mix) => void;
  currentTrack: Mix | null;
  isPlaying: boolean;
}

const FavouriteDanceTracks: React.FC<FavouriteDanceTracksProps> = ({ onPlayTrack, currentTrack, isPlaying }) => {
  const [selectedGenre, setSelectedGenre] = useState<string>(danceGenres[0]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkForScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      checkForScroll();
      el.addEventListener('scroll', checkForScroll, { passive: true });
      window.addEventListener('resize', checkForScroll);

      return () => {
        el.removeEventListener('scroll', checkForScroll);
        window.removeEventListener('resize', checkForScroll);
      };
    }
  }, [checkForScroll]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.8;
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="font-orbitron text-4xl sm:text-5xl font-bold tracking-wider text-white">Favourite Dance Tracks</h2>
        <p className="text-zinc-400 mt-2">A handpicked selection of genres to make you move.</p>
      </div>

      <div className="relative mb-8 group">
        <div 
          ref={scrollContainerRef} 
          className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-4 px-4 scrollbar-hide"
        >
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
        
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 rounded-full p-1.5 text-white hover:bg-cyan-500/50 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
            aria-label="Scroll left"
          >
            <BackwardIcon className="w-5 h-5" />
          </button>
        )}
        
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 rounded-full p-1.5 text-white hover:bg-cyan-500/50 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
            aria-label="Scroll right"
          >
            <ForwardIcon className="w-5 h-5" />
          </button>
        )}
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