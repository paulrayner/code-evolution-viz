# CodeCohesion Viewer

Interactive 3D visualization for code cohesion analysis with timeline evolution playback.

## Setup

```bash
npm install
```

## Usage

1. First, run the processor to generate data:
   ```bash
   cd ../processor
   npm install
   npm run dev -- /path/to/repo
   ```

2. Copy the generated JSON to the viewer:
   ```bash
   cp ../processor/output/repo-data.json ./public/data/
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

## Controls

- **Left-click + drag**: Rotate camera
- **Right-click + drag**: Pan camera
- **Scroll**: Zoom in/out
- **Click on file**: Show details

## Building for Production

```bash
npm run build
npm run preview
```

The built files will be in `dist/`.
