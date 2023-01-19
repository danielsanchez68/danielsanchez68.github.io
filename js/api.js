class ApiLista {

    #getURL(id) {
        return 'https://5c8ef17a3e557700145e85c7.mockapi.io/lista/' + (id || '')
    }

    /* GET */
    async get() {
        try {
            let prods = await $.ajax({url: this.#getURL()})
            return prods
        }
        catch(err) {
            console.error('Error GET', err)

            let prods = leerListaProductos()
            return prods
        }
    }

    /* POST */
    async post(prod) {
        try {
            let prodAgregado = await $.ajax({url: this.#getURL(), method: 'post', data: prod})
            return prodAgregado
        }
        catch(err) {
            console.error('Error POST', err)
        }
    }

    /* PUT */
    async put(id, prod) {
        try {
            let prodActualizado = await $.ajax({url: this.#getURL(id), method: 'put', data: prod})
            return prodActualizado
        }
        catch(err) {
            console.error('Error PUT', err)
        }
    }

    /* DELETE */
    async delete(id) {
        try {
            let prodBorrado = await $.ajax({url: this.#getURL(id), method: 'delete'})
            return prodBorrado
        }
        catch(err) {
            console.error('Error DELETE', err)
        }
    }

    /* DELETE ALL */
    async deleteAll() {
        const progress = $('progress')
        progress.css('display', 'block')

        let porcentaje = 0

        for(let i=0; i<listaProductos.length; i++) {
            porcentaje =  parseInt((i * 100) / listaProductos.length)
            //progress.val(porcentaje)
            progress.attr('value', porcentaje)
            
            let id = listaProductos[i].id
            await this.delete(id)
        }

        porcentaje = 100
        //progress.val(porcentaje)
        progress.attr('value', porcentaje)


        setTimeout(() => {
            progress.css('display', 'none')
        },2000)
    }
}

const apiLista = new ApiLista()

//console.log( apiLista.getURL(99) )
//console.log( apiLista.#getURL(99) )
