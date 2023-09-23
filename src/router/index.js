import { createRouter, createWebHistory } from 'vue-router'
import MemberInfo from '../pages/MemberInfo.vue' //halaman informasi user
import HomeView from '../pages/Home.vue'
import SetlistInfo from '../pages/SetlistInfo.vue'
import TheaterSchedules from '../pages/TheaterSchedules.vue'
import RecentLiveView from '../pages/RecentLiveView.vue'
import RecentLiveDetail from '../pages/RecentLiveDetail.vue'
import AboutView from '../pages/AboutView.vue'
import LiveWatch from '../pages/LiveWatchView.vue'
import M3U8Player from '../pages/M3U8PlayerView.vue'
import PageNotFound from '../components/PageNotFound.vue'
import MemberRoom from '../components/Home/memberSection.vue'

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
      component: AboutView,     
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
    {
      path: '/recent-live/:memberName/:dataId',
      name: 'RecentLiveDetail',
      component: RecentLiveDetail,
    },
    {
      path: '/watch/:room_url_key/:roomId',
      name: 'LiveWatch',
      component: LiveWatch
    },
    {
      path: '/watch/m3u8',
      name: 'm3u8player',
      component: M3U8Player,
    },
    {
      path: '/member',
      name: 'memberRoom',
      component: MemberRoom,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'pagenotfound',
      component: PageNotFound
    },
  ]
})


export default router;
