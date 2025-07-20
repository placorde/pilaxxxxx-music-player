import { Mix } from '../types';

/**
 * Transforms a standard Google Drive sharing URL into a direct download link.
 * @param url The Google Drive sharing URL (e.g., https://drive.google.com/file/d/FILE_ID/view?usp=sharing)
 * @returns A direct download link for the file, or an empty string if the URL is invalid.
 */
const getGoogleDriveDirectLink = (url: string): string => {
  if (!url || !url.includes('drive.google.com')) {
    return "";
  }
  // This regex extracts the file ID from various Google Drive URL formats
  const match = url.match(/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    const fileId = match[1];
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  return ""; // Return empty for invalid or non-standard URLs
};

// Raw Google Drive sharing URLs provided by the user.
const userMixLinks = [
  getGoogleDriveDirectLink("https://drive.google.com/file/d/1G8-SzdaA4vcDP54AtbuXzIg7jZjDXHLE/view?usp=drive_link"), // 0: 90's
  getGoogleDriveDirectLink("https://drive.google.com/file/d/11k2kW-p6uOJY9oxsRa7k8MvNJ3NQssE5/view?usp=drive_link"), // 1: afro house 
  getGoogleDriveDirectLink("https://drive.google.com/file/d/1HQ9cmbvJ9qnQEae6uTPHLD9rP628DaGK/view?usp=drive_link"), // 2: deep house latino
  getGoogleDriveDirectLink("https://drive.google.com/file/d/1T70bL1SzCX4u7yv-Ebz0mhPbtkW5sTd0/view?usp=drive_link"), // 3: electro diversity 
  getGoogleDriveDirectLink("https://drive.google.com/file/d/1wgUpTXBckpn1Rw_D-ub5GmX3tlQhpRjs/view?usp=drive_link"), // 4: French touch
  getGoogleDriveDirectLink("https://drive.google.com/file/d/1g7_12ane1abW1zLzKSJzpKKXaYuGJEoX/view?usp=drive_link"), // 5: Jazz mix banger 
  getGoogleDriveDirectLink("https://drive.google.com/file/d/1AMuC2JiU1NvjieuSrLkqN-DqumLs3rsE/view?usp=drive_link"), // 6: Lounge
  getGoogleDriveDirectLink("https://drive.google.com/file/d/13p7njjSuyOGRVsHUaFIrLUVg0GbJ_anb/view?usp=drive_link"), // 7: Mix tech house
  getGoogleDriveDirectLink("https://drive.google.com/file/d/1guKX9GjjQThbKs7V4nXwBqYjr16HLHAr/view?usp=drive_link"), // 8: Mix arabic electro 
  getGoogleDriveDirectLink("https://drive.google.com/file/d/1LDdR_VTis8-escnlAVQKxVFk7tfqcUWz/view?usp=drive_link"), // 9: Mix chill
  getGoogleDriveDirectLink("https://drive.google.com/file/d/1Nm-7n0GEIu4wUVLXio9ahp6urUv2p-mu/view?usp=drive_link"), // 10: Mix orient electro 
  getGoogleDriveDirectLink("https://drive.google.com/file/d/1y_HvzvNHLOA9GGDsNH0TQI_VHACVj5hL/view?usp=drive_link"), // 11: Mix soirée BDE
].filter(link => link !== ""); // Filter out any empty links that couldn't be converted

// Fallback audio if GDrive links fail or are insufficient
const fallbackAudio = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export const houseMixes: Mix[] = [
  { id: 1, title: "90's Throwback", duration: "58:32", genre: "House", audioSrc: userMixLinks[0] || fallbackAudio, imageUrl: `https://picsum.photos/seed/1/200` },
  { id: 2, title: "Afro House Vibes", duration: "1:02:14", genre: "House", audioSrc: userMixLinks[1] || fallbackAudio, imageUrl: `https://picsum.photos/seed/2/200` },
  { id: 3, title: "French Touch", duration: "45:50", genre: "House", audioSrc: userMixLinks[4] || fallbackAudio, imageUrl: `https://picsum.photos/seed/3/200` },
  { id: 4, title: "Jazz Banger Beats", duration: "1:10:05", genre: "House", audioSrc: userMixLinks[5] || fallbackAudio, imageUrl: `https://picsum.photos/seed/4/200` },
  { id: 5, title: "Deep House Latino", duration: "49:21", genre: "House", audioSrc: userMixLinks[2] || fallbackAudio, imageUrl: `https://picsum.photos/seed/6/200` },
];

export const electroMixes: Mix[] = [
  { id: 6, title: "Electro Diversity", duration: "55:19", genre: "Electro", audioSrc: userMixLinks[3] || fallbackAudio, imageUrl: `https://picsum.photos/seed/7/200` },
  { id: 7, title: "Arabic Electro Journey", duration: "1:15:30", genre: "Electro", audioSrc: userMixLinks[8] || fallbackAudio, imageUrl: `https://picsum.photos/seed/8/200` },
  { id: 8, title: "Oriental Electro Fusion", duration: "59:48", genre: "Electro", audioSrc: userMixLinks[10] || fallbackAudio, imageUrl: `https://picsum.photos/seed/9/200` },
  { id: 9, title: "Tech House Energy", duration: "1:05:00", genre: "Electro", audioSrc: userMixLinks[7] || fallbackAudio, imageUrl: `https://picsum.photos/seed/10/200` },
  { id: 10, title: "Lounge & Chill Mix", duration: "48:15", genre: "Electro", audioSrc: userMixLinks[6] || fallbackAudio, imageUrl: `https://picsum.photos/seed/5/200` },
];

// Data for the new "Favourite Dance Tracks" section
export const danceGenres: string[] = [
    'Pop House', 'Tech House', 'Deep House', 'Afro House', 'Disco House', 
    'Electro House', 'Minimal', 'Groove House', 'Club', 'Jazz House', 
    'Soul House', 'Hard House', 'Afro Tech'
];

export const favouriteDanceTracks: { [key: string]: Mix[] } = {};

let trackIdCounter = 11; // Start after existing tracks to ensure unique IDs

const availableAudioSources = userMixLinks.length > 0 ? userMixLinks : [fallbackAudio];

danceGenres.forEach(genre => {
    favouriteDanceTracks[genre] = [];
    for (let i = 1; i <= 6; i++) {
        const id = trackIdCounter++;
        favouriteDanceTracks[genre].push({
            id: id,
            title: `${genre.replace(/ /g, '')} Rhythm ${i}`,
            duration: `0${Math.floor(Math.random() * 5) + 3}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            genre: genre,
            audioSrc: availableAudioSources[Math.floor(Math.random() * availableAudioSources.length)],
            imageUrl: `https://picsum.photos/seed/${id}/200`,
        });
    }
});
