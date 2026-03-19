# Virtual Classroom Platform - Specification

## 1. Project Overview
- **Project Name**: Virtual Classroom Platform
- **Type**: Interactive web application (single HTML file)
- **Core Functionality**: A virtual classroom with shared whiteboard, real-time chat, screen sharing simulation, and recording indicator
- **Target Users**: Students and teachers in remote learning environments

## 2. Visual & Rendering Specification

### Layout Structure
- **Desktop**: Three-column layout
  - Left sidebar (240px): Participants list
  - Center: Whiteboard canvas (flexible width)
  - Right sidebar (300px): Chat panel
- **Mobile**: Stacked layout
  - Top bar with controls
  - Whiteboard (full width)
  - Collapsible chat panel
  - Bottom toolbar

### Color Palette
- Primary: `#1a1a2e` (dark navy background)
- Secondary: `#16213e` (sidebar background)
- Accent: `#e94560` (recording indicator, highlights)
- Surface: `#0f3460` (cards, panels)
- Text Primary: `#ffffff`
- Text Secondary: `#a0a0a0`
- Canvas: `#ffffff`

### Typography
- Font Family: "Inter", system-ui, sans-serif
- Headings: 600 weight
- Body: 400 weight

### Visual Effects
- Box shadows for elevation
- Smooth transitions (200ms ease)
- Recording pulse animation (red glow)
- Screen share highlight border (dashed animated border)

## 3. Component Specification

### Header Bar
- Logo/Title
- Recording button with indicator
- Screen share button
- Connection status indicator

### Whiteboard (Canvas)
- White background
- Drawing tools: Pen, Eraser
- Color picker (preset colors)
- Stroke width selector
- Clear board button
- Touch and mouse input support
- Responsive sizing

### Participants List
- Avatar placeholder (initials)
- Name display
- Status indicator (online/offline)
- Simulated 4-5 participants

### Chat Panel
- Message history (scrollable)
- Emoji picker button
- Text input field
- Send button
- Emoji support via native input or picker

### Screen Share Simulation
- Click to activate
- Drag to select region
- Dashed animated border highlights selected area
- "Shared" badge on header
- Click again to deactivate

### Recording Indicator
- Red dot with pulse animation
- "Recording" text
- Timer display (00:00:00 format)
- Click to stop

## 4. Interaction Specification

### Whiteboard Drawing
- Mouse down: Start drawing
- Mouse move: Continue path
- Mouse up: End stroke
- Touch equivalents for mobile
- Smooth line interpolation

### Chat
- Enter key to send
- Emoji picker toggle
- Auto-scroll to new messages
- Timestamp display

### Screen Share
- Click button → enter selection mode
- Draw rectangle on canvas to select area
- ESC or click button to cancel
- Selected area highlighted with animated border

### Recording
- Click to start → timer starts, indicator pulses
- Click again to stop → indicator off, timer reset

## 5. State Management
All state managed in JavaScript objects:
- `whiteboard`: strokes array, current tool, color, strokeWidth
- `chat`: messages array (id, sender, text, timestamp)
- `participants`: array of participant objects
- `recording`: boolean, startTime
- `screenShare`: boolean, sharedRegion coordinates

## 6. Acceptance Criteria
- [ ] Whiteboard renders and accepts drawing input
- [ ] Touch drawing works on mobile
- [ ] Participants list displays with status
- [ ] Chat messages can be sent and displayed with emojis
- [ ] Screen share highlights a selected region
- [ ] Recording button shows animated indicator and timer
- [ ] UI is responsive and works on mobile screens
- [ ] No external dependencies (pure HTML/CSS/JS)
