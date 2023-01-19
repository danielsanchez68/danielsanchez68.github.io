const CACHE_STATIC_NAME = 'static-v12'
const CACHE_INMUTABLE_NAME = 'inmutable-v12'
const CACHE_DYNAMIC_NAME = 'dynamic-v12'

const CON_CACHE = true

self.addEventListener('install', e => {
    console.log('---> sw install!')

    //skip waiting automático
    self.skipWaiting()

    //const cache = caches.open('cache-1').then( cache => {
    const cacheStatic = caches.open(CACHE_STATIC_NAME).then( cache => {
        //console.log(cache)

        // Guardo los recursos de la APP SHELL (son los necesarios para que la web sea funcional)
        return cache.addAll([
            '/index.html',
            '/css/estilos.css',
            '/js/main.js',
            '/js/api.js',
            '/plantillas/plantilla-lista.hbs',
            '/images/super.jpg',
        ]).catch(error => console.error('Error en install:', error.message))
    })

    const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME).then( cache => {
        //console.log(cache)

        // Guardo los recursos de la APP SHELL (son los necesarios para que la web sea funcional)
        return cache.addAll([
            'https://code.jquery.com/jquery-3.6.3.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js',
            'https://code.getmdl.io/1.3.0/material.min.js',
            'https://code.getmdl.io/1.3.0/material.indigo-pink.min.css'
        ]).catch(error => console.error('Error en install:', error.message))
    })

    /* Con waitUntil espero que todas la operciones asincrónicas culminen */
    //e.waitUntil(cache)
    e.waitUntil( Promise.all([cacheStatic, cacheInmutable]) )
})


self.addEventListener('activate', e => {
    console.log('---> sw activate')

    const cacheWhiteList = [
        CACHE_STATIC_NAME,
        CACHE_INMUTABLE_NAME, 
        CACHE_DYNAMIC_NAME,
    ]

    // Borro todos los caches que NO están en la lista actual (versión actual)
    e.waitUntil(
        caches.keys().then( nombres => {
            return Promise.all(
                nombres.map( nombre => {
                    if(!cacheWhiteList.includes(nombre)) {
                        return caches.delete(nombre)
                    }
                })
            )
        })
    )
})


self.addEventListener('fetch', e => {
    //console.log('sw fetch!!!!')

    if(CON_CACHE) {
        let { url, method } = e.request     // destructuring object
        //console.log(method, url)

        if(method == 'GET' && !url.includes('mockapi.io')) {
            const respuesta = caches.match(e.request).then( res => {
                if(res) {
                    console.log('EXISTE: el recurso en el cache', url)
                    return res
                }
                console.error('NO EXISTE: el recurso en el cache', url)

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
            console.warn('BYPASS', method, url)
        }
    }
})
