# PWA Icons & Branding Assets

This directory contains the icons and assets required for the Progressive Web App (PWA) manifest, social sharing, and site branding.

## Overview

When building a modern web application, you need multiple icon formats and sizes to support:

1. **Web App Manifest** - Icons displayed when users install your PWA on their device (home screen, app drawer)
2. **Favicon** - Small icon shown in browser tabs and bookmarks
3. **Open Graph (OG) Images** - Social media preview when your site is shared on Facebook, Twitter, LinkedIn, etc.
4. **Maskable Icons** - Adaptive icons for Android that work with various OS-level masks (circles, rounded squares, squircles)

### Why Multiple Icon Sizes?

Different platforms and contexts require different icon dimensions:

- **Small displays** (tabs, bookmarks): 16x16, 32x32 px
- **Mobile home screen**: 192x192 px (standard), 512x512 px (high-res)
- **Social media previews**: 1200x630 px (OG image)
- **Maskable icons**: Must work with system-applied masks on Android devices

This directory contains the icons required for the Progressive Web App (PWA) manifest.

## Required Icons

You need to generate the following icon files from the source image `src/assets/favicons/streamline-color-earth-airplane-flat.svg` or `.png`:

### For PWA Manifest (Device Installation)

1. **icon-192.png** - 192x192 pixels (standard resolution)
2. **icon-512.png** - 512x512 pixels (high resolution)
3. **icon-192-maskable.png** - 192x192 pixels with safe zone padding (Android adaptive icons)
4. **icon-512-maskable.png** - 512x512 pixels with safe zone padding (Android adaptive icons)

### For Traditional Favicon

5. **favicon.ico** - 32x32 pixels (or multi-resolution ICO)
6. **favicon-16x16.png** - 16x16 pixels
7. **favicon-32x32.png** - 32x32 pixels

### For Social Media (Open Graph)

8. **og-image.png** - 1200x630 pixels (ideal aspect ratio 1.91:1 for Facebook, Twitter, LinkedIn)

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

**What are maskable icons?**

Maskable icons are designed specifically for Android devices that support adaptive icons. Instead of displaying your icon in a square, Android can apply various masks (circles, rounded squares, squircles, etc.) to your app icon.

To ensure your icon looks good under any mask, maskable icons include extra padding called the "safe zone":

- The safe zone is typically **80% of the canvas** (10% padding on all sides)
- Critical design elements must fit within this safe zone
- The outer 20% may be clipped by the OS mask, but that's okay—it's meant to be flexible

**Why use maskable icons?**

- Modern Android devices expect adaptive icons (Android 8.0+)
- Provides a more cohesive, branded app experience across the device
- Ensures your icon looks professional with any OS-applied shape

**Web App Manifest Format:**

In your `manifest.json`, specify both standard and maskable versions:

```json
{
  "icons": [
    {
      "src": "/images/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/images/icons/icon-192-maskable.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/images/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/images/icons/icon-512-maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

Maskable icons are designed to work with adaptive icons on Android devices. They include extra padding (safe zone) so that when the OS applies a mask (circle, square, rounded square, etc.), the important parts of your icon remain visible.

The safe zone is typically 80% of the canvas, meaning 10% padding on all sides.

## Testing

After generating the icons:

1. **PWA Manifest Icons:**
   - Build and deploy the site
   - Open Chrome DevTools > Application > Manifest
   - Check that all icons are loading correctly
   - Try installing the PWA on a mobile device to verify icons display properly

2. **Favicon:**
   - Check browser tab to see favicon appears
   - Clear browser cache if favicon doesn't update immediately
   - Test in multiple browsers (Chrome, Firefox, Safari)

3. **OG Images:**
   - Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to test OG image preview
   - Use [Twitter Card Validator](https://cards-dev.twitter.com/validator) for Twitter previews
   - Share your site on social media platforms and check preview appearance

4. **Maskable Icons:**
   - Use [Maskable.app](https://maskable.app) to test how your maskable icons look with different shapes
   - Install PWA on Android device to see adaptive icon in action

## Current Status

⚠️ **Icons not yet generated** - You need to create these icons before the PWA will be fully functional.

**Required actions:**

- [ ] Generate favicon assets (favicon.ico, favicon-16x16.png, favicon-32x32.png)
- [ ] Generate PWA manifest icons (icon-192.png, icon-512.png)
- [ ] Generate maskable icons (icon-192-maskable.png, icon-512-maskable.png)
- [ ] Generate OG image (og-image.png at 1200x630px)
- [ ] Update manifest.json with icon references
- [ ] Update HTML head with favicon and OG meta tags
- [ ] Test all assets across browsers and devices
