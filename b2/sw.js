// Service Worker for Music Stream Pro
// Handles offline caching and playback

const CACHE_NAME = 'music-stream-pro-v1';
const CACHE_VERSION = 1;

// Assets to cache on install
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/data.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.min.js'
];

// Install event - precache assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing Service Worker...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Precaching app assets');
                return cache.addAll(PRECACHE_ASSETS.map(url => new Request(url, { mode: 'no-cors' })))
                    .catch(err => {
                        console.log('[Service Worker] Some assets could not be precached:', err);
                        // Continue even if some assets fail
                        return Promise.resolve();
                    });
            })
            .then(() => {
                // Force the waiting service worker to become the active service worker
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating Service Worker...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('[Service Worker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                // Take control of all open pages
                return self.clients.claim();
            })
    );
});

// Fetch event - network first, fall back to cache
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests that aren't cached audio
    if (url.origin !== self.location.origin && !url.href.includes('soundhelix.com')) {
        event.respondWith(fetch(request));
        return;
    }

    // For audio files, try cache first, then network
    if (url.href.includes('.mp3') || url.href.includes('audio')) {
        event.respondWith(
            caches.match(request)
                .then((cached) => {
                    if (cached) {
                        console.log('[Service Worker] Serving cached audio:', url.pathname);
                        return cached;
                    }

                    return fetch(request)
                        .then((response) => {
                            // Check if valid response
                            if (!response || response.status !== 200 || response.type !== 'basic') {
                                return response;
                            }

                            // Clone the response
                            const responseToCache = response.clone();

                            // Add to cache
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(request, responseToCache);
                                });

                            return response;
                        })
                        .catch(() => {
                            // Return a custom offline response
                            return new Response('Audio not available offline');
                        });
                })
        );
        return;
    }

    // For app assets, use Cache First strategy
    if (url.origin === self.location.origin) {
        event.respondWith(
            caches.match(request)
                .then((cached) => {
                    if (cached) {
                        return cached;
                    }

                    return fetch(request)
                        .then((response) => {
                            // Check if valid response
                            if (!response || response.status !== 200 || response.type !== 'basic') {
                                return response;
                            }

                            // Clone the response
                            const responseToCache = response.clone();

                            // Add to cache
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(request, responseToCache);
                                });

                            return response;
                        })
                        .catch((error) => {
                            console.log('[Service Worker] Fetch failed:', error);
                            throw error;
                        });
                })
        );
        return;
    }

    // For all other requests, use Network First strategy
    event.respondWith(
        fetch(request)
            .then((response) => {
                // Check if valid response
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                // Clone the response
                const responseToCache = response.clone();

                // Add to cache
                caches.open(CACHE_NAME)
                    .then((cache) => {
                        cache.put(request, responseToCache);
                    });

                return response;
            })
            .catch(() => {
                // If network fails, try cache
                return caches.match(request)
                    .then((cached) => {
                        if (cached) {
                            return cached;
                        }

                        // Return custom offline page for HTML requests
                        if (request.headers.get('accept').includes('text/html')) {
                            return caches.match('/index.html');
                        }

                        throw new Error('No cached version available');
                    });
            })
    );
});

// Sync event - handle background sync (for future implementation)
self.addEventListener('sync', (event) => {
    console.log('[Service Worker] Background sync:', event.tag);

    if (event.tag === 'sync-playlist') {
        event.waitUntil(
            // Future: sync playlist with server
            Promise.resolve()
        );
    }
});

// Push event - handle push notifications (for future implementation)
self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push received');

    const options = {
        body: event.data ? event.data.text() : 'New track added to collaborative playlist',
        icon: '/icon.png',
        badge: '/badge.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Music Stream Pro', options)
    );
});

// Message event - handle messages from clients
self.addEventListener('message', (event) => {
    console.log('[Service Worker] Message received:', event.data);

    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then((cache) => {
                    return cache.addAll(event.data.urls);
                })
        );
    }

    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Log service worker state changes
self.addEventListener('controllerchange', () => {
    console.log('[Service Worker] Controller changed');
    // Notify all clients to reload
    self.clients.matchAll({
        type: 'window'
    }).then((clients) => {
        clients.forEach((client) => {
            client.postMessage({
                type: 'SERVICE_WORKER_UPDATED'
            });
        });
    });
});

console.log('[Service Worker] Service Worker script loaded');
