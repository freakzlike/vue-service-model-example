export default [
  {
    path: '/users',
    name: 'UserList',
    component: () => import('../views/users/UserList.vue')
  },
  {
    path: '/users/create',
    name: 'UserCreate',
    component: () => import('../views/users/UserDetail.vue'),
    props: {edit: true}
  },
  {
    path: '/users/:pk',
    name: 'UserDetail',
    component: () => import('../views/users/UserDetail.vue'),
    props: true
  },
  {
    path: '/users/:pk/edit',
    name: 'UserEdit',
    component: () => import('../views/users/UserDetail.vue'),
    props: route => ({...route.params, edit: true})
  }
]
