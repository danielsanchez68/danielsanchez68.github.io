const CACHE_STATIC_NAME = 'static-v7'
const CACHE_DYNAMIC_NAME = 'dynamic-v7'
const CACHE_INMUTABLE_NAME = 'inmutable-v7'

self.addEventListener('install', e => {
  //App SHELL : todos los recursos necesarios para que la WEBAPP funcione
  const cacheProm = caches.open(CACHE_STATIC_NAME).then(cache => {
    return cache.addAll([
      '/index.html',
      '/js/main.js',
      '/css/estilos.css'
    ])
  })

  const cacheInmutable = caches.open(CACHE_INMUTABLE_NAME).then(cache => {
    return cache.addAll([
      '/js/handlebars.min-v4.5.3.js',
      'https://code.jquery.com/jquery-3.4.1.min.js',
      'https://code.getmdl.io/1.3.0/material.min.js'
    ])
  })

  e.waitUntil(Promise.all([cacheProm, cacheInmutable]))

  console.log('sw install!!!!');
});

self.addEventListener('activate', e => {

  const cacheWhiteList = [
    CACHE_STATIC_NAME,
    CACHE_DYNAMIC_NAME,
    CACHE_INMUTABLE_NAME
  ]

  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(cache => {
          if (cacheWhiteList.indexOf(cache) === -1) {
            return caches.delete(cache)
          }
        })
      )
    })
  )

  console.log('sw activate');
});

self.addEventListener('fetch', e => {
  //console.log('sw fetch');
  //console.log(e.request)

  if (!e.request.url.includes('mockapi.io')) {

    const respuesta = caches.match(e.request).then(res => {
      if (res) {
        console.log('CACHE', e.request.url)
        return res
      }
      console.log('NO EXISTE', e.request.url)

      return fetch(e.request).then(newResp => {
        caches.open(CACHE_DYNAMIC_NAME).then(cache => {
          cache.put(e.request, newResp)
        })
        return newResp.clone()
      })
    })

    e.respondWith(respuesta)


  }
  else {
    console.log('PUENTEADA', e.request.url)
  }

});