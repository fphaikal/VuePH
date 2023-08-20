<template>
    <div class="col-md-7 my-auto">
        <h3>Room Member</h3>
    </div>
    <div class="col-md-5 my-auto d-flex justify-content-end">
        <button class="btn btn-success me-1 btn-sm rounded-pill" @click="showAllMembers">All Members</button>
        <button class="btn btn-danger me-1 btn-sm rounded-pill" @click="showMembers">Members</button>
        <button class="btn btn-warning btn-sm rounded-pill" @click="showAcademy">Trainee</button>
    </div>

    <hr>
    <div v-if="loading">
        <p>Loading...</p>
    </div>
    <div v-else>
        <div class="row g-2">
            <div v-for="user in allMembers" :key="user.id ?? user.room_id" class="col-md-4 col-sm-3 col-6 mt-1 mb-1"
                @click="redirectToMemberInfo(user.url_key, user.id ?? user.room_id)">
                <div class="card text-light shadow rounded-4" style="background-color: #282b30;">
                    <img :src="user.image_url ?? user.image" class="card-img rounded-top-4"
                        :alt="user.name ?? user.main_name">
                    <div class="card-body">
                        <p class="card-title"><b>{{ user.name ?? user.main_name }}</b></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getShowroomData, getShowroomAdminData } from '../api';

export default {
  data() {
    return {
      allMembers: [],
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


    this.allMembers = [...members, ...academyData];
    this.loading = false;


  },


  methods: {
    // Fungsi untuk mengalihkan ke halaman informasi member
    redirectToMemberInfo(memberName ,roomId) {
      this.$router.push({ path: `/member/${memberName}/${roomId}` });
    },

  },
};
</script>