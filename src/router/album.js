export default [
  {
    path: '/albums',
    name: 'AlbumList',
    component: () => import('../views/albums/AlbumList.vue')
  },
  {
    path: '/albums/create',
    name: 'AlbumCreate',
    component: () => import('../views/albums/AlbumDetail.vue'),
    props: {edit: true}
  },
  {
    path: '/albums/:pk',
    name: 'AlbumDetail',
    component: () => import('../views/albums/AlbumDetail.vue'),
    props: true
  },
  {
    path: '/albums/:pk/edit',
    name: 'AlbumEdit',
    component: () => import('../views/albums/AlbumDetail.vue'),
    props: route => ({...route.params, edit: true})
  }
]
