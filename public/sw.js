let cachedData = "appv1";
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cachedData).then((cache) => {
      cache
        .addAll([
          // "/src/main.jsx",
          // "/node_modules/.vite/deps/react.js",
          // "/node_modules/.vite/deps/react-dom_client.js",
          // "/src/App.jsx",
          // "/src/index.css",
          // "/src/swDev.js",
          // "/node_modules/.vite/deps/chunk-LHNGGKKR.js",
          // "/node_modules/.vite/deps/chunk-P2LSHJDD.js",
          // "/src/api/fetchWeather.js",
          // "/src/hooks/useIsOnline.js",
          // "/node_modules/.vite/deps/axios.js",
          // "/bg.webp",
          // "/logo.png",
          // "/index.html",
          // "/",
          "/index.html",
          "/",
          "/sw.js",
          "/manifest.json",
          "/logo.png",
          "/bg.webp",
          "/assets/index-BTSWXGYN.css",
          "/assets/index-DyjXWagk.js",
        ])
        .catch(async (error) => {
          console.error("Failed to add data to cache:", await error);
          console.log("failed request:", await error.request);
        });
    })
  );
});

// Fetch event
// this.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches
//       .match(event.request)
//       .then((resp) => {
//         // If the response exists in the cache, return it
//         if (resp) {
//           return resp;
//         }
//         // If the response is not in the cache, fetch it from the network
//         return fetch(event.request);
//       })
//       .catch((err) => console.warn("err", err))
//   );
// });

// Activate event
// self.addEventListener("activate", function (event) {
//   event.waitUntil(self.clients.claim());
// });

this.addEventListener("activate", (event) => {
  if (navigator.onLine) {
    event.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== cachedData) {
              return caches.delete(key);
            }
          })
        );
      })
    );
  }
});

// Fetch event
this.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
