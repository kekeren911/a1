// ==================== MOCK DATA ====================
const MOCK_SONGS = [
    {
        id: 1,
        title: "星空物语",
        artist: "梦乐队",
        duration: 245,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        cover: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
        id: 2,
        title: "城市夜行车",
        artist: "电子天空",
        duration: 198,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        cover: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
        id: 3,
        title: "海边漫步",
        artist: "海风组合",
        duration: 312,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        cover: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
        id: 4,
        title: "山间清晨",
        artist: "自然之声",
        duration: 278,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        cover: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
        id: 5,
        title: "时光倒流",
        artist: "记忆碎片",
        duration: 234,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        cover: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
        id: 6,
        title: "霓虹灯光",
        artist: "城市节拍",
        duration: 287,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        cover: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
    },
    {
        id: 7,
        title: "雨夜情怀",
        artist: "忧郁诗人",
        duration: 256,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        cover: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    },
    {
        id: 8,
        title: "阳光大道",
        artist: "活力四射",
        duration: 223,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        cover: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
    },
    {
        id: 9,
        title: "月光奏鸣曲",
        artist: "古典大师",
        duration: 345,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        cover: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)"
    },
    {
        id: 10,
        title: "青春记忆",
        artist: "时光机",
        duration: 267,
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        cover: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
    }
];

const MOCK_LYRICS = {
    1: [
        { time: 0, text: "♪ 前奏 ♪" },
        { time: 15, text: "仰望星空，寻找属于我的光芒" },
        { time: 22, text: "在这无尽的夜，思绪在飞扬" },
        { time: 30, text: "每一颗星星，都是一个梦想" },
        { time: 38, text: "照亮我前路，不再感到彷徨" },
        { time: 45, text: "♪ 间奏 ♪" },
        { time: 60, text: "穿越银河，追寻心中的方向" },
        { time: 68, text: "在这星空下，许下一个愿望" },
        { time: 75, text: "让爱指引我，到达远方" },
        { time: 83, text: "星空物语，永不会被遗忘" }
    ],
    2: [
        { time: 0, text: "♪ 前奏 ♪" },
        { time: 12, text: "霓虹闪烁，夜行车在城市穿梭" },
        { time: 20, text: "街灯掠过，像时光的脉搏" },
        { time: 28, text: "车窗倒影，映照出那个我" },
        { time: 36, text: "在这夜晚，灵魂在漂泊" },
        { time: 45, text: "♪ 间奏 ♪" },
        { time: 60, text: "引擎轰鸣，奏响夜的乐章" },
        { time: 68, text: "速度激情，在这一刻释放" },
        { time: 75, text: "目的地何方，其实不重要" },
        { time: 83, text: "享受这段旅程，才是真谛所在" }
    ]
};

// ==================== MUSIC PLAYER CLASS ====================
class MusicPlayer {
    constructor() {
        this.wavesurfer = null;
        this.currentTrack = null;
        this.playlist = [...MOCK_SONGS];
        this.queue = [];
        this.isPlaying = false;
        this.currentLyricIndex = -1;
        this.isShuffle = false;
        this.isRepeat = false;
        this.collaborativeInterval = null;
        this.orientationBeforeRotation = null;

        this.init();
    }

    async init() {
        await this.initWaveSurfer();
        this.setupEventListeners();
        this.renderPlaylist();
        this.setupSearch();
        this.startCollaborativeSimulation();
        await this.initCacheForOffline();
        this.handleOrientationChange();
    }

    async initWaveSurfer() {
        this.wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: 'rgba(255, 255, 255, 0.3)',
            progressColor: '#1db954',
            cursorColor: '#1ed760',
            barWidth: 2,
            barGap: 3,
            barRadius: 3,
            height: 80,
            normalize: true,
            backend: 'WebAudio',
            mediaControls: false
        });

        // Update progress bar as audio plays
        this.wavesurfer.on('audioprocess', () => {
            this.updateProgress();
        });

        // Update when seeking
        this.wavesurfer.on('seeking', () => {
            this.updateProgress();
        });

        // Handle audio end
        this.wavesurfer.on('finish', () => {
            this.onTrackEnd();
        });

        // Handle ready state
        this.wavesurfer.on('ready', () => {
            this.updateDuration();
            this.renderLyrics(this.currentTrack?.id);
        });

        // Handle play/pause events
        this.wavesurfer.on('play', () => {
            this.isPlaying = true;
            this.updatePlayButton();
        });

        this.wavesurfer.on('pause', () => {
            this.isPlaying = false;
            this.updatePlayButton();
        });
    }

    setupEventListeners() {
        // Player controls
        document.getElementById('playBtn').addEventListener('click', () => this.togglePlay());
        document.getElementById('prevBtn').addEventListener('click', () => this.playPrevious());
        document.getElementById('nextBtn').addEventListener('click', () => this.playNext());
        document.getElementById('shuffleBtn').addEventListener('click', () => this.toggleShuffle());
        document.getElementById('repeatBtn').addEventListener('click', () => this.toggleRepeat());

        // Progress bar
        const progressBar = document.getElementById('progressBar');
        progressBar.addEventListener('input', (e) => {
            if (this.wavesurfer) {
                const position = e.target.value / 100;
                this.wavesurfer.seekTo(position);
            }
        });

        // Volume control
        const volumeBar = document.getElementById('volumeBar');
        volumeBar.addEventListener('input', (e) => {
            if (this.wavesurfer) {
                const volume = e.target.value / 100;
                this.wavesurfer.setVolume(volume);
            }
        });
    }

    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchSuggestions = document.getElementById('searchSuggestions');

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            if (query.length === 0) {
                searchSuggestions.classList.remove('active');
                return;
            }

            const suggestions = this.playlist.filter(song =>
                song.title.toLowerCase().includes(query) ||
                song.artist.toLowerCase().includes(query)
            ).slice(0, 5);

            if (suggestions.length > 0) {
                searchSuggestions.innerHTML = suggestions.map(song => `
                    <div class="suggestion-item" data-id="${song.id}">
                        <div class="song-title">${song.title}</div>
                        <div class="song-artist">${song.artist}</div>
                    </div>
                `).join('');

                searchSuggestions.classList.add('active');

                // Add click handlers to suggestions
                searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const songId = parseInt(item.dataset.id);
                        this.loadTrack(songId);
                        searchInput.value = '';
                        searchSuggestions.classList.remove('active');
                    });
                });
            } else {
                searchSuggestions.classList.remove('active');
            }
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                searchSuggestions.classList.remove('active');
            }
        });
    }

    async loadTrack(songId) {
        const track = this.playlist.find(s => s.id === songId);
        if (!track) return;

        this.currentTrack = track;

        // Update UI
        document.getElementById('trackTitle').textContent = track.title;
        document.getElementById('trackArtist').textContent = track.artist;

        const albumArt = document.getElementById('albumArt');
        albumArt.style.background = track.cover;

        // Load audio into wavesurfer
        try {
            // Try cache first
            const cachedBlob = await this.getCachedAudio(track.id);
            const audioUrl = cachedBlob || track.url;

            await this.wavesurfer.load(audioUrl);

            // Cache for offline if not already cached
            if (!cachedBlob) {
                this.cacheAudio(track);
            }
        } catch (error) {
            console.error('Error loading track:', error);
            this.showToast('加载失败，请检查网络连接');
        }

        // Update playlist display
        this.renderPlaylist();
        this.updateQueueDisplay();
    }

    togglePlay() {
        if (!this.currentTrack) {
            if (this.playlist.length > 0) {
                this.loadTrack(this.playlist[0].id);
            }
            return;
        }

        if (this.isPlaying) {
            this.wavesurfer.pause();
        } else {
            this.wavesurfer.play();
        }
    }

    updatePlayButton() {
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

    playNext() {
        if (!this.currentTrack) return;

        let nextIndex;
        if (this.queue.length > 0) {
            // Play from queue
            const nextSong = this.queue.shift();
            this.loadTrack(nextSong.id);
            this.updateQueueDisplay();
            return;
        } else if (this.isShuffle) {
            // Random track
            const availableTracks = this.playlist.filter(s => s.id !== this.currentTrack.id);
            const randomTrack = availableTracks[Math.floor(Math.random() * availableTracks.length)];
            nextIndex = this.playlist.findIndex(s => s.id === randomTrack.id);
        } else {
            // Next track in playlist
            nextIndex = this.playlist.findIndex(s => s.id === this.currentTrack.id) + 1;
            if (nextIndex >= this.playlist.length) {
                nextIndex = 0;
            }
        }

        this.loadTrack(this.playlist[nextIndex].id);
        this.wavesurfer.play();
    }

    playPrevious() {
        if (!this.currentTrack) return;

        const currentIndex = this.playlist.findIndex(s => s.id === this.currentTrack.id);
        const prevIndex = currentIndex - 1 < 0 ? this.playlist.length - 1 : currentIndex - 1;

        this.loadTrack(this.playlist[prevIndex].id);
        this.wavesurfer.play();
    }

    onTrackEnd() {
        if (this.isRepeat) {
            this.wavesurfer.play();
        } else {
            this.playNext();
        }
    }

    toggleShuffle() {
        this.isShuffle = !this.isShuffle;
        const shuffleBtn = document.getElementById('shuffleBtn');
        shuffleBtn.classList.toggle('active', this.isShuffle);
        this.showToast(this.isShuffle ? '随机播放已开启' : '随机播放已关闭');
    }

    toggleRepeat() {
        this.isRepeat = !this.isRepeat;
        const repeatBtn = document.getElementById('repeatBtn');
        repeatBtn.classList.toggle('active', this.isRepeat);
        this.showToast(this.isRepeat ? '循环播放已开启' : '循环播放已关闭');
    }

    updateProgress() {
        if (!this.wavesurfer) return;

        const currentTime = this.wavesurfer.getCurrentTime();
        const duration = this.wavesurfer.getDuration();

        if (duration > 0) {
            const progress = (currentTime / duration) * 100;
            document.getElementById('progressBar').value = progress;
            document.getElementById('currentTime').textContent = this.formatTime(currentTime);
        }

        // Update lyrics
        this.syncLyrics(currentTime);
    }

    updateDuration() {
        if (!this.wavesurfer) return;
        const duration = this.wavesurfer.getDuration();
        document.getElementById('duration').textContent = this.formatTime(duration);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    renderPlaylist() {
        const container = document.getElementById('playlistContainer');

        container.innerHTML = this.playlist.map(song => `
            <div class="playlist-item ${this.currentTrack?.id === song.id ? 'playing' : ''}"
                 data-id="${song.id}">
                <div class="song-info">
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
                <div class="song-actions">
                    ${this.currentTrack?.id === song.id && this.isPlaying ?
                        '<span class="playing-indicator">♪</span>' :
                        `<button class="action-btn play-song-btn" data-id="${song.id}">▶</button>
                         <button class="action-btn queue-btn" data-id="${song.id}">+</button>`}
                </div>
            </div>
        `).join('');

        // Add event listeners
        container.querySelectorAll('.playlist-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.classList.contains('play-song-btn')) {
                    const songId = parseInt(e.target.dataset.id);
                    this.loadTrack(songId);
                    this.wavesurfer.play();
                } else if (e.target.classList.contains('queue-btn')) {
                    const songId = parseInt(e.target.dataset.id);
                    this.addToQueue(songId);
                } else if (!e.target.classList.contains('action-btn')) {
                    const songId = parseInt(item.dataset.id);
                    this.loadTrack(songId);
                    this.wavesurfer.play();
                }
            });
        });
    }

    addToQueue(songId) {
        const song = this.playlist.find(s => s.id === songId);
        if (song && !this.queue.find(s => s.id === songId)) {
            this.queue.push(song);
            this.updateQueueDisplay();
            this.showToast(`已添加到队列: ${song.title}`);
        }
    }

    updateQueueDisplay() {
        const container = document.getElementById('queueContainer');

        if (this.queue.length === 0) {
            container.innerHTML = '<p class="empty-message">队列为空</p>';
            return;
        }

        container.innerHTML = this.queue.map((song, index) => `
            <div class="queue-item">
                <span class="queue-position">${index + 1}</span>
                <div class="queue-song-info">
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
                <button class="action-btn remove-queue-btn" data-id="${song.id}">✕</button>
            </div>
        `).join('');

        // Add remove handlers
        container.querySelectorAll('.remove-queue-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const songId = parseInt(e.target.dataset.id);
                this.queue = this.queue.filter(s => s.id !== songId);
                this.updateQueueDisplay();
            });
        });
    }

    renderLyrics(songId) {
        const container = document.getElementById('lyricsContainer');
        const lyrics = MOCK_LYRICS[songId];

        if (!lyrics) {
            container.innerHTML = '<p class="no-lyrics">暂无歌词</p>';
            return;
        }

        container.innerHTML = lyrics.map((line, index) => `
            <div class="lyric-line" data-time="${line.time}" data-index="${index}">
                ${line.text}
            </div>
        `).join('');
    }

    syncLyrics(currentTime) {
        const lyrics = MOCK_LYRICS[this.currentTrack?.id];
        if (!lyrics) return;

        let activeIndex = -1;
        for (let i = lyrics.length - 1; i >= 0; i--) {
            if (currentTime >= lyrics[i].time) {
                activeIndex = i;
                break;
            }
        }

        if (activeIndex !== this.currentLyricIndex) {
            this.currentLyricIndex = activeIndex;

            // Update visual
            document.querySelectorAll('.lyric-line').forEach((line, index) => {
                line.classList.toggle('active', index === activeIndex);
            });

            // Scroll into view
            const activeLine = document.querySelector('.lyric-line.active');
            if (activeLine) {
                activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    // ==================== COLLABORATIVE PLAYLIST SIMULATION ====================
    startCollaborativeSimulation() {
        // Simulate other users adding songs periodically
        this.collaborativeInterval = setInterval(() => {
            const randomAction = Math.random();

            if (randomAction < 0.3) {
                // 30% chance someone adds a song
                this.simulateUserAddSong();
            } else if (randomAction < 0.5) {
                // 20% chance someone reorders the playlist
                this.simulateUserReorder();
            }
        }, 15000); // Every 15 seconds
    }

    simulateUserAddSong() {
        const users = ['小明', '小红', '小华', '小李', '小王'];
        const randomUser = users[Math.floor(Math.random() * users.length)];

        // Generate a new "song"
        const newSong = {
            id: Date.now(),
            title: `用户分享歌曲 ${Math.floor(Math.random() * 100)}`,
            artist: randomUser,
            duration: 180 + Math.floor(Math.random() * 120),
            url: MOCK_SONGS[Math.floor(Math.random() * MOCK_SONGS.length)].url,
            cover: `linear-gradient(135deg, hsl(${Math.random() * 360}, 70%, 50%) 0%, hsl(${Math.random() * 360}, 70%, 50%) 100%)`
        };

        this.playlist.push(newSong);
        this.renderPlaylist();
        this.showToast(`${randomUser} 添加了一首新歌曲! 🎵`);
    }

    simulateUserReorder() {
        // Shuffle the playlist slightly
        const index1 = Math.floor(Math.random() * this.playlist.length);
        const index2 = Math.floor(Math.random() * this.playlist.length);

        [this.playlist[index1], this.playlist[index2]] = [this.playlist[index2], this.playlist[index1]];
        this.renderPlaylist();
        this.showToast('播放列表已被其他用户更新');
    }

    // ==================== CACHE API FOR OFFLINE ====================
    async initCacheForOffline() {
        if ('caches' in window) {
            try {
                // Open cache
                const cache = await caches.open('music-player-v1');

                // Cache all songs for offline play
                for (const song of MOCK_SONGS.slice(0, 5)) { // Cache first 5 songs
                    try {
                        await cache.add(song.url);
                        console.log(`Cached: ${song.title}`);
                    } catch (error) {
                        console.error(`Failed to cache ${song.title}:`, error);
                    }
                }

                this.updateOnlineStatus(true);
            } catch (error) {
                console.error('Cache initialization failed:', error);
                this.updateOnlineStatus(false);
            }
        }
    }

    async cacheAudio(track) {
        if ('caches' in window) {
            try {
                const cache = await caches.open('music-player-v1');
                await cache.add(track.url);
                console.log(`Cached: ${track.title}`);
            } catch (error) {
                console.error('Failed to cache audio:', error);
            }
        }
    }

    async getCachedAudio(trackId) {
        if ('caches' in window) {
            try {
                const cache = await caches.open('music-player-v1');
                const track = this.playlist.find(s => s.id === trackId);
                if (track) {
                    const cachedResponse = await cache.match(track.url);
                    if (cachedResponse) {
                        const blob = await cachedResponse.blob();
                        return URL.createObjectURL(blob);
                    }
                }
            } catch (error) {
                console.error('Failed to get cached audio:', error);
            }
        }
        return null;
    }

    updateOnlineStatus(isOnline) {
        const statusElement = document.getElementById('offlineStatus');
        if (isOnline) {
            statusElement.textContent = '● 已缓存可离线';
            statusElement.className = 'offline-status online';
        } else {
            statusElement.textContent = '● 需要网络';
            statusElement.className = 'offline-status offline';
        }
    }

    // ==================== DEVICE ORIENTATION HANDLING ====================
    handleOrientationChange() {
        // Handle device rotation without interrupting playback
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                // Ensure wavesurfer dimensions are correct after rotation
                if (this.wavesurfer) {
                    this.wavesurfer.drawer.fireEvent('redraw');
                }
            }, 100);
        });

        // Also handle resize events
        window.addEventListener('resize', () => {
            if (this.wavesurfer) {
                // Debounce the resize handler
                clearTimeout(this.resizeTimeout);
                this.resizeTimeout = setTimeout(() => {
                    this.wavesurfer.drawer.fireEvent('redraw');
                }, 250);
            }
        });

        // Handle visibility change to prevent issues when switching apps
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.isPlaying && this.wavesurfer) {
                // Ensure audio continues playing when returning to the app
                this.wavesurfer.play();
            }
        });

        // Prevent audio interruption on iOS
        if (typeof Audio !== 'undefined') {
            const audio = new Audio();
            audio.preload = 'auto';
        }
    }

    showToast(message) {
        // Remove existing toasts
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// ==================== INITIALIZE PLAYER ====================
let player;

document.addEventListener('DOMContentLoaded', () => {
    player = new MusicPlayer();
});

// Prevent scrolling on iOS when dragging progress bar
document.addEventListener('touchmove', (e) => {
    if (e.target.tagName === 'INPUT' && e.target.type === 'range') {
        e.preventDefault();
    }
}, { passive: false });