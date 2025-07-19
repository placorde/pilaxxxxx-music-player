
import React, { useState, useCallback, useRef } from 'react';
import { Mix } from './types';
import { houseMixes, electroMixes, featuredTracks } from './data/mixes';
import Hero from './components/Hero';
import MusicSection from './components/MusicSection';
import FeaturedTracks from './components/FeaturedTracks';
import Contact from './components/Contact';
import AudioPlayer from './components/AudioPlayer';

const App: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<Mix | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayTrack = useCallback((track: Mix) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(prev => !prev);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  }, [currentTrack]);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Hero />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <MusicSection
          title="HOUSE"
          mixes={houseMixes}
          onPlayTrack={handlePlayTrack}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
        />
        <MusicSection
          title="ELECTRO"
          mixes={electroMixes}
          onPlayTrack={handlePlayTrack}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
        />
        <FeaturedTracks tracks={featuredTracks} onPlayTrack={handlePlayTrack} currentTrack={currentTrack} isPlaying={isPlaying}/>
      </main>
      <Contact />

      {currentTrack && (
        <AudioPlayer
          key={currentTrack.id}
          track={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
};

export default App;
