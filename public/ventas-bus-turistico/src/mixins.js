import Vue from 'vue'

var miMixin = {
    computed: {
      mostrarContadorVuex() {
        //return this.contador
        return this.$store.state.contador
      }
    }      
}

Vue.mixin(miMixin)