/* ------------------------------------------------ */
/*               VARIABLES GLOBALES                 */
/* ------------------------------------------------ */
let listaProductos = [
    { nombre: 'Pan',    cantidad: 2, precio: 12.34 },
    { nombre: 'Carne',  cantidad: 3, precio: 34.56 },
    { nombre: 'Leche',  cantidad: 4, precio: 56.78 },
    { nombre: 'fideos', cantidad: 5, precio: 65.43 }
]

let crearLista = true
let ul

/* ------------------------------------------------ */
/*               FUNCIONES GLOBALES                 */
/* ------------------------------------------------ */
function cambiarCantidad(index, el) {
    let cantidad = Number(el.value)
    console.log('Cambiar cantidad',index,cantidad)
    listaProductos[index].cantidad = cantidad
}

function cambiarPrecio(index, el) {
    let precio = Number(el.value)
    console.log('Cambiar precio',index,precio)
    listaProductos[index].precio = precio
}

function borrarProd(index) {
    console.log('borrar item',index)

    listaProductos.splice(index,1)
    renderLista()
}

function renderLista() {

    if(crearLista) {
        ul = document.createElement('ul')
        ul.classList.add('demo-list-icon','mdl-list','w-100')
    }

    ul.innerHTML = ''

    //listaProductos.forEach( function(prod, index) {
    listaProductos.forEach( (prod, index) => {
        ul.innerHTML +=  `
            <li class="mdl-list__item">

                <!-- Campo del ícono del producto -->
                <span class="mdl-list__item-primary-content w-10">
                    <i class="material-icons mdl-list__item-icon">shopping_cart</i>
                </span>

                <!-- Campo de descripción del producto -->
                <span class="mdl-list__item-primary-content w-30">
                    ${prod.nombre}
                </span>

                <!-- Campo de entrada de cantidad del producto -->
                <span class="mdl-list__item-primary-content w-20">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input onchange="cambiarCantidad(${index},this)" value="${prod.cantidad}" class="mdl-textfield__input" type="text" id="sample-cantidad-${index}">
                        <label class="mdl-textfield__label" for="sample-cantidad-${index}">Cantidad</label>
                    </div>
                </span>

                <span class="mdl-list__item-primary-content w-20 ml-item">
                    <!-- Campo de entrada de precio del producto -->
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input onchange="cambiarPrecio(${index},this)" value="${prod.precio}" class="mdl-textfield__input" type="text" id="sample-precio-${index}">
                        <label class="mdl-textfield__label" for="sample-precio-${index}">Precio</label>
                    </div>
                </span>

                <span class="mdl-list__item-primary-content w-20 ml-item">
                    <!-- Botón para eliminar el producto -->
                    <button onclick="borrarProd(${index})"
                        class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                        <i class="material-icons">remove_shopping_cart</i>
                    </button>
                </span>
            </li>
        `
    })

    if(crearLista) {
        document.getElementById('lista').appendChild(ul)
    }
    else {
        componentHandler.upgradeElements(ul)
    }
    crearLista = false
}

function configurarListeners() {

    /* Ingreso de producto */
    document.getElementById('btn-entrada-producto').addEventListener('click', () => {
        console.log('btn-entrada-producto')

        let input = document.getElementById('ingreso-producto')
        let producto = input.value
        console.log(producto)

        if(producto) {
            listaProductos.push( {nombre: producto, cantidad: 1, precio: 0} )
            renderLista()
            input.value = null
        }
    })

    /* Borrar todos los productos */
    document.getElementById('btn-borrar-productos').addEventListener('click', () => {
        console.log('btn-borrar-productos')

        if(confirm('confirma borrar todo?')) {
            listaProductos = []
            renderLista()
        }
    })
}

function registrarServiceWorker() {
    if('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            this.navigator.serviceWorker.register('./sw.js')
            .then( reg => {
                console.log('El service worker se registró correctamente', reg)
            })
            .catch( err => {
                console.log('Error al registrar el service worker', err)
            })
        })
    }
    else {
        console.log('No existe el objeto serviceWorker en el navegador')
    }
}

function start() {
    console.log('Super Lista')
    registrarServiceWorker()
    configurarListeners()
    renderLista()
}

/* ------------------------------------------------ */
/*                  EJECUCIONES                     */
/* ------------------------------------------------ */
//start()
//window.onload = start
window.addEventListener('DOMContentLoaded', start)