# Scientific Calculator - SPEC.md

## 1. Project Overview

- **Project Name**: SciCalc Pro
- **Type**: Interactive Web Application (Single HTML File)
- **Core Functionality**: Advanced scientific calculator with Shunting-yard algorithm, function plotting, and multi-theme support
- **Target Users**: Students, engineers, mathematicians needing complex calculations

---

## 2. Visual & Rendering Specification

### Layout Structure
- **Header**: App title with theme switcher (top-right)
- **Main Area**:
  - Calculator section (left/main)
  - History log panel (right sidebar, collapsible on mobile)
- **Graph Section**: Full-width canvas below calculator for function plotting

### Responsive Breakpoints
- Desktop (>1024px): Side-by-side calculator + history
- Tablet (768-1024px): Stacked layout, history below
- Mobile (<768px): Full-width calculator, slide-out history

### Color Themes

#### Light Theme
- Background: `#f5f5f7`
- Calculator body: `#ffffff` with subtle shadow
- Display: `#1a1a2e` text on `#e8e8e8`
- Buttons: Numbers `#ffffff`, Operators `#4a90d9`, Functions `#6c5ce7`, equals `#2ecc71`
- Button hover: 10% darker

#### Dark Theme
- Background: `#1a1a2e`
- Calculator body: `#16213e` with glow effect
- Display: `#eaeaea` text on `#0f0f23`
- Buttons: Numbers `#2d2d44`, Operators `#e17055`, Functions `#a29bfe`, equals `#00b894`
- Accent glow: `rgba(74, 144, 217, 0.3)`

#### Retro Theme
- Background: `#2c2c2c`
- Calculator body: `#3d3d3d` with wood-grain texture gradient
- Display: `#33ff33` text on `#1a1a1a` (classic LCD green)
- Buttons: Beige `#d4c4a8` with brown `#8b7355` text
- Font: `'Courier New', monospace` for display

### Typography
- Display font: `'JetBrains Mono', 'SF Mono', monospace`
- Button font: `'DM Sans', system-ui, sans-serif`
- Display size: 2rem (expression), 3rem (result)

---

## 3. Calculator Specification

### Button Layout (6 rows × 8 columns)

```
[ 2nd ] [ deg/rad ] [ ( ] [ ) ] [ % ] [ C ] [ ⌫ ] [ ÷ ]
[  x²  ] [ x³ ]     [ 7 ] [ 8 ] [ 9 ] [ × ] [ sin ] [ cos ]
[  √   ] [ ^  ]     [ 4 ] [ 5 ] [ 6 ] [ - ] [ tan ] [ log ]
[  1/x ] [ |x| ]    [ 1 ] [ 2 ] [ 3 ] [ + ] [ asin] [ acos]
[  π   ] [ e  ]     [ 0 ] [ . ] [ ± ] [ = ] [ atan] [ ln ]
[  plot ] [ history ] [ EXP ] [ ANS ] [ history...]
```

### Scientific Functions
- Trigonometric: `sin`, `cos`, `tan`, `asin`, `acos`, `atan`
- Logarithmic: `log` (base 10), `ln` (natural log)
- Power/Root: `x²`, `x³`, `√`, `^` (power)
- Constants: `π` (3.14159265359), `e` (2.71828182846)
- Other: `1/x`, `|x|` (abs), `EXP` (scientific notation), `ANS` (last answer)

### Shunting-yard Algorithm Implementation

#### Token Types
- NUMBER: Real numbers (including scientific notation)
- OPERATOR: `+`, `-`, `*`, `/`, `^`
- FUNCTION: `sin`, `cos`, `tan`, `log`, `ln`, `sqrt`, `abs`, `asin`, `acos`, `atan`
- CONSTANT: `pi`, `e`
- LPAREN: `(`
- RPAREN: `)`

#### Operator Precedence
1. `^` (right-associative)
2. `*`, `/`
3. `+`, `-`
4. Functions bind tightest

#### Algorithm Steps
1. **Tokenize**: Split input into tokens (handle multi-char functions, negative numbers)
2. **Shunting-yard**: Convert infix to Reverse Polish Notation (RPN)
3. **Evaluate**: Process RPN queue using stack

### Error Handling
- Division by zero: Display "Cannot divide by zero"
- Invalid expression: Display "Invalid expression"
- Domain errors (e.g., log of negative): Display "Domain error"
- Overflow: Display "Number too large"
- Syntax errors: Display "Syntax error"

---

## 4. History Log Specification

### Features
- Store last 50 calculations
- Each entry shows: Expression → Result
- Click entry to reload into display
- Clear history button
- Persist to localStorage

### Display
- Scrollable list with fade gradient at top
- Each entry: Monospace font, truncated if >30 chars
- Hover: Highlight background, show full expression tooltip

---

## 5. Function Plotter Specification

### Input
- Parse expressions like `y = x^2`, `y = sin(x)`, `y = log(x)`
- Support: `x`, numbers, `+`, `-`, `*`, `/`, `^`, `sin`, `cos`, `tan`, `log`, `ln`, `sqrt`, `abs`

### Canvas Rendering
- Canvas size: 100% width × 400px height
- Coordinate system: Center-origin, auto-scaling
- Grid: Light gray lines every 1 unit (scaled)
- Axes: Darker lines with arrow markers
- Function curve: Smooth line, theme-colored
- Viewport: Auto-fit function with padding

### Controls
- Input field for function expression
- "Plot" button
- Zoom in/out buttons
- Reset view button

---

## 6. Keyboard Support

### Key Mappings
```
0-9, .        → Number input
+, -, *, /    → Operators
Enter, =      → Calculate
Backspace     → Delete last character
Escape, C     → Clear
(, )          → Parentheses
^             → Power
h             → Toggle history
p             → Focus plot input
t             → Cycle themes
```

### Scientific Function Keys
```
s             → sin
c             → cos
t             → tan (when not in expression)
l             → log
n             → ln
r             → sqrt
```

---

## 7. Acceptance Criteria

1. ✅ All basic arithmetic works with correct precedence
2. ✅ sin(30°) = 0.5 (in degree mode)
3. ✅ log(100) = 2
4. ✅ y = x^2 plots correctly as parabola
5. ✅ Theme switching works instantly
6. ✅ History persists across page reloads
7. ✅ Keyboard shortcuts work
8. ✅ Division by zero shows proper error
9. ✅ Responsive layout works on all screen sizes
10. ✅ No console errors
