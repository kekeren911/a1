# Canvas Image Editor - Specification

## Project Overview
- **Project Name**: Canvas Image Editor
- **Type**: Interactive web application (single HTML file)
- **Core Functionality**: A touch-friendly image editor supporting crop, rotate, and text watermark with PNG export
- **Target Users**: Mobile and desktop users who need quick image editing

## Visual & Rendering Specification

### Layout
- Full-screen canvas editor with bottom toolbar
- Floating control panels for each tool
- Responsive design adapting to mobile/desktop

### Color Palette
- Background: `#1a1a1a` (dark)
- Panel: `#2d2d2d` with subtle border `#404040`
- Primary accent: `#4a9eff` (blue)
- Secondary accent: `#ff6b4a` (orange for destructive actions)
- Text: `#ffffff`

### Typography
- Font: "DM Sans", system-ui, sans-serif
- Toolbar icons: Inline SVG

## Interaction Specification

### Tools
1. **Import**: Load image from file input or drag-drop
2. **Crop**: Drag handles to define crop area, apply crop
3. **Rotate**: 90° clockwise/counter-clockwise buttons
4. **Watermark**: Add text with position selector and font size
5. **Export**: Download edited image as PNG

### Touch/Mouse Controls
- Touch: pinch-to-zoom on crop handles, single finger drag for selection
- Mouse: standard click-drag for crop handles
- All buttons have minimum 44px touch targets

## Canvas Implementation

### Image Rendering
- Main canvas scales to fit viewport while maintaining aspect ratio
- Transform matrix for rotation operations
- Compositing for watermark text overlay

### Crop Tool
- 4 corner handles + 4 edge handles
- Semi-transparent overlay outside crop area
- Live preview of crop bounds

### Rotation
- 90° increments (clockwise/counter-clockwise)
- Uses canvas rotate transform
- Recalculates canvas dimensions on 90° rotation

### Watermark
- Draggable text position (9-point grid: top-left, top-center, top-right, etc.)
- Adjustable font size (16px - 72px)
- White text with subtle shadow for visibility
- Semi-transparent background option

## Export
- `canvas.toDataURL('image/png')` for PNG export
- Filename: `edited-image-{timestamp}.png`

## Acceptance Criteria
1. Image loads via file input or drag-drop
2. Crop selection can be adjusted via touch/mouse handles
3. Rotation works in 90° steps with proper dimension handling
4. Watermark text renders at selected position with chosen size
5. Export produces valid PNG file
6. UI is usable on 320px-1440px viewport widths
7. All touch targets meet 44px minimum
