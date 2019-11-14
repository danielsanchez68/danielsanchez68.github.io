console.log('Lista de Supermercado en AWP v0.0.3')

let productos = [/* 
    { nombre: 'Carne', cantidad: 1, precioUnitario: 45 },
    { nombre: 'Fideos', cantidad: 4, precioUnitario: 65 },
    { nombre: 'Gaseosa', cantidad: 2, precioUnitario: 30 },
    { nombre: 'Pan', cantidad: 8, precioUnitario: 77 }
 */]

let botonAgregar = document.querySelector('#boton-agregar').addEventListener('click', ()=> {
    //console.log('boton-agregar')
    let producto = document.querySelector('#entrada-producto').value
    console.log(producto)
    if(producto != '') {
        productos.unshift({
            nombre : producto,
            cantidad : 1,
            precioUnitario : 0
        })
        renderProductos(false)
        document.querySelector('#entrada-producto').value = ''
    }
})

let botonBorrarTodo = document.querySelector('#boton-borrar-todo').addEventListener('click', ()=> {
    console.log('boton-borrar-todo')
    productos = []    
    renderProductos(false)
})

let borrar = index => {
    productos.splice(index,1)
    renderProductos(false)
}

let actualizarCantidad = (index, e) => {
    let cantidad = parseInt(e.value)
    console.log('cantidad',index,cantidad)
    productos[index].cantidad = cantidad
}

let actualizarPrecio = (index, e) => {
    let precio = Number(e.value)
    console.log('precio',index,precio)
    productos[index].precioUnitario = precio
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

let ul = document.createElement('ul')
ul.classList.add('demo-list-item')
ul.classList.add('mdl-list')

function renderProductos(ini) {
    if(ini) {
        leerListaProductos()
    }

    ul.innerHTML = ''
    productos.forEach((producto, index) => {
        ul.innerHTML += 
        `
            <li class="mdl-list__item" >
                <!-- NOMBRE -->
                <span class="w-25 mdl-list__item-primary-content">
                    ${producto.nombre}
                </span>

                <!-- Simple Textfield : CANTIDAD -->
                <div class="w-25 ml-items mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" type="text" id="cantidad${index}" onchange="actualizarCantidad(${index},this)">
                    <label class="mdl-textfield__label" for="cantidad${index}">${producto.cantidad}</label>
                </div>

                <!-- Simple Textfield : PRECIO -->
                <div class="w-25 ml-items mdl-textfield mdl-js-textfield">
                    <input class="mdl-textfield__input" type="text" id="precio${index}" onchange="actualizarPrecio(${index},this)">
                    <label class="mdl-textfield__label" for="precio${index}">${producto.precioUnitario}</label>
                </div>

                <!-- Accent-colored raised button with ripple : BORRAR -->
                <button class="w-25 ml-items mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onclick="borrar(${index})">
                    <i class="material-icons">clear</i>
                </button>                        
            </li >
        `
        //'<li>' + producto.nombre + ' - ' + (index + 1) + '</li>'
    })
    let lista = document.querySelector('#lista')
    lista.appendChild(ul)
    /*https://es.stackoverflow.com/questions/48082/animaci%C3%B3n-no-funciona-en-html-agregado-din%C3%A1micamente-con-javascript
    */
    if(!ini) {
        componentHandler.upgradeElements(ul)
        guardarListaProductos()
    }
    
}

renderProductos(true)

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js').then(function(reg) {
            console.log('Successfully registered service worker', reg);
        }).catch(function(err) {
            console.warn('Error whilst registering service worker', err);
        });
    })
}
