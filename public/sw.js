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

// Minimal fetch handler - just pass through to network
self.addEventListener('fetch', (event) => {
  // Just fetch from network, no caching
  event.respondWith(fetch(event.request));
});
