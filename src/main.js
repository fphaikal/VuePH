//Custom CSS
import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import "video.js/dist/video-js.css"
import "videojs-watermark/dist/videojs-watermark.css"

import App from './App.vue'
import router from './router'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'


const app = createApp(App)
const head = createHead()

app.config.head = {
    title: "VuePH",
  };
  
app.use(head)
app.use(createPinia())
app.use(router)
app.mount('#app')


