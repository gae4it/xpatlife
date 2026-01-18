// Minimal Service Worker for PWA installation
// This enables the app to be installable on Android/Chrome
// No caching - just the bare minimum required for PWA

self.addEventListener('install', () => {
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
  const { request } = event;
  const url = new URL(request.url);
  
  // For external images and resources, just pass through with proper handling
  if (url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') {
    event.respondWith(
      fetch(request, { mode: 'cors', credentials: 'omit' })
        .catch(() => {
          // If fetch fails, just try again without special handling
          return fetch(request);
        })
    );
  } else {
    // For local requests, just pass through
    event.respondWith(fetch(request));
  }
});
