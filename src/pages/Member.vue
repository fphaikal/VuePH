<template>
    <div>
      <h2>User Info</h2>
      <div v-if="user">
        <h3>{{ user.name }}</h3>
        <img :src="user.image_url" :alt="user.name" style="max-width: 200px;">
        <p>{{ user.description }}</p>
        <p>Followers: {{ user.follower_num }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script>
  import { getShowroomData } from '../components/api';
  
  export default {
    data() {
      return {
        user: null,
      };
    },
    async mounted() {
      // Mengambil ID user dari parameter URL menggunakan $route.params
      const userId = this.$route.params.id;
  
      // Contoh penggunaan function untuk mengambil data dari API Showroom
      this.user = await getShowroomData(`/${userId}`);
    },
  };
  </script>
  