<template>
  <main>
    <div
      class="full-height-section text-light"
      style="background-color: #1e2124"
    >
      <div class="container-fluid">
        <div v-if="memberLive">        
          <div v-if="memberLive.is_live && liveInfo">
            <div class="row g-2">
              <div class="col-md-9">
                <video-player :options="videoOptions"></video-player>
                <div class="row mt-3">
                  <div class="col-md-2 col-4 my-auto">
                    <img
                      :src="memberLive.image"
                      class="img-fluid rounded-4"
                      alt=""
                    />
                  </div>
                  <div class="col-md-8 col-8 my-auto">
                    <h3 class="">{{ memberLive.name }}</h3>
                    <div class="badge rounded-pill text-bg-danger my-auto">
                      <div class="d-flex align-items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-star-fill me-1"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                          />
                        </svg>
                        {{ liveInfo.viewers }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card rounded-4" style="background-color: #282b30">
                  <div class="card-body text-light">
                    <h5 class="card-title">Comments</h5>
                    <div
                      class="overflow-y-scroll overflow-x-hidden mt-4"
                      style="max-height: 500px"
                    >
                      <div
                        v-for="(comment, index) in comments"
                        :key="comment.ua"
                        class="row g-2"
                      >
                        <div class="col-2 my-auto text-center">
                          <img
                            :src="comment.avatar_url"
                            alt="Avatar"
                            class="img-fluid rounded-circle"
                            style="max-width: 30px"
                          />
                        </div>
                        <div class="col-8 my-auto">
                          <b>{{ comment.name }}</b> <br />
                          {{ comment.comment }}
                        </div>
                        <hr />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="row p-0 g-2">
              <div class="col-md-9">
                <div class="ratio ratio-16x9">
                  <div class="card rounded-4 text-light" style="background-color: #282b30;">
                    <div class="card-body d-flex justify-content-center align-items-center">
                      <h3>{{ memberLive.name }}</h3>                    
                    </div>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-2 col-4 my-auto">
                    <img
                      :src="memberLive.image"
                      class="img-fluid rounded-4"
                      alt=""
                    />
                  </div>
                  <div class="col-md-8 col-8 my-auto">
                    <h3 class="">{{ memberLive.name }}</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card rounded-4" style="background-color: #282b30;">
                  <div class="card-body text-light ">
                    <h5 class="card-title">Comments</h5>
                    <div class="row d-flex text-center align-items-center" style="height: 300px;">
                      <div class="col-12">
                        <h5></h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="onlivesData.length > 0" class="card rounded-4 mt-2 mb-2" style="background-color: #282b30;">
                  <div class="card-body text-light ">
                    <h5 class="card-title mb-3">Live</h5>
                    <div v-for="live in onlivesData" :key="live.room_id" class="">
                      <RouterLink :to="'/watch/' + live.room_url_key+ '/' + live.room_id">
                        <div class="card rounded-4" style="background-color: #1e2124;">
                          <img :src="live.image" class="card-img rounded-top-4" :alt="live.main_name">
                          <div class="card-body text-light">
                            <h5 class="card-title">{{ live.main_name }}</h5>
                            <p class="card-text">Viewers: {{ live.view_num }}</p>
                          </div>
                        </div>
                      </RouterLink>
                    </div>
                  </div>
                </div>
                <div v-else></div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="row p-0 g-2">
            <div class="col-md-9">
              <div class="ratio ratio-16x9">
                <div class="card rounded-4 text-light" style="background-color: #282b30;">
                  <div class="card-body d-flex justify-content-center align-items-center">
                    <h3>{{ memberLive.name }}Sedang Offline</h3>                    
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-2 col-4 my-auto">
                  <img
                    :src="memberLive.image"
                    class="img-fluid rounded-4"
                    alt=""
                  />
                </div>
                <div class="col-md-8 col-8 my-auto">
                  <h3 class="">{{ memberLive.name }}</h3>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card rounded-4" style="background-color: #282b30;">
                <div class="card-body text-light ">
                  <h5 class="card-title">Comments</h5>
                  <div class="row d-flex text-center align-items-center" style="height: 300px;">
                    <div class="col-12">
                      <h5>Tidak Ada Data yang Dapat Ditampilkan</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="onlivesData.length > 0" class="card rounded-4 mt-2 mb-2" style="background-color: #282b30;">
                <div class="card-body text-light ">
                  <h5 class="card-title mb-3">Live</h5>
                  <div v-for="live in onlivesData" :key="live.room_id" class="">
                    <RouterLink :to="'/watch/' + live.room_url_key+ '/' + live.room_id">
                      <div class="card rounded-4" style="background-color: #1e2124;">
                        <img :src="live.image" class="card-img rounded-top-4" :alt="live.main_name">
                        <div class="card-body text-light">
                          <h5 class="card-title">{{ live.main_name }}</h5>
                          <p class="card-text">Viewers: {{ live.view_num }}</p>
                        </div>
                      </div>
                    </RouterLink>
                  </div>
                </div>
              </div>
              <div v-else></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import VideoPlayer from "../components/VideoPlayer.vue";
import {
  getLive,
  getShowroomData,
  getShowroomDataDetail,
  getLiveInfo
} from "../components/api";

export default {
  name: "LiveWatchView",
  components: {
    VideoPlayer,
  },
  data() {
    return {
      videoOptions: {
        autoplay: true,
        controls: true,
        sources: [],
      },
      memberLive: {},
      liveInfo: {},
      intervalId: null,
      comments: [], // Daftar komentar yang akan ditampilkan
      onlivesData: [],

    };
  },
  async mounted() {
    const urlKey = this.$route.params.room_url_key;
    const roomId = this.$route.params.roomId;
    this.memberLive = await getLive(`${urlKey}`);
    this.setVideoSources();
    this.startPolling(); // Mulai polling ketika komponen dimuat
    this.liveInfo = await getLiveInfo(`${roomId}`);
    this.onlivesData = await this.getOnlivesData();

  },
  beforeDestroy() {
    this.stopPolling();
  },
  methods: {
    setVideoSources() {
      // Mengisi sources dengan data dari streaming_url_list
      this.videoOptions.sources = this.memberLive.streaming_url_list.map(
        (urlItem) => {
          return {
            src: urlItem.url,
            type: "application/x-mpegURL",
          };
        }
      );
    },
    async fetchComments() {
      try {
        const roomId = this.$route.params.roomId; // Menggunakan roomId
        const response = await getShowroomData(
          `lives/comments/${roomId}/SQghJNnUPttxNbRudspw5Oo9Cnf_X16jFXvKjRkl_QrQzgzQcHvr0jlLoI7JL02z`
        );
        const newComments = response; // Menggunakan data dari URL yang diberikan

        // Tambahkan komentar terbaru ke awal comments
        this.comments.unshift(...newComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },
    startPolling() {
      this.intervalId = setInterval(() => {
        this.fetchComments();
      }, 1000); // Polling setiap 5 detik (sesuaikan dengan kebutuhan Anda)
    },
    stopPolling() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    },
    getShortName(ShortName) {
      return ShortName.replace("（JKT48）", "");
    },
    async getOnlivesData() {
      try {
        const response = await fetch('https://jkt48-showroom-api.vercel.app/api/rooms/onlives');
        const data = await response.json();
        return data.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
};
</script>
