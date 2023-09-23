<script setup>
import { RouterLink, RouterView } from 'vue-router'
import navbar from './components/navbar.vue'
import Footer from './components/footer.vue'
</script>

<template>
  <div style="background-color: #1e2124;">
    <navbar msg="VuePH" />
  
    <RouterView class="mb-5"  />
    <Footer />
  </div>
</template>

