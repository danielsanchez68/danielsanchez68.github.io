/* ---------------------------------------------------- */
/*                 VARIABLES GLOBALES                   */
/* ---------------------------------------------------- */
let listaProductos = [
    { nombre: 'Carne',  cantidad: 2,    precio: 12.34 },
    { nombre: 'Pan',    cantidad: 3,    precio: 34.56 },
    { nombre: 'Fideos', cantidad: 4,    precio: 56.78 },
    { nombre: 'Leche',  cantidad: 5,    precio: 78.90 },
]

let crearLista = true
let ul

/* ---------------------------------------------------- */
/*                 FUNCIONES GLOBALES                   */
/* ---------------------------------------------------- */
function borrarProd(index) {
    console.log('borrarProd', index)

    //https://www.w3schools.com/jsref/jsref_splice.asp
    //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    listaProductos.splice(index,1)

    renderLista()
}

function cambiarCantidad(index, el) {
    const cantidad = parseInt(el.value)
    console.log('cambiarCantidad',index,cantidad)
    listaProductos[index].cantidad = cantidad
}

function cambiarPrecio(index, el) {
    //const precio = parseFloat(el.value)
    const precio = Number(el.value)
    console.log('cambiarPrecio',index,precio)
    listaProductos[index].precio = precio
}

function configurarListeners() {

    /* ingreso del producto nuevo */
    document.getElementById('btn-entrada-producto').addEventListener('click', () => {
        console.log('btn-entrada-producto')

        let input = document.getElementById('ingreso-producto')
        let producto = input.value
        //console.log(producto)

        if(producto) {
            listaProductos.push( { nombre: producto, cantidad: 1, precio: 0 } )
            renderLista()
            input.value = null
        }

    })

    /* borrado total de productos */
    document.getElementById('btn-borrar-productos').addEventListener('click', () => {
        console.log('btn-borrar-productos')

        if(confirm('¿Desea borrar todos los productos?')) {
            listaProductos = []
            renderLista()
        }
    })

}

function renderLista() {

    if(crearLista) {
        //console.log('crearLista 1')

        //Product List
        ul = document.createElement('ul')
        ul.classList.add('demo-list-icon','mdl-list','w-100')
    }

    ul.innerHTML = ''

    listaProductos.forEach( (prod,index) => {
        //console.log(index, prod)

        ul.innerHTML += `
            <!-- Product -->
            <li class="mdl-list__item">

                <!-- icono -->
                <span class="mdl-list__item-primary-content w-10">
                    <i class="material-icons mdl-list__item-icon">shopping_cart</i>
                </span>

                <!-- nombre del producto -->
                <span class="mdl-list__item-primary-content w-30">
                    ${prod.nombre}
                </span>

                <!-- cantidad -->
                <span class="mdl-list__item-primary-content w-20">
                    <!-- Textfield with Floating Label -->
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input onchange="cambiarCantidad(${index},this)" value="${prod.cantidad}" class="mdl-textfield__input" type="text" id="sample-cantidad-${index}">
                        <label class="mdl-textfield__label" for="sample-cantidad-${index}">Cantidad</label>
                    </div>
                </span>

                <!-- precio -->
                <span class="mdl-list__item-primary-content w-20 ml-item">
                    <!-- Textfield with Floating Label -->
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input onchange="cambiarPrecio(${index},this)" value="${prod.precio}" class="mdl-textfield__input" type="text" id="sample-precio-${index}">
                        <label class="mdl-textfield__label" for="sample-precio-${index}">Precio</label>
                    </div>
                </span>

                <!-- acción (borrar el producto) -->
                <span class="mdl-list__item-primary-content w-20 ml-item">
                    <!-- Colored FAB button with ripple -->
                    <button onclick="borrarProd(${index})"
                        class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                        <i class="material-icons">remove_shopping_cart</i>
                    </button>
                </span>
            </li>
        `
    })

    if(crearLista) {
        //console.log('crearLista 2')
        document.getElementById('lista').appendChild(ul)
    }
    else {
        componentHandler.upgradeElements(ul)
    }

    crearLista = false
}

function registrarServiceWorker() {
    if('serviceWorker' in navigator) {
        //estó de debe ejecutar cunado toda el documento web esté cargado
        this.navigator.serviceWorker.register('/sw.js')
        .then( reg => {
            console.log('El service worker se registró correctamente',reg)
        })
        .catch(err => {
            console.error('Error al registrar el service worker',err)
        }) 
    }
    else {
        console.error('serviceWorker no está disponible en navigator')
    }
}

function start() {
    console.warn('Super Lista')

    registrarServiceWorker()
    renderLista()
    configurarListeners()
}

/* ---------------------------------------------------- */
/*                      EJECUCIÓN                       */
/* ---------------------------------------------------- */
//start()
window.onload = start
