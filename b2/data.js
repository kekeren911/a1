// Mock Data for Music Streaming Application

// Sample tracks database
const TRACKS_DATABASE = [
    {
        id: 1,
        title: "Midnight Dreams",
        artist: "Luna Nova",
        album: "Stellar Journey",
        duration: 237,
        albumArt: "https://picsum.photos/seed/album1/300/300",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        genre: "Electronic"
    },
    {
        id: 2,
        title: "Ocean Waves",
        artist: "Coastal Vibes",
        album: "Summer Memories",
        duration: 198,
        albumArt: "https://picsum.photos/seed/album2/300/300",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        genre: "Ambient"
    },
    {
        id: 3,
        title: "Electric Soul",
        artist: "Neon Pulse",
        album: "Digital Dreams",
        duration: 265,
        albumArt: "https://picsum.photos/seed/album3/300/300",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        genre: "Synthwave"
    },
    {
        id: 4,
        title: "Mountain Echo",
        artist: "Alpine Sound",
        album: "Peak Performance",
        duration: 312,
        albumArt: "https://picsum.photos/seed/album4/300/300",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        genre: "Electronic"
    },
    {
        id: 5,
        title: "Sunrise Serenade",
        artist: "Morning Glory",
        album: "Dawn Collection",
        duration: 245,
        albumArt: "https://picsum.photos/seed/album5/300/300",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        genre: "Jazz"
    },
    {
        id: 6,
        title: "Urban Beats",
        artist: "City Lights",
        album: "Metropolitan",
        duration: 289,
        albumArt: "https://picsum.photos/seed/album6/300/300",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        genre: "Hip-Hop"
    },
    {
        id: 7,
        title: "Starlight Dance",
        artist: "Galaxy Project",
        album: "Celestial",
        duration: 223,
        albumArt: "https://picsum.photos/seed/album7/300/300",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        genre: "Electronic"
    },
    {
        id: 8,
        title: "Acoustic Morning",
        artist: "String Theory",
        album: "Unplugged Sessions",
        duration: 198,
        albumArt: "https://picsum.photos/seed/album8/300/300",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        genre: "Acoustic"
    },
    {
        id: 9,
        title: "Neon Nights",
        artist: "Retro Wave",
        album: "1999",
        duration: 276,
        albumArt: "https://picsum.photos/seed/album9/300/300",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        genre: "Synthwave"
    },
    {
        id: 10,
        title: "Peaceful Piano",
        artist: "Melody Maker",
        album: "Relaxation Station",
        duration: 334,
        albumArt: "https://picsum.photos/seed/album10/300/300",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        genre: "Classical"
    }
];

// Time-synchronized lyrics for tracks
const LYRICS_DATABASE = {
    1: [
        { time: 0, text: "[Instrumental Intro]" },
        { time: 15, text: "Dancing through the midnight sky" },
        { time: 22, text: "Stars are shining in your eyes" },
        { time: 30, text: "Dreams are calling from afar" },
        { time: 38, text: "Midnight wishes, midnight stars" },
        { time: 45, text: "Lost in wonder, lost in space" },
        { time: 53, text: "Time slows down in this embrace" },
        { time: 60, text: "[Chorus]" },
        { time: 65, text: "Midnight dreams, take me away" },
        { time: 73, text: "To a place where we can stay" },
        { time: 80, text: "Midnight dreams, never fade" },
        { time: 88, text: "In the magic that we made" },
        { time: 95, text: "[Instrumental Break]" },
        { time: 120, text: "Morning light is far from here" },
        { time: 128, text: "Only midnight, crystal clear" },
        { time: 135, text: "Close your eyes and come with me" },
        { time: 143, text: "To where all is meant to be" }
    ],
    2: [
        { time: 0, text: "[Ocean Sounds Intro]" },
        { time: 20, text: "Waves are crashing on the shore" },
        { time: 28, text: "Like they did so long before" },
        { time: 35, text: "Salt and sand between my toes" },
        { time: 43, text: "Where the endless ocean flows" },
        { time: 50, text: "[Chorus]" },
        { time: 55, text: "Ocean waves, carry me" },
        { time: 63, text: "To the depths of mystery" },
        { time: 70, text: "Ocean waves, set me free" },
        { time: 78, text: "In this blue serenity" },
        { time: 85, text: "[Nature Sounds]" },
        { time: 110, text: "Seagulls calling overhead" },
        { time: 118, text: "Golden sun is turning red" },
        { time: 125, text: "Peaceful moments, timeless grace" },
        { time: 133, text: "In this tranquil, sacred place" }
    ],
    3: [
        { time: 0, text: "[Synth Intro]" },
        { time: 12, text: "Electric pulse is flowing through" },
        { time: 19, text: "Neon lights are calling you" },
        { time: 26, text: "Digital dreams in crystal haze" },
        { time: 34, text: "Lost in these electric days" },
        { time: 41, text: "[Chorus]" },
        { time: 46, text: "Electric soul, can you feel it?" },
        { time: 54, text: "In the rhythm, can you hear it?" },
        { time: 62, text: "Electric soul, burning bright" },
        { time: 70, text: "Lighting up the endless night" },
        { time: 77, text: "[Bridge]" },
        { time: 100, text: "Synthesizers paint the air" },
        { time: 108, text: "We're dancing without a care" },
        { time: 115, text: "Energy in every beat" },
        { time: 123, text: "Moving to this summer heat" }
    ],
    4: [
        { time: 0, text: "[Mountain Ambience]" },
        { time: 18, text: "High above the cloud line" },
        { time: 25, text: "Where the air is pure and fine" },
        { time: 32, text: "Echoes bounce from peak to peak" },
        { time: 40, text: "Answers that the mountains seek" },
        { time: 47, text: "[Chorus]" },
        { time: 52, text: "Mountain echo, carry on" },
        { time: 60, text: "Though the journey feels so long" },
        { time: 68, text: "Mountain echo, guide my way" },
        { time: 76, text: "Through the night and through the day" },
        { time: 83, text: "[Wind Sounds]" },
        { time: 110, text: "Ancient stones, they've seen it all" },
        { time: 118, text: "Watched generations rise and fall" },
        { time: 125, text: "Standing tall in silent grace" },
        { time: 133, text: "Timeless guardians of this place" }
    ],
    5: [
        { time: 0, text: "[Soft Piano Intro]" },
        { time: 15, text: "Morning sun begins to rise" },
        { time: 22, text: "Painting colors in the skies" },
        { time: 29, text: "Birds are singing their sweet song" },
        { time: 37, text: "As the night fades out along" },
        { time: 44, text: "[Chorus]" },
        { time: 49, text: "Sunrise serenade" },
        { time: 57, text: "Beautiful music that we made" },
        { time: 65, text: "Sunrise serenade" },
        { time: 73, text: "In this moment, in this shade" },
        { time: 80, text: "[Instrumental]" },
        { time: 105, text: "New beginning, fresh and bright" },
        { time: 113, text: "Chasing away the darkest night" },
        { time: 120, text: "Hope is rising with the sun" },
        { time: 128, text: "A brand new chapter has begun" }
    ]
};

// Collaborators list
const COLLABORATORS = [
    { id: 1, name: "Alice", avatar: "👩‍💻" },
    { id: 2, name: "Bob", avatar: "👨‍🎨" },
    { id: 3, name: "Charlie", avatar: "🧑‍🎤" }
];

// Helper function to format time (seconds to MM:SS)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Helper function to get random song from database
function getRandomSong() {
    const randomIndex = Math.floor(Math.random() * TRACKS_DATABASE.length);
    return TRACKS_DATABASE[randomIndex];
}

// Helper function to get song by ID
function getSongById(id) {
    return TRACKS_DATABASE.find(song => song.id === id);
}

// Helper function to get lyrics by song ID
function getLyricsById(id) {
    return LYRICS_DATABASE[id] || null;
}

// Helper function to search songs
function searchSongs(query) {
    const lowerQuery = query.toLowerCase();
    return TRACKS_DATABASE.filter(song =>
        song.title.toLowerCase().includes(lowerQuery) ||
        song.artist.toLowerCase().includes(lowerQuery) ||
        song.album.toLowerCase().includes(lowerQuery) ||
        song.genre.toLowerCase().includes(lowerQuery)
    );
}

// Simulating collaborative playlist updates
function simulateCollaborativeUpdate() {
    const actions = [
        {
            type: 'add',
            song: getRandomSong(),
            user: COLLABORATORS[Math.floor(Math.random() * COLLABORATORS.length)]
        },
        {
            type: 'remove',
            songId: Math.floor(Math.random() * 10) + 1,
            user: COLLABORATORS[Math.floor(Math.random() * COLLABORATORS.length)]
        }
    ];

    return actions[Math.floor(Math.random() * actions.length)];
}

// Export functions for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TRACKS_DATABASE,
        LYRICS_DATABASE,
        COLLABORATORS,
        formatTime,
        getRandomSong,
        getSongById,
        getLyricsById,
        searchSongs,
        simulateCollaborativeUpdate
    };
}
