
import React, { useState, useCallback } from 'react';
import { Mix } from './types';
import { houseMixes, electroMixes } from './data/mixes';
import Hero from './components/Hero';
import MusicSection from './components/MusicSection';
import FavouriteDanceTracks from './components/FeaturedTracks';
import Contact from './components/Contact';
import AudioPlayer from './components/AudioPlayer';

// New AboutMe component defined locally to avoid creating new files
const AboutMe: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-2 animate-fade-in-down" style={{animationDelay: '0.2s'}}>
            <h2 className="font-orbitron text-4xl sm:text-5xl font-bold tracking-wider text-white mb-6">
              ABOUT ME
            </h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                As a passionate DJ and music curator, I live to create sonic journeys that connect people and ignite dance floors. My world revolves around the beat—from the deep, soulful rhythms of house music to the electrifying pulse of electro. This platform is my personal space to share the mixes and tracks that define my sound.
              </p>
              <p>
                Here, you'll find a collection of my work, carefully crafted sessions, and a handpicked selection of my "Pépites"—those special tracks that send shivers down your spine. Whether you're here to discover new music or relive a past set, I invite you to press play and get lost in the music.
              </p>
            </div>
          </div>
          <div className="lg:col-span-1 animate-fade-in-down" style={{animationDelay: '0.4s'}}>
             <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1574768322003-91753a4a2ea2?q=80&w=800&auto=format&fit=crop" alt="DJ mixing" className="rounded-lg shadow-lg aspect-square object-cover transform hover:scale-105 transition-transform duration-300" />
                <img src="https://images.unsplash.com/photo-1558978806-7e526a03426e?q=80&w=800&auto=format&fit=crop" alt="Crowd at a concert" className="rounded-lg shadow-lg aspect-square object-cover mt-8 transform hover:scale-105 transition-transform duration-300" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<Mix | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

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
      <AboutMe />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
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
        </div>
        <FavouriteDanceTracks 
            onPlayTrack={handlePlayTrack} 
            currentTrack={currentTrack} 
            isPlaying={isPlaying}
        />
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
