import { createRouter, createWebHistory } from 'vue-router'
import MemberInfo from '../pages/MemberInfo.vue' //halaman informasi user
import HomeView from '../pages/Home.vue'
import SetlistInfo from '../pages/SetlistInfo.vue'

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
      path: '/member/:roomId',
      name: 'MemberInfo',
      component: MemberInfo,
    },
    {
      path: '/setlist/:setlistId',
      name: 'SetlistInfo',
      component: SetlistInfo,
    }
  ]
})

export default router
