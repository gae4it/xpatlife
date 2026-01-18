// Minimal Service Worker for PWA installation
// This enables the app to be installable on Android/Chrome
// No fetch handling - just install/activate to allow app installation

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
