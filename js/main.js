/* ----------------------------------- */
/*         VARIABLES GLOBALES          */
/* ----------------------------------- */
let listaProductos = [
    { nombre: 'Carne',  cantidad: 2,  precio: 12.34 },
    { nombre: 'Pan',    cantidad: 3,  precio: 34.56 },
    { nombre: 'Fideos', cantidad: 4,  precio: 56.78 },
    { nombre: 'Leche',  cantidad: 5,  precio: 78.90 },
    { nombre: 'Crema',  cantidad: 6,  precio: 90.12 },
]

let crearLista = true
let ul

/* ----------------------------------- */
/*         FUNCIONES GLOBALES          */
/* ----------------------------------- */
function borrarProd(index) {
    console.log('borrarProd', index)

    listaProductos.splice(index, 1)

    renderLista()
}

function cambiarValorProd(index, cual, el) {
    //console.log(index, cual, el)
    //console.log(index, cual, el.value)
    let valor = cual == 'precio'? parseFloat(el.value) : parseInt(el.value)
    console.log(index, cual, valor)

    listaProductos[index][cual] = valor
}


function configurarListeners(){
    document.getElementById('btn-entrada-producto').addEventListener('click', () => {
        console.log('btn-entrada-producto')

        const input = document.getElementById('ingreso-producto')
        let producto = input.value

        if(producto) {
            listaProductos.push( {nombre: producto, cantidad: 1, precio: 0} )
            renderLista()
            input.value = ''
        }
    })

    document.getElementById('btn-borrar-productos').addEventListener('click', () => {
        console.log('btn-borrar-productos')

        /* if( confirm('¿Desea borrar todos los productos?') ) {
            listaProductos = []
            renderLista()
        } */

        if(listaProductos.length) {
            var dialog = document.querySelector('dialog');
            dialog.showModal()
        }
    })
}

function iniDialog() {
    var dialog = document.querySelector('dialog');
    //var showDialogButton = document.querySelector('#show-dialog');
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    /* showDialogButton.addEventListener('click', function () {
        dialog.showModal();
    }); */
    dialog.querySelector('.cancelar').addEventListener('click', function () {
        dialog.close();
    });

    dialog.querySelector('.aceptar').addEventListener('click', function () {
        dialog.close();
        
        listaProductos = []
        renderLista()
    });
}

function renderLista() {

    if(crearLista) {
        ul = document.createElement('ul')
        ul.classList.add('demo-list-icon', 'mdl-list', 'w-100')
    }

    ul.innerHTML = ''
    listaProductos.forEach( (prod, index) => {
        ul.innerHTML += `
            <!-- Producto -->
            <li class="mdl-list__item">
                <!-- ícono del producto -->
                <span class="mdl-list__item-primary-content w-10">
                    <i class="material-icons mdl-list__item-icon">shopping_cart</i>
                </span>

                <!-- nombre del producto -->
                <span class="mdl-list__item-primary-content w-30">
                    ${prod.nombre}
                </span>

                <!-- cantidad de producto -->
                <span class="mdl-list__item-primary-content w-20">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input onchange="cambiarValorProd(${index},'cantidad',this)" value=${prod.cantidad} class="mdl-textfield__input" type="text" id="cantidad-${index}">
                        <label class="mdl-textfield__label" for="cantidad-${index}">Cantidad</label>
                    </div>
                </span>

                <!-- precio del producto -->
                <span class="mdl-list__item-primary-content w-20 ml-item">
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input onchange="cambiarValorProd(${index},'precio',this)" value=${prod.precio} class="mdl-textfield__input" type="text" id="precio-${index}">
                        <label class="mdl-textfield__label" for="precio-${index}">Precio</label>
                    </div>
                </span>

                <!-- botón de borrado individual del producto -->
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

    crearLista = false
}

function registrarServiceWorker() {
    if('serviceWorker' in navigator) {
        this.navigator.serviceWorker.register('/sw.js')
            .then( reg => {
                console.log('El service worker se registró correctamente', reg)
            })
            .catch( err => {
                console.error('Error el registrar el service worker', err)
            })
    }
    else {
        console.error('serviceWorker no está disponible en navigator')
    }
}

function start() {
    console.warn('SuperLista App')

    registrarServiceWorker()

    configurarListeners()
    iniDialog()
    renderLista()
}

/* ----------------------------------- */
/*              EJECUCIÓN              */
/* ----------------------------------- */
start()