self.addEventListener('install', e => {
    console.log('sw install')
})

self.addEventListener('activate', e => {
    console.log('sw activate')
})

self.addEventListener('fetch', e => {
    console.log('sw fetch')

    console.log(e.request.url)
})
