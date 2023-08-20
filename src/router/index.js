import { createRouter, createWebHistory } from 'vue-router'
import MemberInfo from '../pages/MemberInfo.vue' //halaman informasi user
import HomeView from '../pages/Home.vue'
import SetlistInfo from '../pages/SetlistInfo.vue'
import TheaterSchedules from '../pages/TheaterSchedules.vue'
import RecentLiveView from '../pages/RecentLiveView.vue'

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
      path: '/member/:memberName/:roomId',
      name: 'MemberInfo',
      component: MemberInfo,
    },
    {
      path: '/setlist/:setlistId',
      name: 'SetlistInfo',
      component: SetlistInfo,
    },
    {
      path: '/theater-schedules',
      name: 'schedules',
      component: TheaterSchedules,
    },
    {
      path: '/recent-live',
      name: 'recentLive',
      component: RecentLiveView,
    },
  ]
})

export default router
