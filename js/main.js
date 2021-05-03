/* ----------------------------------------------- */
/*               VARIABLES GLOBALES                */
/* ----------------------------------------------- */
let listaProductos = [
    { nombre: 'Pan',    cantidad: 2,    precio: 12.34 },
    { nombre: 'Carne',  cantidad: 3,    precio: 34.56 },
    { nombre: 'Leche',  cantidad: 4,    precio: 56.78 },
    { nombre: 'Fideos', cantidad: 5,    precio: 78.90 }
]

let crearLista = true
let ul

/* ----------------------------------------------- */
/*               FUNCIONES GLOBALES                */
/* ----------------------------------------------- */
function borrarProd(index) {
    /* https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/splice */
    listaProductos.splice(index,1)
    renderLista()
}

function cambiarCantidadProd(index,el) {
    let cantidad = parseInt(el.value)
    console.log('cambiarCantidadProd', index, cantidad)
    //console.dir(el)
    listaProductos[index].cantidad = cantidad
}

function cambiarPrecioProd(index,el) {
    //let precio = parseFloat(el.value)
    let precio = Number(el.value)
    console.log('cambiarPrecioProd', index, precio)
    //console.dir(el)
    listaProductos[index].precio = precio

}

function renderLista() {
    
    if(crearLista) {
        ul = document.createElement('ul')
        ul.classList.add('demo-list-icon','mdl-list','w-100')
    }
    
    ul.innerHTML = ''

    listaProductos.forEach( (prod,index) => {
        ul.innerHTML += 
        `
            <!-- Icon List -->
            <li class="mdl-list__item">
                <!-- ícono del producto -->
                <span class="mdl-list__item-primary-content w-10">
                    <i class="material-icons mdl-list__item-icon">shopping_cart</i>
                </span>
                <!-- nombre del producto -->
                <span class="mdl-list__item-primary-content w-30">
                    ${prod.nombre}
                </span>
                <!-- cantidad del producto -->
                <span class="mdl-list__item-primary-content w-20">
                    <!-- Textfield with Floating Label -->
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input onchange="cambiarCantidadProd(${index},this)" class="mdl-textfield__input" type="text" id="sample-cantidad-${index}" value="${prod.cantidad}">
                        <label class="mdl-textfield__label" for="sample-cantidad-${index}">Cantidad</label>
                    </div>
                </span>
                <!-- precio del producto -->
                <span class="mdl-list__item-primary-content w-20 ml-item">
                    <!-- Textfield with Floating Label -->
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input onchange="cambiarPrecioProd(${index},this)" class="mdl-textfield__input" type="text" id="sample-precio-${index}" value="${prod.precio}">
                        <label class="mdl-textfield__label" for="sample-precio-${index}">Precio($)</label>
                    </div>
                </span>
                <!-- acción ( borrar producto) -->
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
        crearLista = false
    }
    else {
        componentHandler.upgradeElements(ul)
    }
}

function configurarListeners() {

    /* Ingreso de producto */
    document.getElementById('btn-entrada-producto').addEventListener('click', () => {
        console.log('btn-entrada-producto')

        let input = document.getElementById('ingreso-producto')
        let producto = input.value
        console.log(producto)

        if(producto) {
            listaProductos.push( { nombre: producto, cantidad: 1, precio: 0 } )
            renderLista()
            input.value = null
        }
    })    

    /* Borrado de todos los productos */
    document.getElementById('btn-borrar-productos').addEventListener('click', () => {
        console.log('btn-borrar-productos')

        if(confirm('Confirma borrar todo?')) {
            listaProductos = []
            renderLista()
        }
    })    
}

function start() {
    console.log('Super Lista')
    
    configurarListeners()
    renderLista()
}

/* ----------------------------------------------- */
/*                    EJECUCIÓN                    */
/* ----------------------------------------------- */
start()