# Music Stream Pro 🎵

A comprehensive music streaming application built with vanilla JavaScript, featuring collaborative playlist management, waveform visualization, and offline playback capabilities.

## Features ✨

### 🎵 Core Player Features
- **Waveform Visualization** - Real-time audio waveform using Wavesurfer.js
- **Complete Player Controls** - Play, pause, skip, previous, shuffle, repeat
- **Progress Bar** - Interactive progress bar with seek functionality
- **Volume Control** - Smooth volume slider with visual feedback

### 📋 Playlist Management
- **Collaborative Playlist** - Simulated real-time collaboration with multiple users
- **Dynamic Updates** - Automatic playlist updates from "other users"
- **Queue System** - Add tracks to queue for seamless playback
- **Search Functionality** - Autocomplete search with highlighting

### 🎤 Lyrics Support
- **Time-Synchronized Lyrics** - Lyrics that sync perfectly with playback
- **Auto-Scroll** - Automatic scrolling to current lyric
- **Visual Highlighting** - Active lyric highlighted and animated

### 📱 Responsive Design
- **Mobile-First** - Optimized for all screen sizes
- **Orientation Support** - Seamless playback on device rotation
- **Adaptive Layout** - Dynamic grid layout that adapts to screen size

### 💾 Offline Capability
- **Cache API** - Songs cached for offline playback
- **Service Worker** - Background sync and caching
- **Progressive Web App** - Installable on mobile devices

### 🎨 UI/UX Features
- **Dark Theme** - Modern dark interface with Spotify-inspired design
- **Smooth Animations** - CSS transitions and animations
- **Toast Notifications** - Real-time feedback for user actions
- **Keyboard Shortcuts** - Space, Arrow keys, Shift+Arrows

## Technology Stack 🛠️

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with Custom Properties
- **Audio Visualization**: Wavesurfer.js 7.x
- **Caching**: Cache API & Service Workers
- **Icons**: Font Awesome 6.4.0

## File Structure 📁

```
music-stream-pro/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── data.js             # Mock data and helper functions
├── app.js              # Main application logic
├── sw.js               # Service Worker for offline support
└── README.md           # Documentation
```

## Getting Started 🚀

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (for Service Worker support)

### Installation

1. **Clone or download the files** to your local machine

2. **Serve the files** using a local web server:

   **Option 1: Using Python**
   ```bash
   python -m http.server 8000
   ```

   **Option 2: Using Node.js**
   ```bash
   npx http-server -p 8000
   ```

   **Option 3: Using VS Code Live Server**
   - Install the Live Server extension
   - Right-click `index.html`
   - Select "Open with Live Server"

3. **Open the application**
   - Navigate to `http://localhost:8000` in your browser

### Usage

#### Playing Music
1. Click on any track in the playlist to start playback
2. Use the player controls to play/pause, skip, or go back
3. Click/scroll on the progress bar to seek to a specific position
4. Adjust volume using the volume slider

#### Search & Queue
1. Start typing in the search box to see autocomplete suggestions
2. Click on a suggestion to add it to the queue
3. The queue displays upcoming tracks
4. Remove tracks from queue by clicking the X button

#### Lyrics
1. Lyrics appear automatically when playing a track with lyrics
2. The current line is highlighted in green
3. Lyrics scroll automatically to keep the current line visible
4. Toggle lyrics visibility using the chevron button

#### Collaboration
1. Watch as simulated collaborators add/remove songs every 15-30 seconds
2. See toast notifications when changes occur
3. Collaborator count shows in the header

#### Keyboard Shortcuts
- **Space**: Play/Pause
- **Arrow Right**: Skip forward 5 seconds
- **Arrow Left**: Skip backward 5 seconds
- **Shift + Arrow Right**: Next track
- **Shift + Arrow Left**: Previous track
- **Arrow Up**: Increase volume
- **Arrow Down**: Decrease volume

## API Reference 🔧

### Main Functions

#### `playTrack(track, index)`
Loads and plays a specific track.

#### `togglePlayPause()`
Toggles between play and pause states.

#### `playNextTrack()`
Plays the next track from queue or playlist.

#### `playPreviousTrack()`
Plays the previous track or restarts current track.

#### `syncLyrics(currentTime)`
Synchronizes lyrics display with current playback time.

#### `cacheTrack(track)`
Caches a track for offline playback.

### Data Structures

#### Track Object
```javascript
{
  id: number,
  title: string,
  artist: string,
  album: string,
  duration: number,  // in seconds
  albumArt: string,  // URL
  audioUrl: string,  // URL
  genre: string
}
```

#### Lyric Line
```javascript
{
  time: number,      // time in seconds
  text: string       // lyric text
}
```

## Browser Compatibility 🌐

- ✅ Chrome 90+ (Full support)
- ✅ Firefox 88+ (Full support)
- ✅ Safari 14+ (Full support)
- ✅ Edge 90+ (Full support)

### Required Features
- ES6 JavaScript Support
- Cache API
- Service Workers
- Web Audio API
- CSS Grid & Flexbox

## Performance Optimization ⚡

- **Lazy Loading**: Lyrics loaded only when track plays
- **Debounced Search**: 300ms debounce on search input
- **Efficient Rendering**: Virtual DOM-like updates for playlist
- **Memory Management**: Proper cleanup of event listeners
- **Responsive Images**: Album art uses placeholder service

## Future Enhancements 🔮

### Planned Features
- [ ] Real backend integration
- [ ] User authentication
- [ ] Real collaborative playlist using WebSockets
- [ ] Playlist creation and management
- [ ] Audio effects (EQ, reverb)
- [ ] Social sharing
- [ ] Mini player mode
- [ ] Lyrics editor

### Tech Improvements
- [ ] Migrate to React/Vue framework
- [ ] Add TypeScript support
- [ ] Implement testing (Jest, Cypress)
- [ ] CI/CD pipeline
- [ ] Performance monitoring

## Troubleshooting 🔍

### Audio Not Playing
- Check browser console for errors
- Ensure audio URLs are accessible
- Verify CORS settings for audio files
- Try a different browser

### Service Worker Not Working
- Ensure you're using HTTPS or localhost
- Check that a web server is running
- Clear browser cache and reload
- Check browser console for Service Worker errors

### Lyrics Not Syncing
- Ensure `data.js` has lyrics for the track
- Check that time values in lyrics are correct
- Try refreshing the page

### Orientation Issues on Mobile
- Ensure viewport meta tag is present
- Test on actual device (not just dev tools)
- Check device orientation permissions

## License 📄

MIT License - Feel free to use this project for learning or as a starting point for your own applications.

## Credits 🙏

- **Audio Samples**: SoundHelix.com
- **Waveform Visualization**: Wavesurfer.js
- **Icons**: Font Awesome
- **Placeholder Images**: Picsum Photos

---

Built with ❤️ using vanilla JavaScript, CSS3, and modern web APIs.
