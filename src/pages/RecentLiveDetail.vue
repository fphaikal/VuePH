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
          <div class="col-9">

            <div class="row">
              <div class="col-2 my-auto">
                <div class="ratio ratio-1x1" style="position: relative;">
                  <img :src="liveDetail.room_info.img_alt" class="card-img-top rounded-circle my-auto" 
                        style="object-fit: cover; position: absolute; width: 100%; height: 100%; top: 0; left: 0;"
                        alt="...">
                </div>
              </div>
              <div class="col-10 my-auto">
                <h2>{{ liveDetail.room_info.name }}</h2>
                <Generation class="badge rounded-pill text-bg-success">Generasi {{ getGeneration(liveDetail.room_info.generation) }}</Generation>
              </div>
            </div>
            <hr>

            <div class="row g-1">
              <div class="col-12 rounded-4" style="background-color: #282b30;">
                <div class="row p-3 g-3">
                  <div class="col-md-3 ">
                    <div class="card text-light text-center rounded-4" style="background-color: #1e2124;">
                      <div class="card-body">
                        <text>Durasi</text>
                        <h5>{{ formatLiveDuration(liveDetail.live_info.duration) }}</h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 ">
                    <div class="card text-light text-center rounded-4" style="background-color: #1e2124;">
                      <div class="card-body">
                        <text>Penonton</text>
                        <h5>{{ formatNumber(liveDetail.live_info.viewer) }}({{ formatNumber(liveDetail.live_info.active_viewer) }})</h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 ">
                    <div class="card text-light text-center rounded-4" style="background-color: #1e2124;">
                      <div class="card-body">
                        <text>Komentar</text>
                        <h5>{{ formatNumber(liveDetail.live_info.comments.num) }} ({{ formatNumber(liveDetail.live_info.comments.users) }})</h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="card text-light text-center rounded-4" style="background-color: #1e2124;">
                      <div class="card-body">
                        <text>Total Gift</text>
                        <h5>{{ formatNumber(liveDetail.total_point) }}</h5>
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
                                <a>{{ data.user_count }}</a>
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
          </div>

          <div class="col-3">            
          </div>
        </div>
        <div class="text-light">
        </div>
        <div class="row">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecentLiveDetail } from "../components/api";

export default {
  data() {
    return {
      liveDetail: null,
    };
  },
  async mounted() {
    try {
      const getDataId = this.$route.params.dataId;

      this.liveDetail = await getRecentLiveDetail(`recent/${getDataId}`);
    } catch (error) {
      console.log(error);
    }
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
    }
  }
};
</script>
