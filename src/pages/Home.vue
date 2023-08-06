<template>
  <main>
    <div class="full-height-section first text-light" style="background-color: #1e2124;">
      <div class="container-fluid">
        <div class="row g-2">
          <div class="col-md-8 ms-md-5">
            <a href="https://www.youtube.com/watch?v=2wvqBMjPmqk&pp=ygUYcG9ueXRhaWwgdG8gc2h1c2h1IGprdDQ4" target="_blank">
              <img class="img-fluid rounded-4"
                src="https://res.cloudinary.com/haymzm4wp/image/upload/h_400,f_auto/v1689086407/assets/img/jkt48banner_nvyix5.png"
                alt="">
            </a>

            <div class="row mt-4">
              <h3>Live</h3>
              <div class="col-md-12 mt-2">
                <div class="container rounded-4 p-4" style="background-color: #282b30;">
                  <div v-if="loading">
                    <p>Loading...</p>
                  </div>
                  <div v-else>
                    <div class="row">
                      <div v-if="onlivesData.length > 0">
                        <div v-for="live in onlivesData" :key="live.room_id" class="col-md-4">
                          <a :href="'https://www.showroom-live.com/room/profile?room_id=' + live.room_id" target="_blank">
                            <div class="card rounded-4" style="background-color: #1e2124;">
                              <img :src="live.image" class="card-img rounded-4" :alt="live.main_name">
                              <div class="card-body text-light">
                                <h5 class="card-title">{{ live.main_name }}</h5>
                                <p class="card-text">Viewers: {{ live.view_num }}</p>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div v-else>
                        <p>No onlives available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-4 g-2">
              <h3>Room Member</h3>
              <hr>
              <div v-if="loading">
                <p>Loading...</p>
              </div>
              <div v-else>
                <div class="row g-2">
                  <div v-for="user in allMembers" :key="user.id" class="col-md-4 col-sm-6 mt-1 mb-1"
                    @click="redirectToMemberInfo(user.id)">
                    <div class="card text-light shadow rounded-4" style="background-color: #282b30;">
                      <img :src="user.image_url ?? user.image" class="card-img rounded-4"
                        :alt="user.name ?? user.main_name">
                      <div class="card-body">
                        <p class="card-title"><b>{{ user.name ?? user.main_name }}</b></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3">
            <div class="card rounded-4 shadow" style="background-color: #282b30;">
              <div class="card-body text-light">
                <h5>Recent Live</h5>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>

<script>
import { getShowroomData } from '../components/api';

export default {
  data() {
    return {
      allMembers: [],
      onlivesData: [],
      traineeData: [],
      loading: true, // Mulai dengan menampilkan loading

    };
  },
  async mounted() {
    // Contoh penggunaan function untuk mengambil data dari API Showroom
    const [members, academyData] = await Promise.all([
      getShowroomData('rooms'),
      getShowroomData('rooms/academy'),
    ]);
    this.traineeData = await getShowroomData('rooms/trainee');
    this.onlivesData = await this.getOnlivesData();

    this.allMembers = [...members, ...academyData];
    this.loading = false;
  },

  methods: {
    // Fungsi untuk mengalihkan ke halaman informasi member
    redirectToMemberInfo(roomId) {
      this.$router.push({ path: `/member/${roomId}` });
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
