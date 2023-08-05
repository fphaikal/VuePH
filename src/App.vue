<script setup>
import { RouterLink, RouterView } from 'vue-router'
import navbar from './components/navbar.vue'

</script>

<template>
  <!-- As a heading -->
  <navbar msg="VuePH" />

  <RouterView />
</template>

