// service-worker.js

// Cache name
const CACHE_NAME = 'offline-cache';

// Files to cache
const URLS_TO_CACHE = [
    '/ords/CLIENTWORKSPACE/CUSTOMER_AEC', // Aapka API endpoint
    // Yahan aur URLs daal sakte hain jo aap cache karna chahte hain
];

// Install event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/ords/CLIENTWORKSPACE/CUSTOMER_AEC')) {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request).then((response) => {
                    let responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                    return response;
                });
            })
        );
    }
});
