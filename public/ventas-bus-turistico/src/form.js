import Vue from 'vue'
import VueForm from 'vue-form'

var options = {
  validators : {
    'sin-espacios': function(value, attrvalue, vnode) {
      console.log(vnode.elm.value)
      return value.indexOf(' ')<0
    }
  }
}

Vue.use(VueForm, options)
