const version = "1.0.0";
const cacheName = `miappuser-${version}`;
self.addEventListener('install' , e => {
    console.log('sw install');
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/js/main.js'
            ])
            .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate',event => {
    console.log('sw activate')
    event.waitUntil(self.clients.claim());
})

self.addEventListener('fetch', event => {
    console.log('sw fetch');
    event.respondWith(
        caches.open(cacheName)
        .then(cache => cache.match(event.request, {ignoreSearch: true}))
        .then( response => {
            return response || fetch(event.request);
        })
    );
});


