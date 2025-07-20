
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Mix } from '../types';
import { PlayIcon, PauseIcon, SkipForward15Icon, SkipBackward15Icon, VolumeUpIcon, VolumeMuteIcon } from './icons';

interface AudioPlayerProps {
  track: Mix;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onEnded: () => void;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '00:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ track, isPlaying, onTogglePlay, onEnded }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(e => console.error("Audio play failed:", e));
    } else {
      audio.pause();
    }
  }, [isPlaying, track]);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted])

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  }, []);
  
  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setProgress(Number(e.target.value));
    }
  };
  
  const skipTime = (amount: number) => {
      if(audioRef.current){
          audioRef.current.currentTime += amount;
      }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  }

  const toggleMute = () => {
    setIsMuted(!isMuted);
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-black/50 backdrop-blur-lg border-t border-zinc-800 p-4 shadow-lg">
        <audio
          ref={audioRef}
          src={track.audioSrc}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={onEnded}
          preload="auto"
        />
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-4 text-white">
        
          {/* Track Info */}
          <div className="w-full md:w-1/4 flex items-center gap-3">
             <img src={track.imageUrl || `https://picsum.photos/seed/${track.id}/64/64`} alt={track.title} className="w-14 h-14 rounded-md object-cover flex-shrink-0"/>
             <div className="overflow-hidden">
                <p className="font-bold text-base truncate">{track.title}</p>
                <p className="text-sm text-zinc-400 truncate">{track.genre}</p>
             </div>
          </div>

          {/* Player Controls & Progress */}
          <div className="w-full md:flex-grow flex flex-col gap-2">
            <div className="flex items-center justify-center gap-5">
               <button onClick={() => skipTime(-15)} className="text-zinc-400 hover:text-white transition-colors disabled:opacity-50" disabled={!duration}><SkipBackward15Icon className="w-6 h-6"/></button>
               <button onClick={onTogglePlay} className="bg-cyan-400 text-black rounded-full p-3 w-12 h-12 flex items-center justify-center transform hover:scale-105 transition-transform disabled:bg-zinc-600" disabled={!duration}>
                  {isPlaying ? <PauseIcon className="w-6 h-6"/> : <PlayIcon className="w-6 h-6"/>}
               </button>
               <button onClick={() => skipTime(15)} className="text-zinc-400 hover:text-white transition-colors disabled:opacity-50" disabled={!duration}><SkipForward15Icon className="w-6 h-6"/></button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 w-12 text-right">{formatTime(progress)}</span>
              <input
                type="range"
                min="0"
                max={duration || 1}
                value={progress}
                onChange={handleSeek}
                disabled={!duration}
                className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer disabled:bg-zinc-800 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full disabled:[&::-webkit-slider-thumb]:bg-zinc-600"
              />
              <span className="text-xs text-zinc-400 w-12">{formatTime(duration)}</span>
            </div>
          </div>
          
          {/* Volume Control */}
          <div className="w-full md:w-1/4 flex items-center justify-center md:justify-end gap-2">
             <button onClick={toggleMute} className="text-zinc-400 hover:text-white transition-colors">
                 {isMuted || volume === 0 ? <VolumeMuteIcon className="w-6 h-6"/> : <VolumeUpIcon className="w-6 h-6"/>}
             </button>
             <input
               type="range"
               min="0"
               max="1"
               step="0.01"
               value={isMuted ? 0 : volume}
               onChange={handleVolumeChange}
               className="w-24 h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full"
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
