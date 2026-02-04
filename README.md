# Premium Scrollytelling Site

A high-performance scroll-linked image sequence built with Next.js 14 and Canvas.

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run locally**
   ```bash
   npm run dev
   ```

3. **Visit**
   http://localhost:3000

## Project Structure

- `components/`: Core UI components.
  - `ScrollSequence.tsx`: Handles the sticky canvas and efficient 60fps drawing.
  - `TextOverlays.tsx`: Manages copy animations.
  - `LoadingScreen.tsx`: Preload UI.
- `hooks/`: Custom hooks for logic.
  - `useCanvasImages.ts`: Optimizes image preloading.
- `config.ts`: Central configuration for all assets and copy.

## Customization

### Frames
Replace images in `public/sequence/`. Ensure they follow the naming convention `ezgif-frame-XXX.jpg` (001-180).
Update count in `config.ts`.

### Copy
Edit `COPY_DATA` in `config.ts` to change text, alignment, and timing.
