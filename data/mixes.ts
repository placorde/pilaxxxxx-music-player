
import { Mix } from '../types';

// Using placeholder audio from a free source. Replace with actual Google Drive links.
const placeholderAudio = [
  "https://docs.google.com/uc?export=download&id=1Paf3vdXK1-rIZmg8iuO5rbFo3Sg-D_dm", // 90's
  "https://docs.google.com/uc?export=download&id=14P1r3hcLb3tX9LHI0zGjf_h67OF0grUu", // afro house 
  "https://docs.google.com/uc?export=download&id=1G8-SzdaA4vcDP54AtbuXzIg7jZjDXHLE", // deep house latino
  "https://docs.google.com/uc?export=download&id=11k2kW-p6uOJY9oxsRa7k8MvNJ3NQssE5", // electro diversity 
  "https://docs.google.com/uc?export=download&id=1HQ9cmbvJ9qnQEae6uTPHLD9rP628DaGK", // French touch
  "https://docs.google.com/uc?export=download&id=1T70bL1SzCX4u7yv-Ebz0mhPbtkW5sTd0", // Jazz mix banger 
  "https://docs.google.com/uc?export=download&id=1wgUpTXBckpn1Rw_D-ub5GmX3tlQhpRjs", // Lounge
  "https://docs.google.com/uc?export=download&id=1g7_12ane1abW1zLzKSJzpKKXaYuGJEoX", // Mix tech house
  "https://docs.google.com/uc?export=download&id=1AMuC2JiU1NvjieuSrLkqN-DqumLs3rsE", // Mix arabic electro 
  "https://docs.google.com/uc?export=download&id=13p7njjSuyOGRVsHUaFIrLUVg0GbJ_anb", // Mix chill
  "https://docs.google.com/uc?export=download&id=1guKX9GjjQThbKs7V4nXwBqYjr16HLHAr", // Mix orient electro 
  "https://docs.google.com/uc?export=download&id=1LDdR_VTis8-escnlAVQKxVFk7tfqcUWz", // Mix soirée BDE
  "https://docs.google.com/uc?export=download&id=1Nm-7n0GEIu4wUVLXio9ahp6urUv2p-mu", // tech house
  "https://docs.google.com/uc?export=download&id=1y_HvzvNHLOA9GGDsNH0TQI_VHACVj5hL" // tech house latino
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