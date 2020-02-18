import Vue from 'vue'
import App from './App.vue'
import "./registerServiceWorker";

import 'jquery'
import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

import router from './router'
import store from './store'
import './form'
import './filters'
import './mixins'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
