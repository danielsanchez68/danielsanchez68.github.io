self.addEventListener('install', e => {
    console.log('sw install')
})

self.addEventListener('activate', e => {
    console.log('activate')
})

self.addEventListener('fetch', e => {
    console.log('sw fetch')
    console.log('Method: ', e.request.method)
    console.log('URL: ', e.request.url)
})
