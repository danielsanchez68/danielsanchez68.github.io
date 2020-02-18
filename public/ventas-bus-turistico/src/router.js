import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Login from './components/Login'
import Signup from './components/Signup'
import Panel from './components/Panel'

export default new VueRouter({
  mode: 'history',
  routes: [
    //{path: '/', redirect: '/entradas'},
    {path: '/clogin', component: Login, props: true},
    {path: '/csignup', component: Signup, props: true},
    {path: '/cpanel', component: Panel, props: true},
    {path: '*', redirect: '/clogin'}
  ]
})
