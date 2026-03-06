// Mock Data - Songs Library
const songsLibrary = [
    {
        id: 1,
        title: "Midnight Dreams",
        artist: "Luna Eclipse",
        duration: 234,
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        cover: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        lyrics: [
            { time: 0, text: "♪ Instrumental ♪" },
            { time: 15, text: "Walking through the midnight sky" },
            { time: 22, text: "Stars are dancing in your eyes" },
            { time: 30, text: "Dreams are floating, soft and high" },
            { time: 38, text: "In this world of you and I" },
            { time: 45, text: "♪ Guitar Solo ♪" },
            { time: 60, text: "Time stands still when you're near" },
            { time: 68, text: "All my doubts begin to clear" },
            { time: 75, text: "Midnight dreams are calling us" },
            { time: 83, text: "To a world without a fuss" }
        ]
    },
    {
        id: 2,
        title: "Ocean Waves",
        artist: "Coastal Vibes",
        duration: 198,
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        cover: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        lyrics: [
            { time: 0, text: "♪ Ocean Sounds ♪" },
            { time: 12, text: "Blue waves crash upon the shore" },
            { time: 20, text: "I'm not lost anymore" },
            { time: 28, text: "Salt and sand upon my feet" },
            { time: 35, text: "This summer melody so sweet" },
            { time: 42, text: "Horizon calls my name" },
            { time: 50, text: "Burning like the flame" },
            { time: 58, text: "Ocean waves carry me away" },
            { time: 65, text: "To where I want to stay" }
        ]
    },
    {
        id: 3,
        title: "Electric Pulse",
        artist: "Neon Lights",
        duration: 267,
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        cover: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        lyrics: [
            { time: 0, text: "♪ Synth Intro ♪" },
            { time: 18, text: "Feel the electric pulse tonight" },
            { time: 26, text: "Everything's gonna be alright" },
            { time: 34, text: "Neon lights up in the sky" },
            { time: 42, text: "We're alive, you and I" },
            { time: 50, text: "City never sleeps" },
            { time: 58, text: "Into the night we creep" },
            { time: 66, text: "Electric pulse in my veins" },
            { time: 74, text: "Breaking all the chains" }
        ]
    },
    {
        id: 4,
        title: "Sunset Boulevard",
        artist: "Dream Chasers",
        duration: 212,
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        cover: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        lyrics: [
            { time: 0, text: "♪ Soft Piano ♪" },
            { time: 14, text: "Walking down sunset boulevard" },
            { time: 22, text: "Chasing dreams, playing it hard" },
            { time: 30, text: "Golden hour paints the street" },
            { time: 38, text: "Where the west and dreams meet" },
            { time: 46, text: "Palm trees sway in the breeze" },
            { time: 54, text: "Floating with such ease" },
            { time: 62, text: "This is where we belong" },
            { time: 70, text: "In this beautiful song" }
        ]
    },
    {
        id: 5,
        title: "Mountain Echo",
        artist: "Alpine Sound",
        duration: 289,
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        cover: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        lyrics: [
            { time: 0, text: "♪ Nature Sounds ♪" },
            { time: 16, text: "High upon the mountain peak" },
            { time: 24, text: "It's the silence that I seek" },
            { time: 32, text: "Echoes call across the range" },
            { time: 40, text: "Life is suddenly so strange" },
            { time: 48, text: "Fresh air fills my lungs" },
            { time: 56, text: "Like a song that nature sung" },
            { time: 64, text: "Mountain echo, carry me" },
            { time: 72, text: "Where I'm meant to be" }
        ]
    },
    {
        id: 6,
        title: "Urban Rhythm",
        artist: "City Beats",
        duration: 178,
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        cover: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
        lyrics: [
            { time: 0, text: "♪ Drum Beat ♪" },
            { time: 10, text: "City streets come alive at night" },
            { time: 18, text: "Everything feels so right" },
            { time: 26, text: "Urban rhythm in my soul" },
            { time: 34, text: "Losing all control" },
            { time: 42, text: "Skyscrapers touch the sky" },
            { time: 50, text: "As the world goes by" },
            { time: 58, text: "Feel the beat, feel the sound" },
            { time: 66, text: "In this city we are bound" }
        ]
    },
    {
        id: 7,
        title: "Stellar Journey",
        artist: "Cosmic Waves",
        duration: 245,
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        cover: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
        lyrics: [
            { time: 0, text: "♪ Space Ambient ♪" },
            { time: 20, text: "Floating through the stellar night" },
            { time: 28, text: "Everything is burning bright" },
            { time: 36, text: "Stars are our guiding light" },
            { time: 44, text: "On this cosmic flight" },
            { time: 52, text: "Galaxies spinning round" },
            { time: 60, text: "In this space we're bound" },
            { time: 68, text: "Stellar journey has begun" },
            { time: 76, text: "Underneath the sun" }
        ]
    },
    {
        id: 8,
        title: "Acoustic Morning",
        artist: "Sunrise Collective",
        duration: 223,
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        cover: "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
        lyrics: [
            { time: 0, text: "♪ Morning Birds ♪" },
            { time: 12, text: "Sunrise greets the morning sky" },
            { time: 20, text: "As the sleepy world goes by" },
            { time: 28, text: "Coffee brewing in the air" },
            { time: 36, text: "Without a single care" },
            { time: 44, text: "Acoustic strings begin to play" },
            { time: 52, text: "Starting a beautiful day" },
            { time: 60, text: "Morning light upon my face" },
            { time: 68, text: "In this peaceful place" }
        ]
    }
];

// Application State
class MusicPlayer {
    constructor() {
        this.currentTrack = null;
        this.isPlaying = false;
        this.queue = [];
        this.playlist = [...songsLibrary.slice(0, 5)];
        this.currentIndex = 0;
        this.volume = 0.7;
        this.shuffle = false;
        this.repeat = false;
        this.wavesurfer = null;
        this.lyricsUpdateInterval = null;

        this.init();
    }

    init() {
        this.initWavesurfer();
        this.renderPlaylist();
        this.initEventListeners();
        this.initCacheAPI();
        this.startCollaborationSimulation();
        this.updateOnlineStatus();
    }

    // Initialize Wavesurfer.js
    initWavesurfer() {
        this.wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: '#b3b3b3',
            progressColor: '#1db954',
            cursorColor: '#ffffff',
            barWidth: 2,
            barGap: 3,
            barRadius: 3,
            height: 60,
            normalize: true,
            backend: 'WebAudio',
            mediaControls: false
        });

        this.wavesurfer.on('ready', () => {
            const duration = this.wavesurfer.getDuration();
            document.getElementById('duration').textContent = this.formatTime(duration);
        });

        this.wavesurfer.on('audioprocess', () => {
            const currentTime = this.wavesurfer.getCurrentTime();
            document.getElementById('currentTime').textContent = this.formatTime(currentTime);
            this.updateProgress(currentTime / this.wavesurfer.getDuration() * 100);
            this.updateLyrics(currentTime);
        });

        this.wavesurfer.on('finish', () => {
            this.handleTrackEnd();
        });

        this.wavesurfer.on('play', () => {
            this.isPlaying = true;
            this.updatePlayPauseButton();
        });

        this.wavesurfer.on('pause', () => {
            this.isPlaying = false;
            this.updatePlayPauseButton();
        });
    }

    // Initialize Event Listeners
    initEventListeners() {
        document.getElementById('playPauseBtn').addEventListener('click', () => this.togglePlayPause());
        document.getElementById('prevBtn').addEventListener('click', () => this.playPrevious());
        document.getElementById('nextBtn').addEventListener('click', () => this.playNext());
        document.getElementById('shuffleBtn').addEventListener('click', () => this.toggleShuffle());
        document.getElementById('repeatBtn').addEventListener('click', () => this.toggleRepeat());
        document.getElementById('volumeSlider').addEventListener('input', (e) => this.setVolume(e.target.value));
        document.getElementById('clearQueue').addEventListener('click', () => this.clearQueue());
        document.getElementById('searchInput').addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Progress bar click
        document.querySelector('.progress-bar').addEventListener('click', (e) => {
            if (!this.wavesurfer || !this.currentTrack) return;
            const rect = e.target.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            this.wavesurfer.seekTo(percent);
        });

        // Online/Offline status
        window.addEventListener('online', () => this.updateOnlineStatus());
        window.addEventListener('offline', () => this.updateOnlineStatus());

        // Handle orientation change for continuous playback
        window.addEventListener('orientationchange', () => {
            // Playback continues automatically with Wavesurfer
            setTimeout(() => {
                if (this.wavesurfer) {
                    this.wavesurfer.drawBuffer();
                }
            }, 100);
        });
    }

    // Initialize Cache API for offline support
    async initCacheAPI() {
        if ('caches' in window) {
            try {
                const cache = await caches.open('music-player-v1');

                // Cache current playlist songs
                for (const song of this.playlist) {
                    try {
                        await cache.add(song.audioUrl);
                    } catch (error) {
                        console.log(`Could not cache: ${song.title}`);
                    }
                }

                console.log('Songs cached for offline playback');
            } catch (error) {
                console.log('Cache API error:', error);
            }
        }
    }

    // Format time in MM:SS
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Update progress bar
    updateProgress(percent) {
        document.getElementById('progressBar').style.width = `${percent}%`;
    }

    // Play/Pause toggle
    togglePlayPause() {
        if (!this.currentTrack) {
            if (this.playlist.length > 0) {
                this.loadTrack(this.playlist[0]);
            }
            return;
        }

        if (this.isPlaying) {
            this.wavesurfer.pause();
        } else {
            this.wavesurfer.play();
        }
    }

    // Update play/pause button icon
    updatePlayPauseButton() {
        const playIcon = document.getElementById('playIcon');
        const pauseIcon = document.getElementById('pauseIcon');

        if (this.isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    // Load a track
    async loadTrack(track) {
        this.currentTrack = track;
        this.currentIndex = this.playlist.findIndex(t => t.id === track.id) || 0;

        document.getElementById('currentTrackTitle').textContent = track.title;
        document.getElementById('currentTrackArtist').textContent = track.artist;

        // Update album art background
        document.querySelector('.album-placeholder').style.background = track.cover;

        // Try to load from cache first, then network
        if ('caches' in window) {
            try {
                const cache = await caches.open('music-player-v1');
                const cachedResponse = await cache.match(track.audioUrl);
                if (cachedResponse) {
                    const blob = await cachedResponse.blob();
                    const audioUrl = URL.createObjectURL(blob);
                    this.wavesurfer.load(audioUrl);
                    this.renderLyrics(track.lyrics);
                    this.renderPlaylist();
                    return;
                }
            } catch (error) {
                console.log('Cache miss, loading from network');
            }
        }

        this.wavesurfer.load(track.audioUrl);
        this.renderLyrics(track.lyrics);
        this.renderPlaylist();
    }

    // Play next track
    playNext() {
        let nextIndex;

        if (this.shuffle) {
            nextIndex = Math.floor(Math.random() * this.playlist.length);
        } else {
            nextIndex = (this.currentIndex + 1) % this.playlist.length;
        }

        this.loadTrack(this.playlist[nextIndex]);
        this.wavesurfer.play();
    }

    // Play previous track
    playPrevious() {
        const prevIndex = this.currentIndex === 0 ? this.playlist.length - 1 : this.currentIndex - 1;
        this.loadTrack(this.playlist[prevIndex]);
        this.wavesurfer.play();
    }

    // Handle track end
    handleTrackEnd() {
        if (this.repeat) {
            this.wavesurfer.play();
        } else {
            this.playNext();
        }
    }

    // Toggle shuffle
    toggleShuffle() {
        this.shuffle = !this.shuffle;
        document.getElementById('shuffleBtn').classList.toggle('active', this.shuffle);
    }

    // Toggle repeat
    toggleRepeat() {
        this.repeat = !this.repeat;
        document.getElementById('repeatBtn').classList.toggle('active', this.repeat);
    }

    // Set volume
    setVolume(value) {
        this.volume = value / 100;
        if (this.wavesurfer) {
            this.wavesurfer.setVolume(this.volume);
        }
    }

    // Search functionality
    handleSearch(query) {
        const searchResults = document.getElementById('searchResults');

        if (query.length < 2) {
            searchResults.classList.remove('active');
            return;
        }

        const matches = songsLibrary.filter(song =>
            song.title.toLowerCase().includes(query.toLowerCase()) ||
            song.artist.toLowerCase().includes(query.toLowerCase())
        );

        if (matches.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
        } else {
            searchResults.innerHTML = matches.map(song => {
                const highlightedTitle = this.highlightMatch(song.title, query);
                const highlightedArtist = this.highlightMatch(song.artist, query);
                return `
                    <div class="search-result-item" data-id="${song.id}">
                        <div class="item-title">${highlightedTitle}</div>
                        <div class="item-artist">${highlightedArtist}</div>
                    </div>
                `;
            }).join('');

            // Add click listeners to results
            searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const songId = parseInt(item.dataset.id);
                    const song = songsLibrary.find(s => s.id === songId);
                    if (song) {
                        this.addToQueue(song);
                        searchResults.classList.remove('active');
                        document.getElementById('searchInput').value = '';
                    }
                });
            });
        }

        searchResults.classList.add('active');
    }

    // Highlight search matches
    highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="match">$1</span>');
    }

    // Add to queue
    addToQueue(song) {
        if (!this.queue.find(s => s.id === song.id)) {
            this.queue.push(song);
            this.renderQueue();
            this.showToast(`Added "${song.title}" to queue`);

            // Cache for offline
            if ('caches' in window) {
                caches.open('music-player-v1').then(cache => {
                    cache.add(song.audioUrl).catch(() => {});
                });
            }
        }
    }

    // Clear queue
    clearQueue() {
        this.queue = [];
        this.renderQueue();
    }

    // Remove from queue
    removeFromQueue(index) {
        this.queue.splice(index, 1);
        this.renderQueue();
    }

    // Render playlist
    renderPlaylist() {
        const container = document.getElementById('playlist');
        container.innerHTML = this.playlist.map((song, index) => `
            <div class="playlist-item ${song.id === this.currentTrack?.id ? 'active' : ''}" data-id="${song.id}">
                <div class="item-number">${index + 1}</div>
                <div class="item-info">
                    <div class="item-title">${song.title}</div>
                    <div class="item-artist">${song.artist}</div>
                </div>
                <div class="item-duration">${this.formatTime(song.duration)}</div>
            </div>
        `).join('');

        container.querySelectorAll('.playlist-item').forEach(item => {
            item.addEventListener('click', () => {
                const songId = parseInt(item.dataset.id);
                const song = this.playlist.find(s => s.id === songId);
                if (song) {
                    this.loadTrack(song);
                    this.wavesurfer.play();
                }
            });
        });
    }

    // Render queue
    renderQueue() {
        const container = document.getElementById('queue');

        if (this.queue.length === 0) {
            container.innerHTML = '<p class="empty-message">Queue is empty</p>';
            return;
        }

        container.innerHTML = this.queue.map((song, index) => `
            <div class="queue-item">
                <div class="item-info">
                    <div class="item-title">${song.title}</div>
                    <div class="item-artist">${song.artist}</div>
                </div>
                <button class="item-remove" data-index="${index}">✕</button>
            </div>
        `).join('');

        container.querySelectorAll('.item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.removeFromQueue(index);
            });
        });
    }

    // Render lyrics
    renderLyrics(lyrics) {
        const container = document.getElementById('lyricsContainer');

        if (!lyrics || lyrics.length === 0) {
            container.innerHTML = '<p class="no-lyrics">No lyrics available</p>';
            return;
        }

        container.innerHTML = lyrics.map((line, index) => `
            <div class="lyric-line" data-time="${line.time}">${line.text}</div>
        `).join('');

        // Add click to seek functionality
        container.querySelectorAll('.lyric-line').forEach(line => {
            line.addEventListener('click', () => {
                const time = parseFloat(line.dataset.time);
                if (this.wavesurfer) {
                    this.wavesurfer.seekTo(time / this.wavesurfer.getDuration());
                }
            });
        });
    }

    // Update lyrics based on current time
    updateLyrics(currentTime) {
        const lines = document.querySelectorAll('.lyric-line');
        let activeIndex = -1;

        lines.forEach((line, index) => {
            const lineTime = parseFloat(line.dataset.time);
            if (currentTime >= lineTime) {
                activeIndex = index;
            }
            line.classList.remove('active');
        });

        if (activeIndex >= 0) {
            lines[activeIndex].classList.add('active');
            // Auto scroll to active line
            lines[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Simulate collaborative playlist updates
    startCollaborationSimulation() {
        // Add random songs every 15-30 seconds
        setInterval(() => {
            const availableSongs = songsLibrary.filter(
                song => !this.playlist.find(p => p.id === song.id)
            );

            if (availableSongs.length > 0 && Math.random() > 0.5) {
                const randomSong = availableSongs[Math.floor(Math.random() * availableSongs.length)];
                this.playlist = [...this.playlist, randomSong];
                this.renderPlaylist();
                this.showToast(`👤 Someone added "${randomSong.title}"`);

                // Cache the new song
                if ('caches' in window) {
                    caches.open('music-player-v1').then(cache => {
                        cache.add(randomSong.audioUrl).catch(() => {});
                    });
                }
            }
        }, 15000 + Math.random() * 15000);
    }

    // Update online/offline status
    updateOnlineStatus() {
        const status = document.getElementById('offlineStatus');
        if (navigator.onLine) {
            status.classList.add('online');
        } else {
            status.classList.remove('online');
        }
    }

    // Show toast notification
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
            z-index: 1000;
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.player = new MusicPlayer();
    console.log('Music Stream Player initialized');
});

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    const searchContainer = document.querySelector('.search-container');
    const searchResults = document.getElementById('searchResults');

    if (!searchContainer.contains(e.target)) {
        searchResults.classList.remove('active');
    }
});
