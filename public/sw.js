// Minimal Service Worker for PWA installation
// This enables the app to be installable on Android/Chrome
// No caching - just the bare minimum required for PWA

self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
  // Claim all clients immediately
  event.waitUntil(self.clients.claim());
});

// Minimal fetch handler with proper error handling
self.addEventListener('fetch', (event) => {
  // For external requests (like images from unsplash), just pass through
  event.respondWith(
    fetch(event.request).catch(() => {
      // If fetch fails, return the original request error
      // Don't try to serve offline content
      return fetch(event.request);
    })
  );
});
