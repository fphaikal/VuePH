<script setup>
import liveSection from '../components/Home/liveSection.vue';
import schedulesSection from '../components/Home/schedulesSection.vue';
import memberSection from '../components/Home/memberSection.vue';
import traineeSection from '../components/Home/traineeSection.vue';
import banner from '../components/Home/banner.vue'
</script>

<template>
  <main>
    <banner/>
    <div class="full-height-section first text-light" style="background-color: #1e2124;">
      <div class="container-fluid">
        <div class="row g-2">
          <div class="col-md-8 col-sm-12 ms-md-5">
            <a class="d-none d-md-block"
              href="https://www.youtube.com/watch?v=2wvqBMjPmqk&pp=ygUYcG9ueXRhaWwgdG8gc2h1c2h1IGprdDQ4" target="_blank">
              <img class="img-fluid rounded-4"
                src="https://res.cloudinary.com/haymzm4wp/image/upload/h_400,f_auto/v1689086407/assets/img/jkt48banner_nvyix5.png"
                alt="Ponytail and Shu-Shu | New MV JKT48">
            </a>

            <div class="row mt-4">
              <liveSection/>
            </div>

            <div class="row mt-4 g-2">
              <memberSection/>
              <traineeSection/>
            </div>
          </div>

          <div class="col-md-3">
            <schedulesSection/>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


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

  computed: {
    filteredRecents() {
      const currentDate = new Date();
      return this.theaterSchedules.filter(theater => new Date(theater.showDate) > currentDate);
    },
  },

  methods: {
    // Fungsi untuk mengalihkan ke halaman informasi member
    redirectToMemberInfo(roomId) {
      this.$router.push({ path: `/member/${roomId}` });
    },

    redirectToSetlistInfo(setlistId) {
      this.$router.push({ path: `/setlist/${setlistId}` });
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

    formatLocalDate(dateString) {
      const date = new Date(dateString);
      const options = {
        timeZone: 'Asia/Jakarta', // Zona waktu Indonesia (WIB)
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      };
      return date.toLocaleString('id-ID', options);
    },
  },
};
</script>
