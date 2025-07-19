
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
      <div className="bg-black/50 backdrop-blur-lg border-t border-zinc-800 p-3 shadow-lg">
        <audio
          ref={audioRef}
          src={track.audioSrc}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={onEnded}
          preload="auto"
        />
        <div className="container mx-auto flex items-center gap-4 text-white">
          <div className="flex items-center gap-3 w-1/4">
             <img src={track.imageUrl || `https://picsum.photos/seed/${track.id}/64/64`} alt={track.title} className="w-12 h-12 rounded-md object-cover"/>
             <div>
                <p className="font-bold text-sm truncate">{track.title}</p>
                <p className="text-xs text-zinc-400">{track.genre}</p>
             </div>
          </div>

          <div className="flex-grow flex items-center gap-2 w-1/2">
            <span className="text-xs text-zinc-400 w-12 text-right">{formatTime(progress)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={progress}
              onChange={handleSeek}
              className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full"
            />
            <span className="text-xs text-zinc-400 w-12">{formatTime(duration)}</span>
          </div>

          <div className="flex items-center justify-end gap-3 w-1/4">
             <button onClick={() => skipTime(-15)} className="text-zinc-400 hover:text-white transition-colors"><SkipBackward15Icon className="w-5 h-5"/></button>
             <button onClick={onTogglePlay} className="bg-cyan-400 text-black rounded-full p-2 w-10 h-10 flex items-center justify-center">
                {isPlaying ? <PauseIcon className="w-5 h-5"/> : <PlayIcon className="w-5 h-5"/>}
             </button>
             <button onClick={() => skipTime(15)} className="text-zinc-400 hover:text-white transition-colors"><SkipForward15Icon className="w-5 h-5"/></button>
             <div className="flex items-center gap-2 group">
                <button onClick={toggleMute} className="text-zinc-400 hover:text-white transition-colors">
                    {isMuted || volume === 0 ? <VolumeMuteIcon className="w-5 h-5"/> : <VolumeUpIcon className="w-5 h-5"/>}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full"
                />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;