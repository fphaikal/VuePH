<template>
  <main>
    <div class="full-height-section first text-light" style="background-color: #1e2124;">
      <div class="container-fluid">
        <div class="row g-2">
          <div class="col-md-8 col-sm-12 ms-md-5">
            <a href="https://www.youtube.com/watch?v=2wvqBMjPmqk&pp=ygUYcG9ueXRhaWwgdG8gc2h1c2h1IGprdDQ4" target="_blank">
              <img class="img-fluid"
                src="https://res.cloudinary.com/haymzm4wp/image/upload/h_400,f_auto/v1689086407/assets/img/jkt48banner_nvyix5.png"
                alt="Ponytail and Shu-Shu | New MV JKT48">
            </a>

            <div class="row mt-4">
              <h3>Live</h3>
              <div class="col-md-12 mt-2">
                <div class="container rounded-4 p-4" style="background-color: #282b30;">
                  <div v-if="loading">
                    <p class="text-center my-auto">Loading...</p>
                  </div>
                  <div v-else>
                    <div class="row">
                      <div v-if="onlivesData.length > 0">
                        <div v-for="live in onlivesData" :key="live.room_id" class="col-md-4">
                          <a :href="'https://www.showroom-live.com/r/' + live.room_url_key" target="_blank">
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
                        <p class="text-center my-auto">No onlives available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-4 g-2">
              <div class="col-md-7 my-auto">
                <h3>Room Member</h3>
              </div>
              <div class="col-md-5 my-auto d-flex justify-content-end">
                <button class="btn btn-success me-1 btn-sm rounded-pill" @click="showAllMembers">All Members</button>
                <button class="btn btn-danger me-1 btn-sm rounded-pill" @click="showMembers">Members</button>
                <button class="btn btn-warning btn-sm rounded-pill" @click="showAcademy">Gen 10</button>
              </div>

              <hr>
              <div v-if="loading">
                <p>Loading...</p>
              </div>
              <div v-else>
                <div class="row g-2">
                  <div v-for="user in allMembers" :key="user.id ?? user.room_id" class="col-md-4 col-sm-6 mt-1 mb-1"
                    @click="redirectToMemberInfo(user.id ?? user.room_id)">
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
                <h5>Theater Schedule</h5>
                <div v-if="loading">
                  <p>Loading...</p>
                </div>
                <div v-else>
                  <div v-for="theater in theaterSchedules" :key="theater._id">
                    <div class="card mt-3 rounded-4" style="background-color: #1e2124; ">
                      <div class="ratio ratio-16x9 " style="position: relative;">
                        <img :src="theater.setlist.image" class="card-img-top rounded-4"
                          style="object-fit: cover; position: absolute; width: 100%; height: 100%; top: 0; left: 0;"
                          alt="...">
                      </div>
                      <div class="card-body text-light">
                        <h5 class="card-title">{{ theater.setlist.name }}</h5>
                        <p class="card-text">{{ truncateDescription(theater.setlist.description, 15) }}</p>
                        <a href="#" class="btn btn-light rounded-pill btn-sm">Go To Detail</a>
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
import { getShowroomData, getShowroomAdminData } from '../components/api';

export default {
  data() {
    return {
      allMembers: [],
      onlivesData: [],
      traineeData: [],
      theaterSchedules: [],
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
    this.theaterSchedules = await getShowroomAdminData('schedules');

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

    truncateDescription(description, maxLength) {
    const words = description.split(' ');
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(' ') + '...';
    }
    return description;
  },
  },
};
</script>
