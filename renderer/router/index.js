import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeView.vue'
import Msg from '../views/MsgView.vue'
import Input from '../views/InputView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/msg',
    name: 'msg',
    component: Msg
  },
  {
    path: '/input',
    name: 'input',
    component: Input
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
