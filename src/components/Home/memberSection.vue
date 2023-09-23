<script setup>
const getUserLink = (user) => {
  const urlKey = user.url_key || user.room_url_key;
  const userId = user.id || user.room_id;
  return `/member/${urlKey}/${userId}`;
};

</script>

<template>
  <div class="container">
    <div class="row mt-2">
      <div class="col-8 my-auto text-light">
        <h3>Room Member</h3>
      </div>
      <div class="col-4 my-auto d-flex justify-content-end">
        <div class="input-group ">
          <input v-model="searchQuery" type="text" class="form-control border-0 shadow text-bg-light" placeholder="Cari member..." />
        </div>
      </div>
    
      <div v-if="loading">
        <p>Loading...</p>
      </div>
      <div v-else>
        <hr class="mt-0">
        <div class="row g-2 mb-5">
          <div v-for="user in allMembers" :key="user.id ?? user.room_id" class="col-md-3 col-sm-3 col-6 mt-1 mb-1">
            <RouterLink :to="getUserLink(user)">
              <div class="card text-light shadow rounded-4" style="background-color: #282b30;">
                <img :src="user.image_url ?? user.image" class="card-img rounded-top-4" :alt="user.name ?? user.main_name">
                <div class="card-body">
                  <h6 class="card-title mb-0"><b>{{ getName(user.name ?? user.main_name) }}</b></h6>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>    
      </div>
    </div>
  </div>
</template>

<script>
import { getShowroomData } from '../api';

export default {
  data() {
    return {
      allMembers: [],
      traineeData: [],
      loading: true,
      searchQuery: '', // Tambahkan variabel searchQuery

    };
  },
  async mounted() {
    await this.loadData(); // Pindahkan pengambilan data ke metode loadData
    this.loading = false;
  },

  watch: {
    searchQuery: {
      handler: 'searchMembers',
      immediate: true,
    },
  },
  methods: {
    async loadData() {
      try {
        const [members, academyData, traineeData] = await Promise.all([
          getShowroomData('rooms'),
          getShowroomData('rooms/academy'),
          getShowroomData('rooms/trainee'),
        ]);

        this.allMembers = [...members, ...academyData, ...traineeData];
      } catch (error) {
        console.error('Error loading data:', error);
      }
    },

    async searchMembers() {
      if (this.searchQuery.trim() !== '') {
        try {
          await this.loadData(); // Ambil semua data kembali saat mencari

          const filteredMembers = this.allMembers.filter((member) => {
            const memberName = member.name ?? member.main_name;
            return memberName.toLowerCase().includes(this.searchQuery.trim().toLowerCase());
          });

          this.allMembers = filteredMembers;
        } catch (error) {
          console.error('Error searching members:', error);
        }
      } else {
        await this.loadData(); // Ambil semua data kembali saat query kosong
      }
    },
    // Fungsi untuk mengalihkan ke halaman informasi member
    redirectToMemberInfo(memberName, roomId) {
      this.$router.push({ path: `/member/${memberName}/${roomId}` });
    },
    getName(ShortName) {
      return ShortName.replace("（JKT48）", "")
    },
  },
};
</script>