<template>
  <main>
    <div class="full-height-section first text-light" style="background-color: #1e2124;">
      <div class="container-fluid">
        <div class="row g-2">
          <div class="col-md-8 ms-5">
            <a href="https://www.youtube.com/watch?v=2wvqBMjPmqk&pp=ygUYcG9ueXRhaWwgdG8gc2h1c2h1IGprdDQ4" target="_blank">
              <img class="img-fluid rounded-4"
                src="https://res.cloudinary.com/haymzm4wp/image/upload/h_400,f_auto/v1689086407/assets/img/jkt48banner_nvyix5.png"
                alt="">
            </a>

            <div class="row mt-4">
              <h3>Live</h3>
              <div class="col-md-12">
                <div v-if="onlivesData.length > 0">
                  <div class="container-fluid rounded-4 mt-2" style="background-color: #282b30;">
                    <div v-for="live in onlivesData" :key="live.room_id">
                      <div class="card text-light shadow" style="background-color: #282b30;">
                        <img :src="live.image_url" :alt="live.main_name" class="card-img-top">
                        <div class="card-body">
                          <div class="card-title"><b>{{ live.main_name }}</b></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="container-fluid rounded-4 mt-2 shadow" style="background-color: #282b30;">
                    <div class="p-5 text-center">
                      <p>Tidak Ada Member Yang Live</p>
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
                  <div v-for="user in allMembers" :key="user.id" class="col-md-4 col-sm-6 mt-1 mb-1">
                    <div class="card text-light shadow rounded-4" style="background-color: #282b30;">
                      <a :href="'https://www.showroom-live.com/room/profile?room_id='+ user.id" target="_blank">
                        <img :src="user.image_url ?? user.image" class="card-img-top" :alt="user.name ?? user.main_name">
                      </a>
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
                <div v-for="recents in recentLive" :key="recents._id">
                  <div class="card mt-3 text-light" style="max-width: 540px; background-color: rgba(30, 33, 36, 0); border-color: rgba(30, 33, 36, 0);">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img :src="recents.member.img" class="img-fluid rounded-start" alt="...">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">{{recents.member.name}}</h5>
                          <p class="card-text"><small class="">Last updated 3 mins ago</small></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
import { getShowroomData, getRecentLive } from '../components/api';

export default {
  data() {
    return {
      allMembers: [],
      onlivesData: [],
      traineeData: [],
      recentLive: [],
      loading: true, // Mulai dengan menampilkan loading

    };
  },
  async mounted() {
    // Contoh penggunaan function untuk mengambil data dari API Showroom
    const [members, academyData] = await Promise.all([
      getShowroomData('rooms'),
      getShowroomData('rooms/academy'),
    ]);
    this.onlivesData = await getShowroomData('rooms/onlives');
    this.traineeData = await getShowroomData('rooms/trainee');

    this.allMembers = [...members, ...academyData];
    this.loading = false;

    try {
      const page = 1;
      const perpage = 30;

      // Panggil fungsi getRecentMembers dari file api.js untuk mengambil data
      const data = await getRecentLive(page, perpage);

      // Simpan data member ke dalam variabel members
      this.recentLive = data.recents;
      console.log(recentLive)
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
  },
};
</script>
