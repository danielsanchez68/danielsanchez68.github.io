console.log('Super Lista')

// ----------------------------------------------------
//  VARIABLES GLOBALES
// ----------------------------------------------------
let iniRenderLista = true
let ul
let listaProductos = [
    { nombre: 'Pan', cantidad: 2, precio: 12.34},
    { nombre: 'Carne', cantidad: 3, precio: 34.56},
    { nombre: 'Leche', cantidad: 4, precio: 56.78},
    { nombre: 'Fideos', cantidad: 5, precio: 65.43}
]

// ----------------------------------------------------
//  DECLARACION DE FUNCIONES
// ----------------------------------------------------
function configurarListeners() {
    /* document.querySelector('#ingreso-producto').addEventListener('input', e => {
        let valor = e.target.value
        console.log(valor)
    }) */

    document.querySelector('#btn-entrada-producto').addEventListener('click', e => {
        let input = document.querySelector('#ingreso-producto')
        let producto = input.value
        if(producto != '') {
            console.log(producto)

            listaProductos.push({
                nombre: producto,
                cantidad: 1,
                precio: 0
            })
            renderLista()

            input.placeholder = 'Ingrese producto...'
            input.value = ''
        }
    })

    document.querySelector('#btn-borrar-productos').addEventListener('click', e => {
        listaProductos = []
        renderLista()
    })
}

function borrarProd(index) {
    listaProductos.splice(index,1)
    renderLista()
}

function cambiarCantidad(index, e) {
    let cantidad = Number(e.value)
    console.log('cambiarCantidad', index, cantidad)
    listaProductos[index].cantidad = cantidad   
}

function cambiarPrecio(index, e) {
    let precio = Number(e.value)
    console.log('cambiarPrecio', index, precio)
    listaProductos[index].precio = precio   
}

function renderLista() {

    if(iniRenderLista) {
        ul = document.createElement('ul')
        ul.classList.add('demo-list-item','mdl-list')
    }

    ul.innerHTML = ''
    listaProductos.forEach((prod, index) => {
        ul.innerHTML += `<li class="mdl-list__item">
                            <span class="mdl-list__item-primary-content w-10">
                                <i class="material-icons">shopping_cart</i>
                            </span>
                            <span class="mdl-list__item-primary-content w-30 ml-item">
                                ${prod.nombre}
                            </span>
                            <span class="mdl-list__item-primary-content w-20 ml-item">
 
                                <div class="mdl-textfield mdl-js-textfield">
                                    <input class="mdl-textfield__input" type="text" id="sample-cant-${index}" onchange="cambiarCantidad(${index}, this)">
                                    <label class="mdl-textfield__label" for="sample-cant-${index}">${prod.cantidad}</label>
                                </div>
                                
                            </span>
                            <span class="mdl-list__item-primary-content w-20 ml-item">

                                <div class="mdl-textfield mdl-js-textfield">
                                    <input class="mdl-textfield__input" type="text" id="sample-precio-${index}" onchange="cambiarPrecio(${index}, this)">
                                    <label class="mdl-textfield__label" for="sample-precio-${index}">${prod.precio}</label>
                                </div>

                            </span>                        
                            <span class="mdl-list__item-primary-content w-20 ml-item">
                                <!-- Colored FAB button with ripple -->
                                <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored" onclick="borrarProd(${index})">
                                    <i class="material-icons">remove_shopping_cart</i>
                                </button>
                            </span>

                        </li>
                    `
    })
    let lista = document.querySelector('#lista')
    lista.appendChild(ul)

    if(!iniRenderLista) {
        componentHandler.upgradeElements(ul)
    }
    else iniRenderLista = false
}

function start() {
    configurarListeners()
    renderLista()

/*
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('./sw.js').then(function(reg) {
                console.log('Successfully registered service worker', reg);
            }).catch(function(err) {
                console.warn('Error whilst registering service worker', err);
            });
        })
    }
*/    
}

// ----------------------------------------------------
//  EJECUCION
// ----------------------------------------------------
//start()
//window.onload = start
document.addEventListener('DOMContentLoaded', start)


