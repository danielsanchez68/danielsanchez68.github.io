const CACHE_STATIC_NAME = 'static-v6'
const CACHE_INMUTABLE_NAME = 'inmutable-v6'
const CACHE_DYNAMIC_NAME = 'dynamic-v6'

self.addEventListener('install', e => {
    console.log('sw install!!')
    // -----------------------------------------------------------------
    // Guardar recursos de la APP SHELL en el cache (static e inmutable)
    // -----------------------------------------------------------------
    //e.waitUntil(
        //caches.open('cache-1').then(cache => {
    const cacheStatic = caches.open(CACHE_STATIC_NAME).then(cache => {
        //RECURSOS DE LA APP SHELL (indispensables para el funcionamiento de la AWP en forma OFFLINE)
        return cache.addAll([
            '/index.html',
            '/css/estilos.css',
            '/js/main.js',
            '/plantilla-lista.hbs',
            '/images/super.jpg'
        ])
    })//)

    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME).then(cache => {
        return cache.addAll([
            '/js/handlebars-v4.5.3.js',
            'https://code.getmdl.io/1.3.0/material.indigo-pink.min.css',
            'https://code.getmdl.io/1.3.0/material.min.js',
            'https://code.jquery.com/jquery-3.4.1.min.js'
        ])
    })

    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]))

})

self.addEventListener('activate', e => {
    console.log('sw activate!')
    // -------------------------
    // Borro los caches antiguos
    // -------------------------
    const cacheWhiteList = [
        CACHE_STATIC_NAME,
        CACHE_INMUTABLE_NAME,
        CACHE_DYNAMIC_NAME 
    ]

    e.waitUntil(
        caches.keys().then( keys => {
            console.log(keys)
            return Promise.all(
                keys.map(cache => {
                    //if(cacheWhiteList.indexOf(cache) === -1) {
                    if(!cacheWhiteList.includes(cache)) {
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', e => {
    //console.log('sw fetch!!')
    //console.log(e.request)

    // -------------------------------------------------------------------
    // Guardar recursos dinámicos en el cache (excepto los de la Api-REST)
    // -------------------------------------------------------------------
    if(e.request.method == 'GET' && !e.request.url.includes('mockapi.io')) {
        const respuesta = caches.match(e.request).then( res => {
            if(res) {
                console.log('EXISTE', e.request.url)
                return res
            }
            console.log('NO EXISTE', e.request.url)
            return fetch(e.request).then( nuevaRespuesta => {
                caches.open(CACHE_DYNAMIC_NAME).then( cache => {
                    cache.put(e.request, nuevaRespuesta)
                })
                return nuevaRespuesta.clone()
            })
        })

        e.respondWith(respuesta)
    }
    else {
        console.log('BYPASS', e.request.method, e.request.url)
    }
})

self.addEventListener('push', e => {
    console.log('push!')
    console.log(e)
})
