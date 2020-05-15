console.log('Super Lista')

// -----------------------------------------------
//            VARIABLES GLOBALES
// -----------------------------------------------
let listaProductos = [
    { nombre: 'Pan', cantidad: 2, precio: 12.34 },
    { nombre: 'Carne', cantidad: 3, precio: 34.56 },
    { nombre: 'Leche', cantidad: 4, precio: 56.78 },
    { nombre: 'Fideos', cantidad: 5, precio: 65.43 }
]
let crearLista = true
let ul

// -----------------------------------------------
//                 FUNCIONES
// -----------------------------------------------
function borrarProd(index) {
    console.log(index)

    listaProductos.splice(index, 1)
    renderLista()
}

function cambiarCantidad(index, e) {
    let cantidad = Number(e.value)
    console.log('cambiarCantidad',index,cantidad)
    listaProductos[index].cantidad = cantidad
}

function cambiarPrecio(index, e) {
    let precio = Number(e.value)
    console.log('cambiarPrecio',index,precio)
    listaProductos[index].precio = precio
}

function configurarListeners() {
    document.getElementById('btn-entrada-producto').addEventListener('click', () => {

        console.log('btn-entrada-producto')

        let input = document.getElementById('ingreso-producto')
        let producto = input.value

        console.log(producto)
        if(producto != '') {

            listaProductos.push({
                nombre: producto,
                cantidad: 1,
                precio: 0
            })
            renderLista()

            input.value = ''
        }
    })

    document.getElementById('btn-borrar-productos').addEventListener('click', () => {
        console.log('borrar productos')

        listaProductos = []
        renderLista()
    })
}

function renderLista() {
    
    if(crearLista) {
        ul = document.createElement('ul')
        ul.classList.add('demo-list-icon', 'mdl-list', 'w-100')
    }

    ul.innerHTML = ''

    //listaProductos.forEach( function(prod,index) {
    listaProductos.forEach( (prod,index) => {
        ul.innerHTML += `
            <li class="mdl-list__item">

                <span class="mdl-list__item-primary-content w-10">
                    <i class="material-icons">shopping_cart</i>
                </span>

                <span class="mdl-list__item-primary-content w-30">
                    ${prod.nombre}
                </span>

                <span class="mdl-list__item-primary-content w-20">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input onchange="cambiarCantidad(${index}, this)"
                            class="mdl-textfield__input" type="text" id="sample-cantidad-${index}">
                        <label class="mdl-textfield__label" for="sample-cantidad-${index}">${prod.cantidad}</label>
                    </div>
                </span>

                <span class="mdl-list__item-primary-content w-20 ml-item">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input onchange="cambiarPrecio(${index}, this)"
                            class="mdl-textfield__input" type="text" id="sample-precio-${index}">
                        <label class="mdl-textfield__label" for="sample-precio-${index}">${prod.precio}</label>
                    </div>
                </span>

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
        document.getElementById('lista').appendChild(ul)
    }
    else {
        componentHandler.upgradeElements(ul)
    }

    crearLista = false;
}

function registrarServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('./sw.js').then(function(reg) {
                console.log('Successfully registered service worker', reg);
            }).catch(function(err) {
                console.warn('Error whilst registering service worker', err);
            });
        })
    }
}

function start() {
    registrarServiceWorker()
    configurarListeners()
    renderLista()
}

// -----------------------------------------------
//                 EJECUCIÓN
// -----------------------------------------------
//start()
//window.onload = start
window.addEventListener('DOMContentLoaded', start)
