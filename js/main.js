/* -------------------------------------------------------- */
/*                  VARIABLES GLOBALES                      */
/* -------------------------------------------------------- */
let listaProductos = [
    { nombre: 'Pan',    cantidad: 2,    precio: 12.34 },
    { nombre: 'Carne',  cantidad: 3,    precio: 34.56 },
    { nombre: 'Leche',  cantidad: 4,    precio: 56.78 },
    { nombre: 'Fideos', cantidad: 5,    precio: 78.90 }
]

let crearLista = true
let ul

/* -------------------------------------------------------- */
/*                  FUNCIONES GLOBALES                      */
/* -------------------------------------------------------- */
function borrarProd(index) {
    console.log('borrarProd', index)

    listaProductos.splice(index,1)
    renderLista()
}

function cambiarCantidad(index, el) {
    let cantidad = Number(el.value)
    console.log('cambiarCantidad', index, cantidad)
    listaProductos[index].cantidad = cantidad
}

function cambiarPrecio(index, el) {
    let precio = Number(el.value)
    console.log('cambiarPrecio', index, precio)
    listaProductos[index].precio = precio
}

function renderLista() {

    if(crearLista) {
        ul = document.createElement('ul')
        ul.classList.add('demo-list-icon','mdl-list','w-100')
    }

    ul.innerHTML = ''

    listaProductos.forEach( (prod, index) => {
        ul.innerHTML +=  
        `<li class="mdl-list__item">

            <!-- ícono del producto -->
            <span class="mdl-list__item-primary-content w-10">
                <i class="material-icons mdl-list__item-icon">shopping_cart</i>
            </span>

            <!-- Nombre del producto -->
            <span class="mdl-list__item-primary-content w-30">
                ${prod.nombre}
            </span>

            <!-- Entrada de cantidad -->
            <span class="mdl-list__item-primary-content w-20">
                <!-- Textfield with Floating Label -->
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onchange="cambiarCantidad(${index},this)" value="${prod.cantidad}" class="mdl-textfield__input" type="text" id="sample-cantidad-${index}">
                    <label class="mdl-textfield__label" for="sample-cantidad-${index}">Cantidad</label>
                </div>
            </span>

            <!-- Entrada de precio -->
            <span class="mdl-list__item-primary-content w-20 ml-item">
                <!-- Textfield with Floating Label -->
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input onchange="cambiarPrecio(${index},this)" value="${prod.precio}" class="mdl-textfield__input" type="text" id="sample-precio-${index}">
                    <label class="mdl-textfield__label" for="sample-precio-${index}">Precio</label>
                </div>
            </span>

            <!-- Botón de borrado del producto -->
            <span class="mdl-list__item-primary-content w-20 ml-item">
                <!-- Colored FAB button with ripple -->
                <button onclick="borrarProd(${index})"
                    class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                    <i class="material-icons">remove_shopping_cart</i>
                </button>
            </span>
        </li>`

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
            listaProductos.unshift( { nombre: producto, cantidad: 1, precio: 0} )
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
        window.addEventListener('load', function() {
            this.navigator.serviceWorker.register('./sw.js')
            .then(function(reg) {
                console.log('el service worker se registró correctamente', reg)
            })
            .catch(function(err) {
                console.error('Error al registrar el service worker', err)
            })
        })
    }
    else {
        console.error('serviceWorker no está disponible en navigator')
    }
}

function start() {
    console.log(document.querySelector('title').textContent)
    registrarServiceWorker()
    configurarListeners()
    renderLista()
}

/* -------------------------------------------------------- */
/*                       EJECUCIÓN                          */
/* -------------------------------------------------------- */
start()