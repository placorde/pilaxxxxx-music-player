
import { Mix } from '../types';

// Using placeholder audio from a free source. Replace with actual Google Drive links.
const placeholderAudio = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
];

export const houseMixes: Mix[] = [
  { id: 1, title: "Sunrise Groove Session", duration: "58:32", genre: "House", audioSrc: placeholderAudio[0] },
  { id: 2, title: "Deep Disco Daydream", duration: "1:02:14", genre: "House", audioSrc: placeholderAudio[1] },
  { id: 3, title: "Chicago Soul Connection", duration: "45:50", genre: "House", audioSrc: placeholderAudio[2] },
  { id: 4, title: "Midnight Jackin' Beats", duration: "1:10:05", genre: "House", audioSrc: placeholderAudio[3] },
];

export const electroMixes: Mix[] = [
  { id: 5, title: "Volt Age", duration: "55:19", genre: "Electro", audioSrc: placeholderAudio[4] },
  { id: 6, title: "Cybernetic Pulse", duration: "1:15:30", genre: "Electro", audioSrc: placeholderAudio[5] },
  { id: 7, title: "Neon City Drive", duration: "59:48", genre: "Electro", audioSrc: placeholderAudio[6] },
];

// Data for the new "Favourite Dance Tracks" section
export const danceGenres: string[] = [
    'Pop House', 'Tech House', 'Deep House', 'Afro House', 'Disco House', 
    'Electro House', 'Minimal', 'Groove House', 'Club', 'Jazz House', 
    'Soul House', 'Hard House', 'Afro Tech'
];

export const favouriteDanceTracks: { [key: string]: Mix[] } = {};

let trackIdCounter = 11; // Start after existing tracks to ensure unique IDs

danceGenres.forEach(genre => {
    favouriteDanceTracks[genre] = [];
    for (let i = 1; i <= 6; i++) {
        favouriteDanceTracks[genre].push({
            id: trackIdCounter++,
            title: `${genre.replace(/ /g, '')} Rhythm ${i}`,
            duration: `0${Math.floor(Math.random() * 5) + 3}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            genre: genre,
            audioSrc: placeholderAudio[Math.floor(Math.random() * placeholderAudio.length)]
        });
    }
});
