/* ----------------------------------------------------- */
/*                 VARIABLES GLOBALES                    */
/* ----------------------------------------------------- */
let listaProductos = [
    { nombre: 'Carne', cantidad: 2, precio: 12.34 },
    { nombre: 'Pan', cantidad: 3, precio: 34.56 },
    { nombre: 'Fideos', cantidad: 4, precio: 78.90 },
    { nombre: 'Leche', cantidad: 5, precio: 87.65 },
    { nombre: 'Crema', cantidad: 6, precio: 43.21 },
]

let crearLista = true
let ul


/* ----------------------------------------------------- */
/*                 FUNCIONES GLOBALES                    */
/* ----------------------------------------------------- */
function borrarProd(index) {
    console.log('borrarProd', index)

    listaProductos.splice(index,1)
    renderLista()
}

function cambiarValorProd(cual, index, el) {
    console.log('cambiarValorProd', cual, index, el)
    console.dir(el)

    const valor = cual == 'precio'? parseFloat(el.value) : parseInt(el.value)
    listaProductos[index][cual] = valor
}

function renderLista() {

    if(crearLista) {
        // <ul class="demo-list-icon mdl-list">
        ul = document.createElement('ul')
        ul.classList.add('demo-list-icon','mdl-list')
    }

    ul.innerHTML = ''
    listaProductos.forEach((prod, index) => {
        ul.innerHTML +=
        `
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
                    <!-- Textfield with Floating Label -->
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input onchange="cambiarValorProd('cantidad',${index},this)" value="${prod.cantidad}" class="mdl-textfield__input" type="text" id="cantidad-${index}">
                        <label class="mdl-textfield__label" for="cantidad-${index}">Cantidad</label>
                    </div>
                </span>

                <!-- precio del producto -->
                <span class="mdl-list__item-primary-content w-20 ml-item">
                    <!-- Textfield with Floating Label -->
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input onchange="cambiarValorProd('precio',${index},this)" value="${prod.precio}" class="mdl-textfield__input" type="text" id="precio-${index}">
                        <label class="mdl-textfield__label" for="precio-${index}">Precio</label>
                    </div>
                </span>

                <!-- botón de borrado individual del producto en la lista -->
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


function configurarListeners() {
    document.getElementById('btn-entrada-producto').addEventListener('click', () => {
        console.log('btn-entrada-producto')

        const input = document.getElementById('ingreso-producto')
        const nombre = input.value

        if(nombre) {
            console.log(nombre)

            const producto = { nombre: nombre, cantidad: 1, precio: 0 }
            listaProductos.push(producto)

            renderLista()

            input.value = ''
        }
    })

    document.getElementById('btn-borrar-productos').addEventListener('click', () => {
        
        /* if(confirm('¿Desea borrar todos los productos?')) {
            listaProductos= []
            renderLista()
        } */
        var dialog = document.querySelector('dialog');
        dialog.showModal()
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
    dialog.querySelector('.aceptar').addEventListener('click', function () {
        listaProductos= []
        renderLista()        
        
        dialog.close();
    });

    dialog.querySelector('.cancelar').addEventListener('click', function () {
        dialog.close();
    });
}

function start() {
    console.warn( document.querySelector('title').innerText )

    iniDialog()
    configurarListeners()
    renderLista()
}

/* ----------------------------------------------------- */
/*                      EJECUCIÓN                        */
/* ----------------------------------------------------- */
start()



