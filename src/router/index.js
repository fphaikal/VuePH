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
import News from '../pages/news/[id].vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home | VuePH',
        description: 'Di website ini anda dapat melihat kapan member terakhir kali live dan melihat live SHOWROOM member, serta schedule dan berita resmi dari JKT48',
      },
    },
    {
      path: '/about',
      name: 'about', 
      component: AboutView,   
      meta: {
        title: 'About | VuePH',
        description: 'Perjalanan bagaimana website ini dibuat',
      },
    },
    {
      path: '/member/:memberName/:roomId',
      name: 'MemberInfo',
      component: MemberInfo,
      meta: {
        title: 'Member Room | VuePH',
        description: 'Disini anda dapat melihat biodata member, statistik selama live SHOWROOM, dan history live SHOWROOM member'
      },
    },
    {
      path: '/setlist/:setlistId',
      name: 'SetlistInfo',
      component: SetlistInfo,
      meta: {
        title: 'Setlist | VuePH',
      },
    },
    {
      path: '/theater-schedules',
      name: 'schedules',
      component: TheaterSchedules,
      meta: {
        title: 'Theater | VuePH',
        description: 'Jadwal Theater JKT48'
      },
    },
    {
      path: '/recent-live',
      name: 'recentLive',
      component: RecentLiveView,
      meta: {
        title: 'Recent Live | VuePH',
      },
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
      meta: {
        title: 'List Member | VuePH',
      },
    },
    {
      path: '/news/detail/:idNews',
      name: 'news',
      component: News,
      meta: {
        title: 'News | VuePH',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'pagenotfound',
      component: PageNotFound,
      meta: {
        title: 'Page Not Found | VuePH',
      },
    },

    
  ]
})

router.addRoute({
  path: '/sitemap.xml',
  component: () => import('../../dist/sitemap.xml'),
});

export default router;
