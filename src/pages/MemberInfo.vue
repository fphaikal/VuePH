<script setup>
import formatLongDate from "../utils/formatLongDate";
import formatLiveDuration from "../utils/formatLiveDuration";
import formatNumber from "../utils/formatNumber";
import formatTimeAgo from "../utils/formatTimeAgo";
import { RouterLink } from "vue-router";
</script>
<template>
  <main>
    <div class="full-height-section text-light" style="background-color: #1e2124">
      <div v-if="memberInfo || memberInfoDetail || historyLive" class="container">
        <div class="row mt-3">
          <div class="col-md-1 text-center my-auto">
            <img :src="memberInfo.image_square" class="img-fluid rounded-circle mobile-image" alt="" />
          </div>
          <div class="col-md-8 my-auto d-flex justify-content-center justify-content-md-start">
            <h2>
              <b>{{ memberInfo.main_name }}</b>
            </h2>
          </div>
          <div class="col-md-3 my-auto d-flex justify-content-center justify-content-md-end">
            <Generation class="p-2 rounded-pill text-bg-success">
              <small class="mb-0 m-3">
                Generasi {{ getGeneration(memberInfoDetail.generation) }}
              </small>
            </Generation>
          </div>
        </div>
        <hr />

        <div class="row g-3">
          <div class="col-md-4">
            <div class="card rounded-4 shadow mb-2" style="background-color: #282b30">
              <img :src="memberInfo.image" class="card-img rounded-top-4 shadow d-none d-md-block" alt="Test" />
              <div v-if="memberInfo.is_onlive">
                <RouterLink :to="'/watch/' + memberInfo.room_url_key + '/' + memberInfo.id" class="card-body text-light text-center">
                  <b>Room Sedang Online</b>
                </RouterLink>
              </div>
              <div v-else>
                <div class="card-body text-light text-center">
                  <b>Room Sedang Offline</b>
                </div>
              </div>
            </div>

            <hr class="d-none d-sm-block" />
            <div v-if="onlivesData.length > 0" class="d-none d-sm-block">
              <div class="card rounded-4" style="background-color: #282b30">
                <div class="card-body">
                  <h5 class="text-light mb-3">Room Online</h5>
                  <div v-for="live in onlivesData" :key="live.room_id" class="">
                    <RouterLink :to="'/watch/' + live.room_url_key + '/' + live.room_id">
                      <div class="card rounded-4" style="background-color: #1e2124">
                        <img :src="live.image" class="card-img rounded-top-4" :alt="live.main_name" />
                        <div class="card-body text-light">
                          <h5 class="card-title">{{ live.main_name }}</h5>
                          <p class="card-text">Viewers: {{ live.view_num }}</p>
                        </div>
                      </div>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="row g-2">
              <div class="col-md-3 col-6">
                <div class="card rounded-4 shadow" style="background-color: #282b30">
                  <div class="card-body text-light">
                    Tanggal Lahir: <br />
                    <b>{{ displayBirthday(memberInfo.description) }}</b>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="card rounded-4 shadow" style="background-color: #282b30">
                  <div class="card-body text-light">
                    Zodiac Signs: <br /><b>{{ zodiac }}</b>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="card rounded-4 shadow" style="background-color: #282b30">
                  <div class="card-body text-light">
                    Tinggi Badan: <br /><b>{{ memberInfoDetail.height }}</b>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-6">
                <div class="card rounded-4 shadow" style="background-color: #282b30">
                  <div class="card-body text-light">
                    Golongan Darah: <br /><b>{{
                      memberInfoDetail.bloodType
                    }}</b>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-md-12">
                <div class="card rounded-4 shadow" style="background-color: #282b30">
                  <div class="card-body text-light">
                    <h5 class="mb-0">Jikoshoukai</h5>
                    <h6 class="mt-3">{{ memberInfoDetail.jikosokai }}</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-2 mb-2">
              <div class="col-md-12">
                <div class="card rounded-4 shadow" style="background-color: #282b30">
                  <div class="card-body text-light">
                    <h5>Deskripsi</h5>
                    <p class="mt-3" v-html="formatDescription(memberInfo.description)"></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row g-2">
              <div v-for="socmed in memberInfoDetail.socials" class="col-md-3 col-6">
                <div class="d-grid">
                  <a class="btn btn-light rounded-4" :href="socmed.url">{{
                    socmed.title
                  }}</a>
                </div>
              </div>
            </div>
            <div class="row mt-2 mb-2">
              <div class="col-md-12">
                <a href="https://www.youtube.com/watch?v=2wvqBMjPmqk&pp=ygUYcG9ueXRhaWwgdG8gc2h1c2h1IGprdDQ4"
                  target="_blank">
                  <img class="img-fluid rounded-4"
                    src="https://res.cloudinary.com/haymzm4wp/image/upload/h_400,f_auto/v1689086407/assets/img/jkt48banner_nvyix5.png"
                    alt="Ponytail and Shu-Shu | New MV JKT48" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!--Statistik Section-->
        <div class="row mt-4">
          <div class="col-md-6 col-4 my-auto">
            <h3>Statistik</h3>
          </div>
          <div class="col-md-6 col-8 my-auto d-flex justify-content-end">
            <div class="btn-group" role="group" aria-label="Statistik">
              <input type="radio" class="btn-check" name="btnradio" id="btnradio1" v-model="selectedOption"
                value="7 Hari" />
              <label class="btn rounded-start-4 text-light" style="background-color: #282b30" for="btnradio1">7
                Hari</label>

              <input type="radio" class="btn-check" name="btnradio" id="btnradio2" v-model="selectedOption"
                value="4 Minggu" />
              <label class="btn text-light" style="background-color: #282b30" for="btnradio2">4 Minggu</label>

              <input type="radio" class="btn-check" name="btnradio" id="btnradio3" v-model="selectedOption" value="All" />
              <label class="btn rounded-end-4 text-light" style="background-color: #282b30" for="btnradio3">Semua</label>
            </div>
          </div>
        </div>

        <div v-if="selectedOption === '7 Hari'">
          <div v-if="statsWeek.stats.some(week => week.value > 0)">
            <div class="row g-2 p-0 mt-1">
              <div v-for="week in statsWeek.stats" class="col-md-3 col-6">
                <div class="card rounded-4 text-light" style="background-color: #282b30">
                  <div class="card-body ms-2">
                    <p class="card-title m-0">{{ week.title }}</p>
                    <h4 class="card-text">
                      <b>{{ week.value }}</b>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <!--Top Fans Scrion-->
            <div class="row g-1 mt-1" >
              <div class="col-12 rounded-4" style="background-color: #282b30">
                <div class="row p-3">
                  <div class="col-12">
                    <h3>Top Fans</h3>
                    <div class="row mt-3 g-1">
                      <div v-for="(data, index) in fansWeek.slice(0, 12)" :key="data.id" class="col-md-4 mb-3">
                        <div class="row g-1">
                          <div class="col-2 my-auto">
                            <img :src="`https://static.showroom-live.com/image/avatar/${data.avatar_id}.png`"
                              class="img-fluid" width="100" alt="">
                          </div>
                          <div class="col-10 my-auto">
                            <h6 class="m-0 my-auto">
                              {{ data.name }}
                            </h6>
                            <a>{{ formatNumber(data.fans_point) }}pts</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="row mt-2">
              <div class="col-12">
                <div class="card text-light rounded-4" style="background-color: #282b30;">
                  <div class="card-body text-center">
                    <h5 class="card-title m-0">Tidak Ada Data yang Ditampilkan</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="selectedOption === '4 Minggu'">
          <div v-if="statsMonthly.stats.some(month => month.value > 0)">
            <div class="row g-2 p-0 mt-1">
              <div v-for="month in statsMonthly.stats" class="col-md-3 col-6">
                <div class="card rounded-4 text-light" style="background-color: #282b30">
                  <div class="card-body ms-2">
                    <p class="card-title m-0">{{ month.title }}</p>
                    <h4 class="card-text">
                      <b>{{ month.value }}</b>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="row g-1 mt-1">
              <div class="col-12 rounded-4" style="background-color: #282b30">
                <div class="row p-3">
                  <div class="col-12">
                    <h3>Top Fans</h3>

                    <div class="row mt-3 g-1">
                      <div v-for="(data, index) in fansMonth.slice(0, 12)" :key="data.id" class="col-md-4 mb-3">
                        <div class="row g-1">
                          <div class="col-2 my-auto">
                            <img :src="`https://static.showroom-live.com/image/avatar/${data.avatar_id}.png`"
                              class="img-fluid" width="100" alt="">
                          </div>
                          <div class="col-10 my-auto">
                            <h6 class="m-0 my-auto">
                              {{ data.name }}
                            </h6>
                            <a>{{ formatNumber(data.fans_point) }}pts</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="row mt-2">
              <div class="col-12">
                <div class="card text-light rounded-4" style="background-color: #282b30;">
                  <div class="card-body text-center">
                    <h5 class="card-title m-0">Tidak Ada Data yang Ditampilkan</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="selectedOption === 'All'">
          <div v-if="statsAll">
            <div class="row g-2 p-0 mt-1">
              <div v-for="all in statsAll.stats" class="col-md-3 col-6">
                <div class="card rounded-4 text-light" style="background-color: #282b30">
                  <div class="card-body ms-2">
                    <p class="card-title m-0">{{ all.title }}</p>
                    <h4 class="card-text">
                      <b>{{ all.value }}</b>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="row g-1 mt-1">
              <div class="col-12 rounded-4" style="background-color: #282b30">
                <div class="row p-3">
                  <div class="col-12">
                    <h3>Top Fans</h3>

                    <div class="row mt-3 g-1">
                      <div v-for="(data, index) in fansAll.slice(0, 12)" :key="data.id" class="col-md-4 mb-3">
                        <div class="row g-1">
                          <div class="col-2 my-auto">
                            <img :src="`https://static.showroom-live.com/image/avatar/${data.avatar_id}.png`"
                              class="img-fluid" width="100" alt="">
                          </div>
                          <div class="col-10 my-auto">
                            <h6 class="m-0 my-auto">
                              {{ data.name }}
                            </h6>
                            <a>{{ formatNumber(data.fans_point) }}pts</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else></div>
        </div>

        <!--Recent Live Section-->
        <div class="row mt-4">
          <div class="col-12">
            <h3 class="mb-3">Recent Live</h3>
          </div>
        </div>
        <div class="overflow-x-hidden overflow-y-scroll mb-3 rounded-4" style="max-height: 600px">
          <div v-for="data in historyLive.recents" class="card rounded-4 text-light mt-2"
            style="background-color: #282b30">
            <RouterLink :to="'/recent-live/' + data.member.url + '/' + data.data_id">
              <div class="card-body text-light">
                <div class="row rounded-5">
                  <div class="col-md-3 col-4 my-md-auto">
                    <img :src="data.member.img" alt="" class="img-fluid rounded-4" />
                  </div>
                  <div class="col-md-8 col-8 my-auto">
                    <h4>{{ getShortName(data.member.name) }}</h4>

                    <div class="row">
                      <div class="col-auto d-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor"
                          class="bi bi-clock-fill my-auto" viewBox="0 0 16 16">
                          <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                        </svg>
                        <p class="my-auto ms-2">
                          {{ formatLiveDuration(data.live_info.duration) }}
                        </p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-auto d-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor"
                          class="bi bi-people-fill my-auto" viewBox="0 0 16 16">
                          <path
                            d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        </svg>
                        <p class="my-auto ms-2">
                          {{ formatNumber(data.live_info.viewers.num) }}
                        </p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-auto d-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor"
                          class="bi bi-gift-fill my-auto" viewBox="0 0 16 16">
                          <path
                            d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zm6 4v7.5a1.5 1.5 0 0 1-1.5 1.5H9V7h6zM2.5 16A1.5 1.5 0 0 1 1 14.5V7h6v9H2.5z" />
                        </svg>
                        <p class="my-auto ms-2">
                          {{ formatNumber(data.points) }}
                        </p>
                      </div>
                    </div>
                    <hr class="mt-1 mb-2" />
                    <div class="row">
                      <div class="col-auto d-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor"
                          class="bi bi-calendar-fill my-auto" viewBox="0 0 16 16">
                          <path
                            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5z" />
                        </svg>
                        <p class="my-auto ms-2">
                          {{ formatLongDate(data.live_info.date.start) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-else class="container">
        <div class="row mt-3">
          <div class="col-12 d-flex justify-content-center align-items-center">
            <div class="spinner-border text-success" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="my-auto ms-2">Loading..</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
@media (max-width: 767px) {
  .mobile-text-center {
    text-align: center;
  }
}

@media (max-width: 767px) {
  .mobile-image {
    max-width: 86px;
    max-height: 86px;
  }
}
</style>

<script >
import { getShowroomData, getShowroomDataDetail } from "../components/api";
import { useHead } from '@unhead/vue';

export default {
  data() {
    return {
      selectedOption: "7 Hari",
      memberInfo: null,
      birthday: null,
      zodiac: "",
      onlivesData: [],
      memberInfoDetail: null,
      historyLive: null,
      statsWeek: null,
      statsMonthly: [],
      statsAll: [],
      fansWeek: null,
      fansMonth: [],
      fansAll: [],
      
    };
  },
  
  async mounted() {
    try {
      const roomId = this.$route.params.roomId;
      const memberName = this.$route.params.memberName;
      // Ambil data member berdasarkan roomId
      this.memberInfo = await getShowroomData(
        `rooms/profile/${roomId}/SQghJNnUPttxNbRudspw5Oo9Cnf_X16jFXvKjRkl_QrQzgzQcHvr0jlLoI7JL02z`
      );

      this.getName = this.memberInfo.main_name;
      this.getImage = this.memberInfo.image;
      console.log(this.getImage)
      
      this.memberInfoDetail = await getShowroomDataDetail(
        `profile?room_url_key=${memberName}&id=${roomId}`
      );
      this.historyLive = await getShowroomDataDetail(
        `recent?sort=date&page=1&filter=active&order=-1&perpage=30&search=${this.getName}`
      );

      this.onlivesData = await this.getOnlivesData();
      this.zodiac = this.getZodiacFromDescription(this.memberInfo.description);

      if (this.memberInfo && this.memberInfo.is_onlive) {
        // Misalnya, Anda dapat mengakses waktu live saat ini dengan this.memberInfo.current_live_started_at
        console.log(
          "Current live started at:",
          this.memberInfo.current_live_started_at
        );
      }

      //GET Statistik API
      this.statsWeek = await getShowroomDataDetail(`stats?type=weekly&room_id=${roomId}`);
      this.statsMonthly = await getShowroomDataDetail(`stats?type=monthly&room_id=${roomId}`);
      this.statsAll = await getShowroomDataDetail(`stats?type=all&room_id=${roomId}`);

      this.fansWeek = this.statsWeek.ranks.fans
      this.fansMonth = this.statsMonthly.ranks.fans
      this.fansAll = this.statsAll.ranks.fans
    } catch (error) {
      console.error("Gagal mengambil data member:", error);
    }
    useHead({
      title: `${this.getName || 'VuePH'}| VuePH`,
      meta: [
        {
          property: 'og:image',
          content: `${this.getImage}`,
        },
      ],
    });
  },

  computed: {
    ogImage() {
      if (this.memberInfo) {
        return this.memberInfo.image;
      }
      return "";
    },
  },
  methods: {
    getShortName(ShortName) {
      return ShortName.replace("（JKT48）", "");
    },
    getGeneration(generation) {
      try {
        const number = generation.match(/\d+/);
  
        if (number) {
          return number[0];
        } else {
          return "Unknown";
        }
      } catch (error) {
        
      }
    },
    async getOnlivesData() {
      try {
        const response = await fetch(
          "https://jkt48-showroom-api.vercel.app/api/rooms/onlives"
        );
        const data = await response.json();
        return data.data;
      } catch (error) {
        console.error(error);
        return [];
      }
    },

    getZodiacFromDescription(description) {
      const zodiacIndex = description.indexOf("Zodiac signs:");
      if (zodiacIndex !== -1) {
        const zodiacStartIndex = zodiacIndex + 14; // Panjang teks "Zodiac signs:"
        const zodiacEndIndex = description.indexOf("\r\n", zodiacStartIndex); // Cari indeks akhir dari zodiac
        if (zodiacEndIndex !== -1) {
          return description.substring(zodiacStartIndex, zodiacEndIndex);
        } else {
          // Jika zodiac tidak memiliki karakter line break ("\r\n") setelahnya
          return description.substring(zodiacStartIndex);
        }
      }
      return "";
    },
    formatDescription(description) {
      // Mengganti karakter baris baru (\n) dengan tag HTML <br>
      const unwantedKeys = [
        "Birthday",
        "Zodiac",
        "Blood type",
        "Twitter",
        "Instagram",
      ];
      const lines = description.split("\n");
      const filteredLines = lines.filter(
        (line) => !unwantedKeys.some((key) => line.includes(key))
      );
      const sanitizedLines = filteredLines.map((line) =>
        line.replace(/"/g, "")
      ); // Menghapus tanda petik
      const filteredDescription = sanitizedLines.join("<br>");
      return filteredDescription;
    },
    displayBirthday(description) {
      // Pisahkan baris dalam description
      const lines = description.split("\r\n");

      // Cari baris yang berisi tanggal lahir
      const birthdayLine = lines.find((line) => line.startsWith("Birthday:"));

      // Jika tanggal lahir ditemukan, ambil tanggal lahir dari baris tersebut
      if (birthdayLine) {
        const birthday = birthdayLine.replace("Birthday:", "").trim();
        return `${birthday}`;
      }

      // Jika tanggal lahir tidak ditemukan, kembalikan teks default
      return "Tanggal Lahir Tidak Diketahui";
    },
    async getOnlivesData() {
      try {
        const response = await fetch(
          "https://jkt48-showroom-api.vercel.app/api/rooms/onlives"
        );
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
