# Dating Card Swipe App - Specification

## Project Overview
- **Project name**: Spark - Online Dating Cards
- **Type**: Interactive web app (single HTML file)
- **Core functionality**: Tinder-style card swiping for dating with smooth animations and match notifications
- **Target users**: Young adults seeking online dating experience

## Visual & Rendering Specification

### Scene Setup
- Full-screen centered card stack layout
- Gradient background with animated gradient mesh
- Floating decorative elements (hearts, sparkles)

### Color Palette
- Primary: `#FF6B6B` (coral red - like)
- Secondary: `#4ECDC4` (teal - skip)
- Accent: `#FFE66D` (yellow - highlights)
- Background: Dark gradient `#1a1a2e` to `#16213e`
- Card background: `#ffffff` with subtle shadow
- Text: `#2d3436` (dark gray)

### Typography
- Primary font: "Quicksand" (Google Fonts) - rounded, youthful
- Headings: Bold 600 weight
- Body: Regular 400 weight

### Card Design
- Rounded corners (20px)
- User photo (cover 60% height)
- Name + age overlay on photo
- Bio section below photo
- Interest tags (colored pills)
- Subtle drop shadow with gradient

## Interaction Specification

### Swipe Mechanics
- Touch/mouse drag to swipe cards left (skip) or right (like)
- Rotation proportional to horizontal drag distance (max ±15°)
- Opacity indicators appear during drag:
  - "LIKE" stamp (green) on right swipe
  - "SKIP" stamp (red) on left swipe
- Release behavior:
  - If drag > threshold (100px): card flies off screen
  - If drag < threshold: card bounces back with spring animation

### Spring Animation (Bounce-back)
- Use CSS transforms with cubic-bezier for elastic feel
- Duration: 400ms
- Scale pulse effect (1.05x) during bounce

### Button Controls
- Skip button (X icon) - bottom left
- Like button (heart icon) - bottom right
- Super like button (star icon) - center bottom

### Card Stack
- Show 3 cards stacked (top card fully visible, others peeking)
- Underneath cards scale down and offset vertically
- Next card scales up when top card is removed

## Profile Modal

### Trigger
- Tap/click on card (not drag) opens profile modal

### Modal Content
- Larger profile photo
- Full bio text
- More detailed info (location, age, interests)
- Close button (X)

### Modal Animation
- Fade in backdrop
- Scale up card from 0.8 to 1.0
- Smooth transitions

## Match Success Popup

### Trigger
- After liking, 30% chance of "match" (simulated)

### Visual
- Full-screen overlay with blur backdrop
- Two profile photos meeting in center
- "It's a Match!" title with heart animation
- Animated hearts/sparkles
- "Send Message" and "Keep Swiping" buttons

### Animation
- Photos slide in from sides
- Hearts burst animation
- Confetti effect

## User Data (Mock)
- 8 mock user profiles with:
  - Random generated names and ages (20-35)
  - Profile photos from picsum.photos
  - Short bio text
  - 3-5 interest tags each

## Technical Implementation

### Drag Detection
- Use pointer events (pointerdown, pointermove, pointerup)
- Calculate drag distance and velocity
- Threshold: 100px horizontal movement OR velocity > 0.5

### Animation
- CSS transitions for card movement
- JavaScript for drag calculations
- requestAnimationFrame for smooth rendering

### Responsive Design
- Mobile-first approach
- Cards sized to viewport (max-width: 400px)
- Touch-optimized button sizes (min 48px)

## Acceptance Criteria

1. ✓ Cards can be swiped left/right with drag gesture
2. ✓ Cards rotate during drag (proportional to distance)
3. ✓ Cards snap back with spring animation if not passed threshold
4. ✓ LIKE/SKIP stamps appear during swipe
5. ✓ Tapping card opens profile modal
6. ✓ Match popup appears on successful match
7. ✓ Card stack updates after card removal
8. ✓ Smooth 60fps animations throughout
9. ✓ Works on both desktop (mouse) and mobile (touch)
10. ✓ Visually appealing with youthful aesthetic
