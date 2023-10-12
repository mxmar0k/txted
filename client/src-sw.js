const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// i changed all this so bear with me
// we precache and route URLs from the __WB_MANIFEST
precacheAndRoute(self.__WB_MANIFEST);

// we create a CacheFirst strategy for pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    // the cache responses with status codes 0 and 200
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // we set an expiration for the cached pages (30 days)
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// we warm the page cache for specific URLs
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// then we register a route to handle navigation requests using the page cache strategy
registerRoute(
  ({ request }) => request.mode === 'navigate',
  pageCache
);

// this is the adapted asset caching with StaleWhileRevalidate strategy based on destination, this is what i changed because it didnt work with the first strategy
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'asset-cache', // Set a cache name for assets
    plugins: [
      // Cache responses with status codes 0 and 200
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      // Set an expiration for the cached assets (7 days)
      new ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
      })
    ],
  })
);
