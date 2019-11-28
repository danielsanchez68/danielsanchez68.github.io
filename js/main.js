//console.log('Lista de Supermercado en AWP v0.0.3')
/* ------------------ */
/* VARIABLES GLOBALES */
/* ------------------ */
let productos = [/* 
    { nombre: 'Carne', cantidad: 1, precioUnitario: 45 },
    { nombre: 'Fideos', cantidad: 4, precioUnitario: 65 },
    { nombre: 'Gaseosa', cantidad: 2, precioUnitario: 30 },
    { nombre: 'Pan', cantidad: 8, precioUnitario: 77 }
 */]


/* ------------------------ */
/* IMPLEMENTACIÓN API REST  */
/* ------------------------ */
function getURL() {
    return 'https://5c8ef17a3e557700145e85c7.mockapi.io/lista'
}

function obtenerProductosWeb(cb) {
    let url = getURL()+'?'+Date.now()

    $.get(url, prods => {
        //console.log(prods)
        cb(prods)
    }).fail(function() {
        console.log('error get mockapi.io');
        //en caso de error tomo los productos del localstore
        leerListaProductos()
        cb(productos)
    });
}

function guardarProductoEnWeb(producto, cb) {
    let url = getURL()

    $.post(url,producto, prod => {
        //console.log(prod)
        cb(prod)
    })
}

function borrarProductoWeb(id,cb) {
    let url = getURL() + '/' + id
    
    //console.log(url)
    $.ajax({ url: url , method: "DELETE" })
    .then(function (prods) {
        //console.log(prods)
        cb(prods)
    })
    .catch(function (err) {
        console.log('error en delete',err)
    });
}

function actualizarProductoWeb(id, index, cb) {
    let url = getURL() + '/' + id
    
    //console.log(url)
    let dato = productos[index]
    //console.log(dato)

    $.ajax({ url: url , method: "PUT", data: dato })
    .then(function (prods) {
        //console.log(prods)
        cb(prods)
    })
    .catch(function (err) {
        console.log('error en delete',err)
    });
}

/* ------------------------ */
/* DECLARACIÓN DE FUNCIONES */
/* ------------------------ */
function configurarListeners() {
    $('#boton-agregar').click( ()=> {
        //console.log('boton-agregar')
        let producto = $('#entrada-producto').val()
        //console.log(producto)

        if(producto != '') {
            let prod = {
                nombre : producto,
                cantidad : 1,
                precioUnitario : 0
            }
            guardarProductoEnWeb(prod, prod => {
                renderProductos(false)
                //console.log(prod)
                $('#entrada-producto').val('')
            })
        }
    })

    $('#boton-borrar-todo').click( ()=> {
        console.log('boton-borrar-todo')
        productos = []    
        renderProductos(false)
    })
}

let borrar = index => {
    //productos.splice(index,1)
    borrarProductoWeb(index, prod => {
        renderProductos(false)
    })
}

let actualizarCantidad = (id, e) => {
    let cantidad = parseInt(e.value)
    var index = productos.findIndex(prod => prod.id == id)
    //console.log('id - index - cantidad',id, index,cantidad)
    productos[index].cantidad = cantidad

    actualizarProductoWeb(id, index, prod => {
        guardarListaProductos()
    })
}

let actualizarPrecio = (id, e) => {
    let precio = Number(e.value)
    
    var index = productos.findIndex(prod => prod.id == id)
    //console.log('id - index - precio',id, index,precio)
    
    productos[index].precioUnitario = precio

    actualizarProductoWeb(id, index, prod => {
        guardarListaProductos()
    })
}


function guardarListaProductos() {
    let productosStr = JSON.stringify(productos)
    localStorage.setItem('lista',productosStr)
}

function leerListaProductos() {
    if(localStorage.getItem('lista'))
    {
        productos = JSON.parse(localStorage.getItem('lista'))
    }
}



function renderProductos(ini) {
    obtenerProductosWeb(prods => {
        productos = prods
        /* HANDLEBARS COMPILER*/ 
        $.get('plantilla-lista.hbs', source => {
            //console.log(source)
            let template = Handlebars.compile(source)
            let data = { productos }
            $('#lista').html(template(data))
        
            let ul = $('#contenedor-lista')
            componentHandler.upgradeElements(ul)
            guardarListaProductos()
        })
    })
}

function configurarSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then(function(reg) {
            //console.log('Successfully registered service worker', reg);
        }).catch(function(err) {
            console.warn('Error whilst registering service worker', err);
        });
    }
}

/* ------------------------ */
/*  EJECUCIÓN DE FUNCIONES  */
/* ------------------------ */
function start() {
    configurarListeners()
    renderProductos(true)
    configurarSW()
}

$(document).ready(start)

/*
// -------------------------------------------
//    CACHE
// -------------------------------------------
if(window.caches) {
    //caches.open('prueba-1')
    caches.open('prueba-2')
    caches.has('prueba-2').then(console.log)

    caches.delete('prueba-1').then(console.log)

    caches.open('cache-v1.1').then(cache => {
        cache.add('/index.html')
        cache.add('/js/main.js')
        cache.add('/css/estilos.css')
    })

    caches.open('cache-v1.2').then(cache => {
        cache.addAll([
            '/index.html',
            '/js/main.js',
            '/css/estilos.css'
        ]).then(() => {
            cache.delete('/css/estilos.css')
            cache.match('/index.html').then(res => {
                //console.log(res)
                if(res) {
                    res.text().then(console.log)
                }
                else {
                    console.log('Recurso no encontrado')
                }
            })
            cache.put('/index.html', new Response('Hola mundo2!'))
        })
    })

    caches.keys().then(keys => console.log(keys))
}
*/