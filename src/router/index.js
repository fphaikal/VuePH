import { createRouter, createWebHistory } from 'vue-router'
import MemberInfo from '../pages/Member.vue' //halaman informasi user
import HomeView from '../pages/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/AboutView.vue')
    },
    {
      path: '/member/:id',
      name: 'MemberInfo',
      component: MemberInfo
    }
  ]
})

export default router
