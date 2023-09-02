<script setup>
import { RouterLink } from 'vue-router';
</script>
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
        <div v-if="filteredRecents">
          <div v-for="theater in filteredRecents" :key="theater._id">
            <RouterLink :to="'/setlist/' + theater._id">
              <div class="card mt-3 rounded-4" style="background-color: #1e2124; ">
                <div class="ratio ratio-16x9 " style="position: relative;">
                  <img :src="theater.setlist.image" class="card-img-top rounded-top-4"
                  style="object-fit: cover; position: absolute; width: 100%; height: 100%; top: 0; left: 0;" alt="...">
                </div>
                <div class="card-body text-light">
                  <h5 class="card-title">{{ theater.setlist.name }}</h5>
                  <p class="card-text">{{ truncateDescription(theater.setlist.description, 15) }}</p>
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
import { getShowroomAdminData } from '../api';

export default {
    data() {
        return {
            schedules: [],
        }
    },
    async mounted() {
        this.schedules = await getShowroomAdminData('schedules')
    },
     
    computed: {
        filteredRecents() {
            const currentDate = new Date();
            return this.schedules.filter(theater => {
                const theaterDate = new Date(theater.showDate);
                return theaterDate > currentDate || theaterDate.toDateString() === currentDate.toDateString();
            });
        },
    },


    methods: {
        redirectToSetlistInfo(setlistId) {
            this.$router.push({ path: `/setlist/${setlistId}` })
        },
        truncateDescription(description, maxLength) {
            const words = description.split(' ');
            if (words.length > maxLength) {
                return words.slice(0, maxLength).join(' ') + '...';
            }
            return description;
        },
        formatLocalDate(dateString) {
            const date = new Date(dateString);
            const options = {
                timeZone: "Asia/Jakarta", // Zona waktu Indonesia (WIB)
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            return date.toLocaleString("id-ID", options);
        },
    }

}
</script>