const staticCacheName = "site-static";
const assets = [
  "/",
  "/index.html",
  "/app.js",
  "/styles.css",
  "/icons/unknown.png",
  "https://fonts.googleapis.com/css?family=Audiowide",
  "https://fonts.googleapis.com/css?family=Alfa Slab One",
];

//// install service worker
self.addEventListener("install", (evt) => {
  evt.waitUntill(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// /// activate service worker
// self.addEventListener("activate", (evt) => {
//   console.log("service worker has benn activated");
//   evt.waitUntill(
//     caches.keys().then((keys) => {
//       return Promise.all(
//         keys
//           .filter((key) => key !== staticCacheName)
//           .map((key) => caches.delete(key))
//       );
//     })
//   );
// });
/// fetch api //
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return cacheRes || fetch(evt.request);
    })
  );
});
