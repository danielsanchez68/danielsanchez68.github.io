import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        contador: 1234
    },
    actions: {
        contarUp({commit}, cant) {
            //console.log('contarUp action', new Date().toLocaleString())
            console.log('contarUp action', Date.now())
            fetch('https://jsonplaceholder.typicode.com/todos' + '?' + Date.now() )
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    commit('incrementar',cant)
            })
        },
        contarDown({commit}, cant) {
            commit('decrementar',cant)
        }
    },
    mutations: {
        incrementar(state, paso) {
            //console.log('incrementar mutation', new Date().toLocaleString())
            console.log('incrementar mutation', Date.now())
            state.contador += paso
        },
        decrementar(state, paso) {
            state.contador -= paso
        }
    }
})