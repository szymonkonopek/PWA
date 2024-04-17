// var cacheName = 'hello-pwa';
// var filesToCache = ['/', '/index.html', '/css/style.css', '/js/main.js'];

// /* Start the service worker and cache all of the app's content */
// self.addEventListener('install', function (e) {
//   e.waitUntil(
//     caches.open(cacheName).then(function (cache) {
//       return cache.addAll(filesToCache);
//     })
//   );
// });

// /* Serve cached content when offline */
// self.addEventListener('fetch', function (e) {
//   e.respondWith(
//     caches.match(e.request).then(function (response) {
//       return response || fetch(e.request);
//     })
//   );
// });

const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [
  '/PWA/',
  '/PWA/index.html',
  '/PWA/sos.html',
  '/PWA}/map.html',
  '/PWA/images/image.png',
  '/PWA/images/image-icon.png',
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener('install', (evt) => {
  //console.log('service worker installed')
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', (evt) => {
  //console.log('service worker activated')
  evt.waitUntil(
    caches.keys().then((keys) => {
      //console.log(keys)
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', (evt) => {
  //console.log('fetch event', evt)
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              // check cached items size
              limitCacheSize(dynamicCacheName, 15);
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        console.log('error');
      })
  );
});
