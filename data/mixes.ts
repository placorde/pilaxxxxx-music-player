
import { Mix } from '../types';

// Using placeholder audio from a free source. Replace with actual Google Drive links.
const placeholderAudio = [
  "https://drive.google.com/file/d/1G8-SzdaA4vcDP54AtbuXzIg7jZjDXHLE/view?usp=drive_link", // 90's
  "https://drive.google.com/file/d/11k2kW-p6uOJY9oxsRa7k8MvNJ3NQssE5/view?usp=drive_link", // afro house 
  "https://drive.google.com/file/d/1HQ9cmbvJ9qnQEae6uTPHLD9rP628DaGK/view?usp=drive_link", // deep house latino
  "https://drive.google.com/file/d/1T70bL1SzCX4u7yv-Ebz0mhPbtkW5sTd0/view?usp=drive_link", // electro diversity 
  "https://drive.google.com/file/d/1wgUpTXBckpn1Rw_D-ub5GmX3tlQhpRjs/view?usp=drive_link", // French touch
  "https://drive.google.com/file/d/1g7_12ane1abW1zLzKSJzpKKXaYuGJEoX/view?usp=drive_link", // Jazz mix banger 
  "https://drive.google.com/file/d/1AMuC2JiU1NvjieuSrLkqN-DqumLs3rsE/view?usp=drive_link", // Lounge
  "https://drive.google.com/file/d/13p7njjSuyOGRVsHUaFIrLUVg0GbJ_anb/view?usp=drive_link", // Mix tech house
  "https://drive.google.com/file/d/1guKX9GjjQThbKs7V4nXwBqYjr16HLHAr/view?usp=drive_link", // Mix arabic electro 
  "https://drive.google.com/file/d/1LDdR_VTis8-escnlAVQKxVFk7tfqcUWz/view?usp=drive_link", // Mix chill
  "https://drive.google.com/file/d/1Nm-7n0GEIu4wUVLXio9ahp6urUv2p-mu/view?usp=drive_link", // Mix orient electro 
  "https://drive.google.com/file/d/1y_HvzvNHLOA9GGDsNH0TQI_VHACVj5hL/view?usp=drive_link", // Mix soirée BDE
  "", // tech house
  "" // tech house latino
];

export const houseMixes: Mix[] = [
  { id: 1, title: "90's", duration: "58:32", genre: "House", audioSrc: placeholderAudio[0], imageUrl: `https://picsum.photos/seed/1/200` },
  { id: 2, title: "afro house ", duration: "1:02:14", genre: "House", audioSrc: placeholderAudio[1], imageUrl: `https://picsum.photos/seed/2/200` },
  { id: 3, title: "French touch", duration: "45:50", genre: "House", audioSrc: placeholderAudio[2], imageUrl: `https://picsum.photos/seed/3/200` },
  { id: 5, title: "Jazz mix banger' Beats", duration: "1:10:05", genre: "House", audioSrc: placeholderAudio[3], imageUrl: `https://picsum.photos/seed/4/200` },
];

export const electroMixes: Mix[] = [
  { id: 4, title: "electro diversity ", duration: "55:19", genre: "Electro", audioSrc: placeholderAudio[4], imageUrl: `https://picsum.photos/seed/5/200` },
  { id: 6, title: "Cybernetic Pulse", duration: "1:15:30", genre: "Electro", audioSrc: placeholderAudio[5], imageUrl: `https://picsum.photos/seed/6/200` },
  { id: 7, title: "Neon City Drive", duration: "59:48", genre: "Electro", audioSrc: placeholderAudio[6], imageUrl: `https://picsum.photos/seed/7/200` },
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
        const id = trackIdCounter++;
        favouriteDanceTracks[genre].push({
            id: id,
            title: `${genre.replace(/ /g, '')} Rhythm ${i}`,
            duration: `0${Math.floor(Math.random() * 5) + 3}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            genre: genre,
            audioSrc: placeholderAudio[Math.floor(Math.random() * placeholderAudio.length)],
            imageUrl: `https://picsum.photos/seed/${id}/200`,
        });
    }
});