/* ----------------------------------- */
/*         VARIABLES GLOBALES          */
/* ----------------------------------- */
let listaProductos = []

/* ----------------------------------- */
/*         FUNCIONES GLOBALES          */
/* ----------------------------------- */
function guardarListaProductos(lista) {
    //console.log(lista)
    localStorage.setItem('lista', JSON.stringify(lista))
}

function leerListaProductos() {
    let lista = []

    let prods = localStorage.getItem('lista')
    if(prods) {
        try {
            lista = JSON.parse(prods)
        }
        catch {
            guardarListaProductos(lista)
        }
    }
    return lista
}


async function borrarProd(id) {
    //console.log('borrarProd', id)
    await apiLista.delete(id)
    renderLista()
}

async function cambiarValorProd(id, cual, el) {
    let index = listaProductos.findIndex(prod => prod.id == id)
    //console.log(id, index, cual, el)
    //console.log(id, index, cual, el.value)

    let valor = cual == 'precio'? parseFloat(el.value) : parseInt(el.value)
    console.log(index, cual, valor)

    listaProductos[index][cual] = valor

    guardarListaProductos(listaProductos)

    let prod = listaProductos[index]
    await apiLista.put(id,prod)
}


function configurarListeners(){
    $('#btn-entrada-producto').click( async () => {
        console.log('btn-entrada-producto')

        const input = $('#ingreso-producto')
        let nombre = input.val()

        if(nombre) {
            let producto = {nombre, cantidad: 1, precio: 0}
            await apiLista.post(producto)
            renderLista()
            input.val('')
        }
    })

    $('#btn-borrar-productos').click( () => {
        console.log('btn-borrar-productos')

        if(listaProductos.length) {
            var dialog = $('dialog')[0];
            dialog.showModal()
        }
    })
}

function iniDialog() {
    var dialog = $('dialog')[0];
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }

    $('dialog .cancelar').click(function () {
        dialog.close();
    });

    $('dialog .aceptar').click( async function () {
        dialog.close();
        
        //listaProductos = []
        await apiLista.deleteAll()
        renderLista()
    });
}

async function renderLista() {

    let plantilla = await $.ajax({url: 'plantillas/plantilla-lista.hbs'})
    let template = Handlebars.compile(plantilla)
    
    listaProductos = await apiLista.get()

    guardarListaProductos(listaProductos)

    let html = template({ listaProductos })
    $('#lista').html(html)

    let ul = $('ul')
    componentHandler.upgradeElements(ul)
}


function registrarServiceWorker() {
    if('serviceWorker' in navigator) {
        this.navigator.serviceWorker.register('/sw.js')
            .then( reg => {
                //console.log('El service worker se registró correctamente', reg)

                reg.onupdatefound = () => {
                    const installWorker = reg.installing
                    installWorker.onstatechange = () => {
                        console.warn('SW --->', installWorker.state)
                        if(installWorker.state == 'activated') {
                            console.error('Reiniciando en 2 segundos...')
                            setTimeout(() => {
                                location.reload()
                            },2000)
                        }
                    }
                }
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
    //console.warn('////////////////// SuperLista App ////////////////////')

    registrarServiceWorker()

    configurarListeners()
    iniDialog()
    renderLista()
}

/* ----------------------------------- */
/*              EJECUCIÓN              */
/* ----------------------------------- */
$(document).ready(start)       //window.onload amanece en null
