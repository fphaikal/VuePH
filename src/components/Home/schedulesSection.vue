<template>
    <div class="card rounded-4 shadow" style="background-color: #282b30;">
        <div class="card-body text-light">
            <h5>Theater Schedule</h5>
            <div v-if="loading">
                <div class="card rounded-4 mt-3" style="background-color: #1e2124;">
                    <div class="card-body text-light">
                        <p class="text-center my-auto">Loading...</p>
                    </div>
                </div>
            </div>
            <div v-else>
                <a v-for="theater in filteredRecents" :key="theater._id"
                    @click="redirectToSetlistInfo(theater._id ?? theater.setlist.name)">
                    <div class="card mt-3 rounded-top-4" style="background-color: #1e2124; ">
                        <div class="ratio ratio-16x9 " style="position: relative;">
                            <img :src="theater.setlist.image" class="card-img-top rounded-4"
                                style="object-fit: cover; position: absolute; width: 100%; height: 100%; top: 0; left: 0;"
                                alt="...">
                        </div>
                        <div class="card-body text-light">
                            <h5 class="card-title">{{ theater.setlist.name }}</h5>
                            <p class="card-text">{{ truncateDescription(theater.setlist.description, 15) }}</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { getShowroomAdminData } from '../api';

export default {
  data() {
    return {
      theaterSchedules: [],
      loading: true, // Mulai dengan menampilkan loading
    };
  },
  async mounted() {
    this.theaterSchedules = await getShowroomAdminData('schedules');

    this.loading = false;


  },

  computed: {
    filteredRecents() {
      const currentDate = new Date();
      return this.theaterSchedules.filter(theater => new Date(theater.showDate) > currentDate);
    },
  },

  methods: {
    redirectToSetlistInfo(setlistId) {
      this.$router.push({ path: `/setlist/${setlistId}` });
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