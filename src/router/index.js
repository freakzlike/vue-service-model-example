import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/users/',
    name: 'UserList',
    component: () => import('../views/users/UserList.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
