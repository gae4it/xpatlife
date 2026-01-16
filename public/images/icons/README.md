# PWA Icons

This directory contains the icons required for the Progressive Web App (PWA) manifest.

## Required Icons

You need to generate the following icon files from the source image `src/assets/favicons/streamline-color-earth-airplane-flat.svg` or `.png`:

### Standard Icons (with transparent background)

1. **icon-192.png** - 192x192 pixels
2. **icon-512.png** - 512x512 pixels

### Maskable Icons (with safe zone padding)

3. **icon-192-maskable.png** - 192x192 pixels (with padding)
4. **icon-512-maskable.png** - 512x512 pixels (with padding)

## How to Generate Icons

### Option 1: Using Online Tools

1. Go to [Maskable.app](https://maskable.app/editor)
2. Upload your source icon (`streamline-color-earth-airplane-flat.png` or `.svg`)
3. Adjust the icon to fit within the safe zone (80% of canvas)
4. Export as maskable icons in both sizes
5. Also export standard versions without the extra padding

### Option 2: Using ImageMagick (Command Line)

```bash
# Standard icons (transparent background)
magick convert streamline-color-earth-airplane-flat.png -resize 192x192 icon-192.png
magick convert streamline-color-earth-airplane-flat.png -resize 512x512 icon-512.png

# Maskable icons (add padding for safe zone)
magick convert streamline-color-earth-airplane-flat.png -resize 154x154 -gravity center -extent 192x192 -background transparent icon-192-maskable.png
magick convert streamline-color-earth-airplane-flat.png -resize 410x410 -gravity center -extent 512x512 -background transparent icon-512-maskable.png
```

### Option 3: Using PWA Asset Generator

```bash
npm install -g pwa-asset-generator
pwa-asset-generator path/to/streamline-color-earth-airplane-flat.png ./public/images/icons --icon-only --maskable
```

## Maskable Icons Explained

Maskable icons are designed to work with adaptive icons on Android devices. They include extra padding (safe zone) so that when the OS applies a mask (circle, square, rounded square, etc.), the important parts of your icon remain visible.

The safe zone is typically 80% of the canvas, meaning 10% padding on all sides.

## Testing

After generating the icons:

1. Build and deploy the site
2. Open Chrome DevTools > Application > Manifest
3. Check that all icons are loading correctly
4. Use [Maskable.app](https://maskable.app) to test how your maskable icons look with different shapes

## Current Status

⚠️ **Icons not yet generated** - You need to create these 4 icon files before the PWA will be fully functional.
