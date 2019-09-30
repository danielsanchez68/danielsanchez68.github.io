console.log('Super: Lista de compras')


let listaDecompras = [
    { nombre: 'Fideos', precio: 1 },
    { nombre: 'Carne', precio: 2 },
    { nombre: 'Harina', precio: 3 },
    { nombre: 'Dulce de leche', precio: 4 }
]


function renderLista() {
    let productos = ''
    listaDecompras.forEach((producto, index) => {
        productos += `  <li class="mdl-list__item">

                            <!-- nombre Producto -->
                            <span class="mdl-list__item-primary-content">
                                ${producto.nombre}
                            </span>
                            
                            <!-- input precio -->
                            <div class="mdl-textfield mdl-js-textfield">
                                <input class="mdl-textfield__input" value="${producto.precio}" onchange="cambiarPrecio(this,${index})" type="text" id="sample${index+1}">
                                <label class="mdl-textfield__label" for="sample${index+1}"></label>
                            </div>
                            
                            <!-- Boton borrar -->
                            <button onclick="borrar(${index})" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
                                Borrar
                            </button>
                        </li>
                    `
    })
    document.getElementById('lista').innerHTML = productos
}

function borrar(index) {
    console.log('borrar',index)
    listaDecompras.splice(index,1)
    renderLista()
}

function cambiarPrecio(e,index) {
    console.log('cambiar', index)
    let precioNuevo = Number(e.value)
    console.log(precioNuevo)
    listaDecompras[index].precio = precioNuevo

    console.log(listaDecompras)

}

document.getElementById('borrar-lista').addEventListener('click', () => {
    console.log('click: borrar-lista')
    listaDecompras = []
    renderLista()
})

document.getElementById('agregar-producto').addEventListener('click', () => {
    console.log('click: agregar-producto')
    let prod = document.getElementById('producto').value
    if (prod != '') {
        listaDecompras.push({ nombre: prod, precio: 0 })
        document.getElementById('producto').value = ''
    }
    renderLista()
})


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function(reg) {
        console.log('Successfully registered service worker', reg);
    }).catch(function(err) {
        console.warn('Error whilst registering service worker', err);
    });
}


renderLista()
