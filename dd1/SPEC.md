# Music Streaming UI Specification

## Project Overview
- **Project Name**: SonicFlow
- **Type**: Interactive music streaming application
- **Core Functionality**: A feature-rich music player with waveform visualization, synchronized lyrics, collaborative playlists, and offline capability
- **Target Users**: Music enthusiasts who want a visually engaging and functional music streaming experience

## UI/UX Specification

### Layout Structure

#### Desktop Layout (>1024px)
```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: Logo | Search Bar with Autocomplete | User Avatar │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────┐  ┌─────────────────────────────┐  │
│  │                      │  │                             │  │
│  │   PLAYLIST SIDEBAR   │  │    NOW PLAYING / LYRICS     │  │
│  │   - Your Playlists   │  │    - Waveform Visualizer    │  │
│  │   - Collaborative    │  │    - Track Info             │  │
│  │   - Queue            │  │    - Time-synced Lyrics     │  │
│  │                      │  │                             │  │
│  └──────────────────────┘  └─────────────────────────────┘  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  PLAYER BAR: Cover | Title/Artist | ◀ ◀◀ ▶ ▶▶ | Progress   │
└─────────────────────────────────────────────────────────────┘
```

#### Tablet Layout (768px - 1024px)
- Sidebar collapses to icon-only mode
- Lyrics panel moves below waveform
- Player bar remains fixed at bottom

#### Mobile Layout (<768px)
```
┌─────────────────────┐
│ Header (compact)   │
├─────────────────────┤
│                     │
│   NOW PLAYING       │
│   (full width)      │
│                     │
├─────────────────────┤
│ LYRICS (scrollable) │
├─────────────────────┤
│ PLAYER CONTROLS     │
│ (sticky bottom)     │
└─────────────────────┘
```
- Playlist accessible via slide-out drawer
- Swipe gestures for navigation

### Visual Design

#### Color Palette
- **Background Primary**: `#0D0D0D` (near black)
- **Background Secondary**: `#1A1A2E` (dark navy)
- **Background Tertiary**: `#16213E` (deep blue)
- **Accent Primary**: `#E94560` (vibrant coral-red)
- **Accent Secondary**: `#0F3460` (muted blue)
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `#A0A0A0`
- **Text Muted**: `#666666`
- **Waveform Active**: `#E94560`
- **Waveform Inactive**: `#3A3A5C`
- **Lyrics Highlight**: `#E94560`
- **Lyrics Normal**: `#666666`
- **Success**: `#4ADE80`
- **Border**: `#2A2A4A`

#### Typography
- **Font Family Primary**: `'Inter', -apple-system, sans-serif`
- **Font Family Display**: `'Space Grotesk', sans-serif`
- **Heading XL**: 32px, 700 weight
- **Heading L**: 24px, 600 weight
- **Heading M**: 18px, 600 weight
- **Body**: 14px, 400 weight
- **Caption**: 12px, 400 weight
- **Lyrics**: 20px, 500 weight, line-height 2.2

#### Spacing System (8px base)
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px

#### Visual Effects
- **Card shadows**: `0 8px 32px rgba(0,0,0,0.4)`
- **Glow effect**: `0 0 20px rgba(233,69,96,0.3)` (on active elements)
- **Glassmorphism**: `backdrop-filter: blur(20px); background: rgba(26,26,46,0.8)`
- **Transitions**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- **Waveform animation**: Smooth gradient pulse on beat

### Components

#### 1. Search Bar with Autocomplete
- Width: 400px max on desktop
- States: default, focused, with-results, loading
- Autocomplete dropdown with track/artist suggestions
- Keyboard navigation (up/down/enter)
- Recent searches shown when focused

#### 2. Waveform Visualizer
- Height: 120px on desktop, 80px on mobile
- Progress overlay with draggable seek
- Cursor line indicator
- Responsive bars (80-150 based on viewport)

#### 3. Playlist Card
- Cover art: 60x60px, 8px radius
- Title truncation: ellipsis after 1 line
- Subtitle (artist): truncated after 1 line
- Hover: scale(1.02), glow effect
- Active: left border accent color

#### 4. Player Controls
- Buttons: 48px touch targets
- Play/Pause: circular, 56px, prominent
- Skip: 40px
- Progress bar: 4px height, expands to 8px on hover
- Time display: current / total format

#### 5. Lyrics Display
- Auto-scroll to current line
- Smooth transition between lines
- Tap/click on line to seek
- Fade gradient at top/bottom edges

#### 6. Queue Item
- Drag handle for reordering
- Remove button on hover
- Currently playing indicator

## Functionality Specification

### Core Features

#### 1. Audio Playback
- Play/Pause toggle
- Skip forward/backward
- Seek via progress bar
- Seek via waveform click
- Volume control (stored in localStorage)
- Mute toggle
- Keyboard shortcuts: Space (play/pause), Arrow keys (seek), M (mute)

#### 2. Waveform Visualization (Wavesurfer.js)
- Generate waveform from audio data
- Real-time progress visualization
- Click-to-seek functionality
- Responsive bar width based on container
- Smooth cursor following

#### 3. Search with Autocomplete
- Debounced input (300ms)
- Search by track title, artist name
- Show up to 8 suggestions
- Highlight matching text
- Add to queue on selection
- Mock dataset of 50+ tracks

#### 4. Synchronized Lyrics
- Line-by-line timing data
- Auto-scroll to current line
- Highlight current line in accent color
- Tap lyrics to seek
- Fallback message when no lyrics available

#### 5. Playlist Management
- Create new playlist (name only for MVP)
- Add tracks to playlist
- Remove tracks from playlist
- Reorder tracks via drag
- Delete playlist
- Collaborative playlist indicator

#### 6. Collaborative Playlist Simulation
- Every 30 seconds, fetch "new" tracks from mock API
- Add random track to collaborative playlist
- Show notification: "Sarah added [Track] to Collaborative"
- Visual highlight on newly added track

#### 7. Offline Queue (Cache API)
- Add track to offline queue
- Download indicator while caching
- Offline badge on cached tracks
- Playback from cache when offline
- Remove from offline queue
- Persist queue in localStorage

#### 8. Responsive Behavior
- CSS Grid for main layout
- CSS Flexbox for components
- Media queries: 768px, 1024px breakpoints
- Orientation detection for mobile
- Playback continues uninterrupted on rotation

### User Interactions
1. Click track in playlist → starts playback
2. Drag progress bar → seeks to position
3. Click waveform → seeks to position
4. Click search result → adds to queue and plays
5. Double-click playlist → opens/expands
6. Long press queue item → enable reorder mode
7. Swipe queue item left → delete
8. Click lyrics line → seek to timestamp

### Data Handling

#### Mock Data Structure
```javascript
Track: {
  id: string,
  title: string,
  artist: string,
  album: string,
  duration: number, // seconds
  coverUrl: string,
  audioUrl: string,
  lyrics: Array<{time: number, text: string}>
}

Playlist: {
  id: string,
  name: string,
  isCollaborative: boolean,
  tracks: Track[]
}
```

#### State Management
- Current track
- Playback state (playing/paused)
- Current time / duration
- Volume level
- Queue (array of track IDs)
- Offline queue (array of track IDs)
- Active playlist
- Search results

### Edge Cases
- Audio load failure → show error toast, skip to next
- No lyrics available → show "No lyrics available" message
- Offline with no cached tracks → show offline message
- Empty playlist → show empty state illustration
- Search no results → show "No tracks found"
- Collaborative update while playing → don't interrupt current track

## Acceptance Criteria

### Visual Checkpoints
- [ ] Dark theme with coral-red accents renders correctly
- [ ] Waveform displays and animates with playback
- [ ] Lyrics scroll smoothly and highlight correctly
- [ ] Playlist sidebar shows all playlists
- [ ] Player bar fixed at bottom with all controls
- [ ] Search dropdown appears with suggestions
- [ ] Responsive layout works on all breakpoints

### Functional Checkpoints
- [ ] Play/Pause works correctly
- [ ] Skip to next/previous works
- [ ] Progress bar updates and allows seeking
- [ ] Waveform click seeks correctly
- [ ] Search autocomplete filters results
- [ ] Lyrics sync with audio playback
- [ ] Collaborative playlist updates every 30s
- [ ] Add to offline queue works
- [ ] Playback continues on device rotation
- [ ] Volume control persists

### Technical Checkpoints
- [ ] Wavesurfer.js loads without errors
- [ ] Cache API stores tracks correctly
- [ ] No console errors during playback
- [ ] Smooth 60fps animations
- [ ] No memory leaks on track change
