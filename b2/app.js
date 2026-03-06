// Music Streaming Application - Main JavaScript

// Global Application State
class MusicApp {
    constructor() {
        this.currentTrack = null;
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.volume = 0.7;
        this.playlist = [];
        this.queue = [];
        this.wavesurfer = null;
        this.lyrics = [];
        this.currentLyricIndex = 0;
        this.shuffleMode = false;
        this.repeatMode = false;
        this.collaborativeUpdateInterval = null;
    }
}

// Initialize Application
const app = new MusicApp();

// Initialize Wavesurfer.js
function initWaveSurfer() {
    app.wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#4a4a4a',
        progressColor: '#1db954',
        cursorColor: '#1ed760',
        barWidth: 3,
        barGap: 2,
        barRadius: 3,
        height: 80,
        normalize: true,
        backend: 'MediaElement',
        mediaControls: false
    });

    // WaveSurfer event listeners
    app.wavesurfer.on('ready', () => {
        updateDuration();
        showToast('Track loaded successfully');
    });

    app.wavesurfer.on('audioprocess', (time) => {
        updateProgress(time);
        syncLyrics(time);
    });

    app.wavesurfer.on('finish', () => {
        if (app.repeatMode) {
            app.wavesurfer.play();
        } else {
            playNextTrack();
        }
    });

    app.wavesurfer.on('play', () => {
        app.isPlaying = true;
        updatePlayPauseButton();
        document.getElementById('playingIndicator').classList.add('active');
    });

    app.wavesurfer.on('pause', () => {
        app.isPlaying = false;
        updatePlayPauseButton();
        document.getElementById('playingIndicator').classList.remove('active');
    });
}

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // Initialize WaveSurfer
    initWaveSurfer();

    // Load initial playlist
    loadInitialPlaylist();

    // Setup event listeners
    setupEventListeners();

    // Setup search autocomplete
    setupSearchAutocomplete();

    // Start collaborative playlist simulation
    startCollaborativeSimulation();

    // Initialize cache
    initializeCache();

    // Setup orientation change listener for uninterrupted playback
    setupOrientationListener();

    showToast('🎵 Music Stream Pro loaded!');
}

// Load Initial Playlist
function loadInitialPlaylist() {
    app.playlist = [...TRACKS_DATABASE.slice(0, 8)]; // Load first 8 tracks
    renderPlaylist();
}

// Render Playlist
function renderPlaylist() {
    const playlistContainer = document.getElementById('playlist');
    playlistContainer.innerHTML = '';

    app.playlist.forEach((track, index) => {
        const playlistItem = createPlaylistItem(track, index);
        playlistContainer.appendChild(playlistItem);
    });

    updateCollaboratorCount();
}

// Create Playlist Item
function createPlaylistItem(track, index) {
    const item = document.createElement('div');
    item.className = `playlist-item ${app.currentTrack && app.currentTrack.id === track.id ? 'active' : ''}`;
    item.innerHTML = `
        <img src="${track.albumArt}" alt="${track.title}">
        <div class="playlist-item-info">
            <div class="track-name">${track.title}</div>
            <div class="track-details">${track.artist} • ${track.album}</div>
        </div>
        <div class="track-duration">${formatTime(track.duration)}</div>
        <div class="added-by">${index < 3 ? 'You' : COLLABORATORS[index % 3].name}</div>
    `;

    item.addEventListener('click', () => {
        playTrack(track, index);
    });

    return item;
}

// Play Track
function playTrack(track, index = 0) {
    app.currentTrack = track;
    app.currentTrackIndex = index;

    // Update UI
    document.getElementById('trackTitle').textContent = track.title;
    document.getElementById('trackArtist').textContent = track.artist;
    document.getElementById('trackAlbum').textContent = track.album;
    document.getElementById('albumArt').src = track.albumArt;

    // Load and play audio
    app.wavesurfer.load(track.audioUrl);
    app.wavesurfer.play();

    // Load lyrics
    loadLyrics(track.id);

    // Update playlist active state
    renderPlaylist();

    // Cache for offline playback
    cacheTrack(track);

    showToast(`🎵 Now playing: ${track.title}`);
}

// Load Lyrics
function loadLyrics(trackId) {
    const lyricsContent = document.getElementById('lyricsContent');
    app.lyrics = getLyricsById(trackId);

    if (app.lyrics && app.lyrics.length > 0) {
        lyricsContent.innerHTML = app.lyrics.map((lyric, index) =>
            `<div class="lyric-line" data-time="${lyric.time}">${lyric.text}</div>`
        ).join('');
    } else {
        lyricsContent.innerHTML = '<p class="no-lyrics">No lyrics available for this track</p>';
    }

    app.currentLyricIndex = 0;
}

// Sync Lyrics with Playback
function syncLyrics(currentTime) {
    if (!app.lyrics || app.lyrics.length === 0) return;

    const lyricsContainer = document.getElementById('lyricsContent');
    const lyricLines = lyricsContainer.querySelectorAll('.lyric-line');

    // Find current lyric index
    let newIndex = 0;
    for (let i = 0; i < app.lyrics.length; i++) {
        if (currentTime >= app.lyrics[i].time) {
            newIndex = i;
        }
    }

    if (newIndex !== app.currentLyricIndex) {
        app.currentLyricIndex = newIndex;

        // Update active state
        lyricLines.forEach((line, index) => {
            if (index === app.currentLyricIndex) {
                line.classList.add('active');
                // Scroll into view
                line.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                line.classList.remove('active');
            }
        });
    }
}

// Update Play/Pause Button
function updatePlayPauseButton() {
    const playPauseIcon = document.getElementById('playPauseIcon');
    if (app.isPlaying) {
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
    } else {
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    }
}

// Update Duration Display
function updateDuration() {
    const duration = app.wavesurfer.getDuration();
    document.getElementById('totalTime').textContent = formatTime(duration);
}

// Update Progress Display
function updateProgress(currentTime) {
    document.getElementById('currentTime').textContent = formatTime(currentTime);

    const duration = app.wavesurfer.getDuration();
    const progressPercent = (currentTime / duration) * 100;

    document.getElementById('progressFill').style.width = `${progressPercent}%`;
}

// Setup Event Listeners
function setupEventListeners() {
    // Play/Pause Button
    document.getElementById('playPauseBtn').addEventListener('click', togglePlayPause);

    // Previous/Next Buttons
    document.getElementById('prevBtn').addEventListener('click', playPreviousTrack);
    document.getElementById('nextBtn').addEventListener('click', playNextTrack);

    // Progress Bar (Click to seek)
    document.querySelector('.progress-bar').addEventListener('click', handleProgressClick);

    // Volume Slider
    document.getElementById('volumeSlider').addEventListener('input', handleVolumeChange);

    // Shuffle Button
    document.getElementById('shuffleBtn').addEventListener('click', toggleShuffle);

    // Repeat Button
    document.getElementById('repeatBtn').addEventListener('click', toggleRepeat);

    // Add to Queue Button
    document.getElementById('addSongBtn').addEventListener('click', showAddSongDialog);

    // Toggle Lyrics
    document.getElementById('toggleLyrics').addEventListener('click', toggleLyricsVisibility);

    // Collaborate Button
    document.getElementById('collaborateBtn').addEventListener('click', showCollaborators);

    // Settings Button
    document.getElementById('settingsBtn').addEventListener('click', showSettings);
}

// Toggle Play/Pause
function togglePlayPause() {
    if (!app.currentTrack) {
        if (app.playlist.length > 0) {
            playTrack(app.playlist[0], 0);
        }
        return;
    }

    if (app.isPlaying) {
        app.wavesurfer.pause();
    } else {
        app.wavesurfer.play();
    }
}

// Play Next Track
function playNextTrack() {
    if (app.queue.length > 0) {
        const nextTrack = app.queue.shift();
        renderQueue();
        const index = app.playlist.findIndex(t => t.id === nextTrack.id);
        playTrack(nextTrack, index >= 0 ? index : 0);
    } else if (app.playlist.length > 0) {
        let nextIndex = app.shuffleMode
            ? Math.floor(Math.random() * app.playlist.length)
            : (app.currentTrackIndex + 1) % app.playlist.length;
        playTrack(app.playlist[nextIndex], nextIndex);
    }
}

// Play Previous Track
function playPreviousTrack() {
    if (app.wavesurfer.getCurrentTime() > 3) {
        // If more than 3 seconds played, restart current track
        app.wavesurfer.seekTo(0);
    } else if (app.playlist.length > 0) {
        const prevIndex = (app.currentTrackIndex - 1 + app.playlist.length) % app.playlist.length;
        playTrack(app.playlist[prevIndex], prevIndex);
    }
}

// Handle Progress Click
function handleProgressClick(e) {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;

    if (app.wavesurfer) {
        const duration = app.wavesurfer.getDuration();
        app.wavesurfer.seekTo(percentage);
    }
}

// Handle Volume Change
function handleVolumeChange(e) {
    app.volume = e.target.value / 100;
    if (app.wavesurfer) {
        app.wavesurfer.setVolume(app.volume);
    }

    // Update volume icon
    const volumeIcon = document.getElementById('volumeIcon');
    if (app.volume === 0) {
        volumeIcon.className = 'fas fa-volume-off';
    } else if (app.volume < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
}

// Toggle Shuffle
function toggleShuffle() {
    app.shuffleMode = !app.shuffleMode;
    const shuffleBtn = document.getElementById('shuffleBtn');
    shuffleBtn.classList.toggle('active', app.shuffleMode);
    showToast(app.shuffleMode ? '🔀 Shuffle enabled' : '🔀 Shuffle disabled');
}

// Toggle Repeat
function toggleRepeat() {
    app.repeatMode = !app.repeatMode;
    const repeatBtn = document.getElementById('repeatBtn');
    repeatBtn.classList.toggle('active', app.repeatMode);
    showToast(app.repeatMode ? '🔁 Repeat enabled' : '🔁 Repeat disabled');
}

// Setup Search Autocomplete
function setupSearchAutocomplete() {
    const searchInput = document.getElementById('searchInput');
    const suggestionsContainer = document.getElementById('autocompleteSuggestions');
    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();

        if (query.length < 2) {
            suggestionsContainer.classList.remove('active');
            return;
        }

        searchTimeout = setTimeout(() => {
            const results = searchSongs(query);
            displaySuggestions(results, query);
        }, 300);
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.classList.remove('active');
        }
    });
}

// Display Search Suggestions
function displaySuggestions(results, query) {
    const suggestionsContainer = document.getElementById('autocompleteSuggestions');

    if (results.length === 0) {
        suggestionsContainer.innerHTML = '<div class="suggestion-item">No results found</div>';
    } else {
        suggestionsContainer.innerHTML = results.slice(0, 5).map(result => `
            <div class="suggestion-item" onclick="handleSuggestionClick(${result.id})">
                <i class="fas fa-music"></i>
                <div>
                    <strong>${highlightMatch(result.title, query)}</strong>
                    <div style="font-size: 0.85rem; color: var(--text-muted);">
                        ${highlightMatch(result.artist, query)}
                    </div>
                </div>
                <span class="suggestion-type">${result.genre}</span>
            </div>
        `).join('');
    }

    suggestionsContainer.classList.add('active');
}

// Highlight Search Match
function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong style="color: var(--primary-color);">$1</strong>');
}

// Handle Suggestion Click
function handleSuggestionClick(trackId) {
    const track = getSongById(trackId);
    document.getElementById('autocompleteSuggestions').classList.remove('active');
    document.getElementById('searchInput').value = '';

    if (track) {
        // Add to queue
        if (!app.queue.find(q => q.id === track.id)) {
            app.queue.push(track);
            renderQueue();
            showToast(`🎵 "${track.title}" added to queue`);
        } else {
            showToast('⚠️ Track already in queue');
        }

        // If nothing playing, play it now
        if (!app.currentTrack) {
            playTrack(track, 0);
        }
    }
}

// Render Queue
function renderQueue() {
    const queueList = document.getElementById('queueList');
    const queueCount = document.getElementById('queueCount');

    queueCount.textContent = app.queue.length;

    if (app.queue.length === 0) {
        queueList.innerHTML = '<p class="empty-queue">Queue is empty</p>';
        return;
    }

    queueList.innerHTML = app.queue.map((track, index) => `
        <div class="queue-item">
            <img src="${track.albumArt}" alt="${track.title}">
            <div class="queue-item-info">
                <div class="queue-item-title">${track.title}</div>
                <div class="queue-item-artist">${track.artist}</div>
            </div>
            <button class="remove-queue" onclick="removeFromQueue(${index})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

// Remove from Queue
function removeFromQueue(index) {
    app.queue.splice(index, 1);
    renderQueue();
    showToast('Track removed from queue');
}

// Show Add Song Dialog
function showAddSongDialog() {
    const randomTrack = getRandomSong();
    if (!app.playlist.find(t => t.id === randomTrack.id)) {
        app.playlist.push(randomTrack);
        renderPlaylist();
        showToast(`🎵 "${randomTrack.title}" added to playlist`);
    } else {
        showToast('⚠️ Track already in playlist');
    }
}

// Toggle Lyrics Visibility
function toggleLyricsVisibility() {
    const lyricsContent = document.getElementById('lyricsContent');
    const toggleBtn = document.getElementById('toggleLyrics');

    lyricsContent.classList.toggle('hidden');
    toggleBtn.querySelector('i').style.transform = lyricsContent.classList.contains('hidden')
        ? 'rotate(180deg)'
        : 'rotate(0deg)';
}

// Collaborative Playlist Simulation
function startCollaborativeSimulation() {
    // Simulate collaborative updates every 15-30 seconds
    app.collaborativeUpdateInterval = setInterval(() => {
        const update = simulateCollaborativeUpdate();

        if (update.type === 'add' && !app.playlist.find(t => t.id === update.song.id)) {
            app.playlist.push(update.song);
            renderPlaylist();
            showToast(`👥 ${update.user.name} added "${update.song.title}"`);
        } else if (update.type === 'remove') {
            const index = app.playlist.findIndex(t => t.id === update.songId);
            if (index > -1 && app.playlist.length > 1) {
                const removed = app.playlist.splice(index, 1)[0];
                renderPlaylist();
                showToast(`👥 ${update.user.name} removed "${removed.title}"`);
            }
        }
    }, Math.random() * 15000 + 15000);
}

function stopCollaborativeSimulation() {
    if (app.collaborativeUpdateInterval) {
        clearInterval(app.collaborativeUpdateInterval);
    }
}

// Update Collaborator Count
function updateCollaboratorCount() {
    document.getElementById('collaboratorCount').textContent = COLLABORATORS.length + 1; // +1 for current user
}

// Show Collaborators
function showCollaborators() {
    const collaboratorList = COLLABORATORS.map(c =>
        `<div style="padding: 0.5rem; border-bottom: 1px solid var(--border-color);">
            ${c.avatar} ${c.name}
        </div>`
    ).join('');

    showToast('👥 Collaborators: You, Alice, Bob, Charlie');
}

// Show Settings
function showSettings() {
    showToast('⚙️ Settings panel coming soon!');
}

// Cache Track for Offline Playback
async function cacheTrack(track) {
    if ('caches' in window) {
        try {
            const cache = await caches.open('music-stream-cache');
            await cache.add(track.audioUrl);
            updateOfflineStatus();
        } catch (error) {
            console.log('Failed to cache track:', error);
        }
    }
}

// Initialize Cache
async function initializeCache() {
    if ('caches' in window) {
        try {
            // Cache some popular tracks for offline playback
            const cache = await caches.open('music-stream-cache');
            const tracksToCache = TRACKS_DATABASE.slice(0, 3).map(t => t.audioUrl);

            for (const url of tracksToCache) {
                try {
                    await cache.add(url);
                } catch (e) {
                    console.log('Already cached or error:', url);
                }
            }

            updateOfflineStatus();
        } catch (error) {
            console.log('Cache initialization failed:', error);
        }
    }
}

// Update Offline Status
async function updateOfflineStatus() {
    if ('caches' in window) {
        const cache = await caches.open('music-stream-cache');
        const keys = await cache.keys();
        const count = keys.length;
        document.getElementById('offlineStatus').textContent =
            `${count} songs cached for offline playback`;
    }
}

// Setup Orientation Change Listener
function setupOrientationListener() {
    // Handle orientation changes without interrupting playback
    let orientationTimeout;

    window.addEventListener('orientationchange', () => {
        clearTimeout(orientationTimeout);

        showToast('📱 Rotating device...');

        orientationTimeout = setTimeout(() => {
            // Ensure playback continues after rotation
            if (app.isPlaying && app.wavesurfer) {
                app.wavesurfer.play();
            }
            showToast('✅ Playback continued');
        }, 500);
    });

    // Handle resize events (also triggered by orientation change on some devices)
    window.addEventListener('resize', () => {
        // Give the browser time to complete the rotation
        setTimeout(() => {
            if (app.wavesurfer) {
                app.wavesurfer.drawer?.fireEvent?.('redraw');
            }
        }, 100);
    });
}

// Show Toast Notification
function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;

    toastContainer.appendChild(toast);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('removed');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Handle visibility change (pause when tab hidden, optional)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // App is hidden - you could pause here if desired
        // But for continuous playback, we don't pause
    } else {
        // App is visible again
        if (app.wavesurfer) {
            // Refresh the waveform display
            app.wavesurfer.drawer?.fireEvent?.('redraw');
        }
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    stopCollaborativeSimulation();
    if (app.wavesurfer) {
        app.wavesurfer.destroy();
    }
});

// Handle online/offline events
window.addEventListener('online', () => {
    showToast('🌐 Back online');
});

window.addEventListener('offline', () => {
    showToast('📡 You are offline - playing cached content');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Don't trigger if user is typing in search
    if (e.target.tagName === 'INPUT') return;

    switch(e.code) {
        case 'Space':
            e.preventDefault();
            togglePlayPause();
            break;
        case 'ArrowRight':
            if (e.shiftKey) {
                playNextTrack();
            } else {
                app.wavesurfer?.skipForward(5);
            }
            break;
        case 'ArrowLeft':
            if (e.shiftKey) {
                playPreviousTrack();
            } else {
                app.wavesurfer?.skipBackward(5);
            }
            break;
        case 'ArrowUp':
            e.preventDefault();
            const currentVol = parseInt(document.getElementById('volumeSlider').value);
            document.getElementById('volumeSlider').value = Math.min(100, currentVol + 10);
            handleVolumeChange({ target: document.getElementById('volumeSlider') });
            break;
        case 'ArrowDown':
            e.preventDefault();
            const newVol = parseInt(document.getElementById('volumeSlider').value);
            document.getElementById('volumeSlider').value = Math.max(0, newVol - 10);
            handleVolumeChange({ target: document.getElementById('volumeSlider') });
            break;
    }
});

console.log('🎵 Music Stream Pro initialized');
