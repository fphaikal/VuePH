<template>
  <h3>Live</h3>
  <div class="col-md-12 mt-2">
    <div class="rounded-4 p-4" style="background-color: #282b30;">
      <div v-if="loading">
        <p class="text-center my-auto">Loading...</p>
      </div>
      <div v-else>
        <div class="row">
          <div v-if="onlivesData.length > 0">
            <div class="row g-2">
              <div v-for="live in onlivesData" :key="live.room_id" class="col-md-4 col-6">
                <RouterLink :to="'/watch/' + live.room_url_key + '/' + live.room_id">
                  <div class="card rounded-4" style="background-color: #1e2124;">
                    <img :src="live.image" class="card-img rounded-top-4" :alt="live.main_name">
                    <div class="card-body text-light">
                      <h5 class="card-title">{{ getName(live.main_name) }}</h5>
                      <p class="card-text">Viewers: {{ live.view_num }}</p>
                    </div>
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="text-center my-auto">Tidak Ada Member yang LIVE.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onlivesData: [],
      loading: true, // Mulai dengan menampilkan loading
    };
  },
  async mounted() {
    this.onlivesData = await this.getOnlivesData();
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

    getName(ShortName) {
      return ShortName.replace("（JKT48）", "")
    },


  },
};
</script>