<script setup>
import formatLongDate from "../utils/formatLongDate"
import formatLiveDuration from "../utils/formatLiveDuration"
import formatNumber from "../utils/formatNumber"
import formatTimeAgo from "../utils/formatTimeAgo"
</script>

<template>
  <div class="full-height-section" style="background-color: #1e2124">
    <div class="container">
      <div v-if="liveDetail">
        <div class="row mt-4 mb-4 text-light">
          <div class="col-md-9 col-12">

            <RouterLink :to="'/member/' + liveDetail.room_info.url + '/' + liveDetail.room_id" class="row text-light">
              <div class="col-md-2 col-3 my-auto">
                <div class="ratio ratio-1x1" style="position: relative;">
                  <img :src="liveDetail.room_info.img_alt" class="card-img-top rounded-circle my-auto" 
                        style="object-fit: cover; position: absolute; width: 100%; height: 100%; top: 0; left: 0;"
                        alt="...">
                </div>
              </div>
              <div class="col-md-10 col-9 my-auto">
                <h2>{{ liveDetail.room_info.name }}</h2>
                <div class="badge rounded-pill text-bg-success">Generasi {{ getGeneration(liveDetail.room_info.generation) }}</div>
              </div>
            </RouterLink>
            <hr>
          
            <div class="row g-2">
              <div class="col-md-6 col-6">
                <div class="card text-bg-success text-center rounded-4 border-0 ">
                  <div class="card-body">
                    <text>Mulai</text>
                    <h5>{{ formatLongDate(liveDetail.live_info.date.start) }}</h5>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-6">
                <div class="card text-bg-danger text-center rounded-4 border-0">
                  <div class="card-body">
                    <text>Selesai</text>
                    <h5>{{ formatLongDate(liveDetail.live_info.date.end) }}</h5>
                  </div>
                </div> 
              </div>
            </div>
            <div class="row g-1 mt-1">             
              <div class="col-12 rounded-4" style="background-color: #282b30;">
                <div class="row p-3 g-2">           
                  <div class="col-md-6 col-6">
                    <div class="card text-light text-center rounded-4 border-0" style="background-color: #1e2124;">
                      <div class="card-body">
                        <text>Durasi</text>
                        <h5>{{ formatLiveDuration(liveDetail.live_info.duration) }}</h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-6">
                    <div class="card text-light text-center rounded-4 border-0" style="background-color: #1e2124;">
                      <div class="card-body">
                        <text>Penonton</text>
                        <h5>{{ formatNumber(liveDetail.live_info.viewers.num) }}({{ formatNumber(liveDetail.live_info.viewers.active) }})</h5>
                      </div>
                    </div>
                  </div>
                    <div class="col-md-6 col-6" v-if="liveDetail.live_info.comments">
                      <div class="card text-light text-center rounded-4 border-0" style="background-color: #1e2124;">
                        <div class="card-body">
                          <text>Komentar</text>
                          <h5>{{ formatNumber(liveDetail.live_info.comments.num) }} ({{ formatNumber(liveDetail.live_info.comments.users) }})</h5>
                        </div>
                      </div>
                    </div>
                  <div class="col-md-6 col-6">
                    <div class="card text-light text-center rounded-4 border-0" style="background-color: #1e2124;">
                      <div class="card-body">
                        <text>Total Gift</text>
                        <h5>{{ formatNumber(liveDetail.total_point) }}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row g-2 mt-1">
              <div class="col-12 p-3 rounded-4" style="background-color: #282b30;"> 
                <h3>Fans Teratas</h3>
                <div v-if="liveDetail">
                  <div class="row mt-4">
                    <div v-for="fan, index in liveDetail.fans.slice(0, smScreen?5 : 12)" :key="fan.id" class="col-md-4 mb-3">   
                      <div class="row g-2">
                        <div class="col-md-1 col-1 my-auto text-center">
                          <small>{{ index+1 }}</small>
                        </div>             
                        <div class="col-md-3 col-2 my-auto mx-auto text-center">
                          <img :src="'https://static.showroom-live.com/image/avatar/'+fan.avatar_id + '.png'" class="img-fluid" width="100" alt="">
                        </div>    
                        <div class="col-md-7 col-7 my-auto">
                          <h6 class="text-truncate mb-0">{{ fan.name }}</h6>
                          <small>Score: {{ formatNumber(fan.fans_point) }}</small>
                        </div>
                      </div>              
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row g-1 mt-2">
              <div class="col-12 rounded-4" style="background-color: #282b30">
                <div class="row p-3">
                  <div class="col-12">
                    <h3>Gift List</h3>

                    <div class="row mt-3 g-1">
                      <div v-for="data in liveDetail.live_info.gift.list" class="col-md-4 mb-3">
                        <div class="row g-1">
                          <div class="col-2 my-auto">
                            <img :src="data.img" class="img-fluid" width="100" alt="">
                          </div>
                          <div class="col-10 my-auto">
                            <h6 class="m-0 my-auto">{{ data.name }} <span class="badge text-bg-success">x{{ data.num }}</span></h6>
                            <a>{{ formatNumber(data.point) }}pts 
                              <span class="my-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="currentColor" class="bi bi-people-fill my-auto me-1 ms-1" viewBox="0 0 16 16">
                                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                                </svg>
                                <small>{{ data.user_count }}</small>
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="row mt-2 d-md-none">
              <div class="col-md-12">
                <div id="carouselExample" class="carousel slide">
                  <div class="carousel-inner">
                    <div v-for="ssId, index in liveDetail.live_info.screenshot.list" :key="ssId">
                      <div :class="['carousel-item', index === 0 ? 'active' : '']">
                        <div class="ratio ratio-16x9" style="position: relative;">
                          <img :src="getImageUrl(ssId)" class="mt-1 img-fluid rounded-3" style="object-fit: cover; position: absolute; width: 100%; height: 100%; top: 0; left: 0;" alt="">
                        </div>
                      </div>
                    </div>                    
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3 d-none d-md-block">
            <div class="card rounded-4" style="background-color: #282b30;">
              <div class="card-body">
                <h4 class="card-title text-light">Screenshot</h4>
                <div v-if="liveDetail && liveDetail.live_info.screenshot.list">
                  <div v-for="ssId in liveDetail.live_info.screenshot.list" :key="ssId">
                    <img :src="getImageUrl(ssId)" class="img-fluid mt-1 rounded-3" alt="">
                  </div>
                </div>
              </div>
            </div>            
          </div>
        </div>
        <div class="text-light">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useHead } from "@unhead/vue";
import { getRecentLiveDetail } from "../components/api";

export default {
  data() {
    return {
      smScreen: false,
      liveDetail: null,
    };
  },
  async mounted() {
    try {
      const getDataId = this.$route.params.dataId;
      this.liveDetail = await getRecentLiveDetail(`recent/${getDataId}`);

      this.getName = await this.liveDetail.room_info.name
      this.getImage = await this.liveDetail.room_info.img
      this.getRoomKey = await this.liveDetail.room_info.url
      this.getRoomId = await this.liveDetail.room_id
      
    } catch (error) {
      console.log(error);
    }
    useHead({
        title: `${this.getName}- Recent Live | VuePH`,
        meta: [
          {
            name: 'description',
            content: `Lihatlah rekapan dari live SHOWROOM terbaru ${this.getName}`,
          },
          {
            property: 'og:title',
            content: `${this.getName}`,
          },
          {
            property: 'og:description',
            content: `Lihatlah rekapan dari live SHOWROOM terbaru ${this.getName}`,
          },
          {
            property: 'og:image',
            content: `${this.getImage}`,
          },
          {
            property: 'og:url',
            content: `https://vueph.fphaikal.my.id/member/${this.getRoomKey}/${this.getRoomId}`,
          },
        ],
      })
  },
  created() {
    // Saat komponen di-load, cek ukuran layar dan atur smScreen
    this.updateScreenSize();
    // Tambahkan event listener untuk memperbarui smScreen saat ukuran layar berubah
    window.addEventListener('resize', this.updateScreenSize);
  },
  beforeDestroy() {
    // Hapus event listener saat komponen dihancurkan
    window.removeEventListener('resize', this.updateScreenSize);
  },
  methods: {
    getGeneration(generation) {
      // Mencari angka dalam string "generation"
      const number = generation.match(/\d+/);

      if (number) {
        return number[0];
      } else {
        return 'Unknown';
      }
    },
    
    getImageUrl(screenshotId) {
      const { folder, format } = this.liveDetail.live_info.screenshot;
      return `https://res.cloudinary.com/haymzm4wp/image/upload/${folder}/${screenshotId}.${format}`;
    },
    updateScreenSize() {
      // Periksa ukuran layar dan atur smScreen berdasarkan kondisi
      this.smScreen = window.innerWidth < 768; // Angka 768 mewakili lebar md (medium)
    }
  },
};
</script>
