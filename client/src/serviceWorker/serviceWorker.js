const CACHE_NAME = "sw-cache-v1";

const STATIC_ASSETS = [
  '/',
  '/index.html',
  // '/app.js',
];

async function fetchAssets(type) {
  const response = await fetch('/'); // You could make a request to the root
  const text = await response.text();

  const assets = [];
  let regex;

  // Dynamically generate regex based on asset type
  if (type === 'css') {
    regex = /href="([^"]+\.css)"/g; // Match CSS files by href attributes
  } else if (type === 'js') {
    regex = /src="([^"]+\.js)"/g; // Match JS files by src attribute
  }

  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(text))) {
    assets.push(match[1]); // Add matched asset URLs
  }

  return assets;
}

self.addEventListener('install', (event) => {
  console.log('install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async cache => {
        await cache.addAll(STATIC_ASSETS);

        let jsFiles = await fetchAssets('js'); // This is a custom function
        jsFiles = jsFiles.filter(file => file !== '/serviceWorker.js');
        console.log('jsfiles', jsFiles);
        await cache.addAll(jsFiles);
      }
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  try {
    console.log('fetch', event);
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  } catch (err) {
    console.log('failed to fetch', err);
  }
});
