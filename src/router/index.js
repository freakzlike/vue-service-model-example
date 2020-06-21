import Vue from 'vue'
import VueRouter from 'vue-router'

import user from './user'
import album from './album'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  ...user,
  ...album
]

const router = new VueRouter({
  routes
})

export default router
