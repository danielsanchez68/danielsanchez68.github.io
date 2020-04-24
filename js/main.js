//console.log('Super Lista')

// ----------------------------------------------------
//  VARIABLES GLOBALES
// ----------------------------------------------------
let iniRenderLista = true
let ul
let listaProductos = [/* 
    { nombre: 'Pan', cantidad: 2, precio: 12.34 },
    { nombre: 'Carne', cantidad: 3, precio: 34.56 },
    { nombre: 'Leche', cantidad: 4, precio: 56.78 },
    { nombre: 'Fideos', cantidad: 5, precio: 65.43 }
 */]


// ----------------------------------------------------
//  DECLARACION DE FUNCIONES
// ----------------------------------------------------

//------------------------------------------------------
//  API REST (get, post, put y delete)
//------------------------------------------------------
function getURL() {
    return 'https://5c8ef17a3e557700145e85c7.mockapi.io/lista'
}

//-----------------------------
//           get
//-----------------------------
function obtenerProductos(cb) {
    let url = getURL()// + 'dsvsdggsdgsdghsahfhfsdahads'
    $.ajax({url: url, method:'get'})
    .then(function(prod){
        if(cb) cb(prod)
    })
    .catch(function(error){
        console.log('ERROR AJAX - GET', error)
        leerListaProductos()
        cb(listaProductos)
    })    
    /*
    $.get(url, prods => {
        //console.log(prods)
        if(cb) cb(prods)
    })
    .fail( error => {
        console.log('ERROR AJAX - GET', error)
        leerListaProductos()
        cb(listaProductos)
    })
    */
}

//-----------------------------
//           post
//-----------------------------
function guardarProducto(producto, cb) {
    let url = getURL()

    $.ajax({url: url, data: producto, method:'post'})
    .then(function(prod){
        //console.log(prods)
        if(cb) cb(prod)
    })
    .catch(function(error){
        console.log('ERROR AJAX - POST', error)
    })    
    /*
    $.post(url, producto, prod => {
        //console.log(prods)
        if(cb) cb(prod)
    })
    .fail( error => {
        console.log('ERROR AJAX - POST', error)
    })
    */
}

//-----------------------------
//           delete
//-----------------------------
function borrarProducto(id, cb) {
    let url = getURL() + '/' + id
    $.ajax({url: url, method:'delete'})
    .then(function(prod){
        if(cb) cb(prod)
    })

    .catch(function(error){
        console.log('ERROR AJAX - DELETE', error)
    })
}

//-----------------------------
//           put
//-----------------------------
function actualizarProducto(id, prod, cb) {
    let url = getURL() + '/' + id
    $.ajax({url: url, method:'put', data: prod})
    .then(function(prod){
        if(cb) cb(prod)
    })
    .catch(function(error){
        console.log('ERROR AJAX - PUT', error)
    })
}
//--------------------------------------------

//------------------------------------------------------
//  LocalStorage
//------------------------------------------------------
function guardarListaProductos() {
    let prodStr = JSON.stringify(listaProductos)
    localStorage.setItem('lista', prodStr)
}

function leerListaProductos() {
    if(localStorage.getItem('lista')) {
        listaProductos = JSON.parse(localStorage.getItem('lista'))
        //console.log(listaProductos)
    }
    else listaProductos = []
}
//--------------------------------------------


function configurarListeners() {
    $('#btn-entrada-producto').click( () => {
        let input = $('#ingreso-producto')
        let producto = input.val()
        if (producto != '') {
            console.log(producto)

            let prod = {
                nombre: producto,
                cantidad: 1,
                precio: 0
            }
            guardarProducto(prod, prod => {
                renderLista()
                input.val('')
            }) 
        }
    })

    $('#btn-borrar-productos').click(() => {
        listaProductos = []
        renderLista()
    })
}

function borrarProd(id) {
    borrarProducto(id, prod => {
        console.log(prod)
        //listaProductos.splice(index, 1)
        renderLista()
    })
}

function cambiarCantidad(id, e) {
    let cantidad = Number(e.value)
    let index = listaProductos.findIndex( prod => prod.id == id)
    //console.log(id, index)
    let prod = listaProductos[index]
    prod.cantidad = cantidad
    actualizarProducto(id, prod, prod => {
        console.log(prod)
        guardarListaProductos()
    })
}

function cambiarPrecio(id, e) {
    let precio = Number(e.value)
    let index = listaProductos.findIndex( prod => prod.id == id)
    //console.log(id, index)
    let prod = listaProductos[index]
    prod.precio = precio
    actualizarProducto(id, prod, prod => {
        console.log(prod)
        guardarListaProductos()
    })
}

function renderLista() {

    obtenerProductos(prods => {
        listaProductos = prods
        guardarListaProductos()

        $.get('plantilla-lista.hbs', source => {
            //console.log(source)
            const template = Handlebars.compile(source)
            const data = {listaProductos}
            $('#lista').html(template(data))

            let ul = $('#contenedor-lista')
            componentHandler.upgradeElements(ul)
        })
    })
}

function configurarSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => {
                //console.log('service worker registrado exitosamente', reg)
            })
            .catch(err => {
                console.log('ERROR! registro service worker', err)
            })
    }
}

function start() {
    configurarListeners()
    renderLista()
    configurarSW()
}

// ----------------------------------------------------
//  EJECUCION
// ----------------------------------------------------
//start()
//window.onload = start
//document.addEventListener('DOMContentLoaded', start)
$(document).ready(start)

// ----------------------------------------------------
// CACHES PRUEBA
// https://caniuse.com/#search=caches
// ----------------------------------------------------
if(false) {
if(window.caches) {
    console.log('El browser soporta Caches!')

    caches.open('prueba-1')
    caches.open('prueba-2')
    caches.open('prueba-3')
    //caches.has('prueba-2').then(existe => console.log(existe))
    caches.has('prueba-2').then(console.log)
    caches.delete('prueba-1').then(console.log)
    caches.keys().then(console.log)

    // ----------------------------------
    // prueba de métodos de window.caches
    // ----------------------------------
    caches.open('cache-v1.1').then(cache => {
        //cache.add('/index.html')
        cache.addAll([
            '/index.html',
            '/css/estilos.css',
            '/images/super.jpg'
        ]).then(()=> {
            //cache.delete('/css/estilos.css')
            //cache.match('/index.html').then(res => {
            cache.match('/css/estilos.css').then(res => {
                if(res) {
                    console.log('Recurso encontrado!')
                    res.text().then(console.log)
                }
                else console.log('Recurso inexistente!')
            })
            cache.put('/index.html',new Response('Hola mundo!'))
            cache.keys().then(console.log)
            cache.keys().then(recursos => {
                recursos.forEach(recurso => {
                    console.log(recurso.url)
                })
                caches.keys().then(console.log)
            })
        })
    })
}
else {
    console.log('Caches no soportado!')
}
}


