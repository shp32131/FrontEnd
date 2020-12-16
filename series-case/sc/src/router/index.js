import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  router: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/layout/')
    }
  ]
})

export default router