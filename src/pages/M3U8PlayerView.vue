<template>
    <main>
      <div class="full-height-section" style="background-color: #1e2124">
        <div class="container">
          <div class="row mt-5">
            <div class="col-12">
                <h2 class="text-center text-light">M3U8 Player</h2>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-3"></div>
            <div class="col-6 my-auto">
              <div class="input-group mb-3">
                <input
                  v-model="m3u8Input"
                  class="form-control"
                  placeholder="Isi dengan url m3u8"
                />
                <button class="btn btn-success" type="button" id="button-addon2" @click="playVideo">
                  Play
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <!-- Hanya tampilkan VideoPlayer jika sources tidak kosong -->
              <video-player v-if="videoOptions.sources.length > 0" :options="videoOptions" key="videoPlayerKey"></video-player>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script>
  import VideoPlayer from "../components/VideoPlayer.vue";
  
  export default {
    name: "LiveWatchView",
    components: {
      VideoPlayer,
    },
    data() {
      return {
        m3u8Input: '', // Menambahkan m3u8Input ke data
        videoOptions: {
          autoplay: false,
          controls: true,
          sources: [],
        },
      };
    },
    watch: {
        m3u8Input: {
        handler: "playVideo",
        immediate: true, // Memanggil playVideo saat komponen pertama kali dimuat
        },
    },
    async mounted() {
      this.playVideo();  
    },
    methods: {
      playVideo() {        
        this.videoOptions.sources = this.m3u8Input.trim(
        (urlItem) => {
          return {
            src: urlItem.url,
            type: 'application/x-mpegURL',
          };
        },
        console.log(this.videoOptions.sources)

      );
      },
    },
  };
  </script>
  