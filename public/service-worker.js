// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open('v1').then((cache) => {
//       return cache.addAll([
//         '/',
//         '/index.html',
//         '/static/js/bundle.js',
//         // Add other assets you want to cache
//       ]);
//     })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });