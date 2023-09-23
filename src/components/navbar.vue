<script setup>
defineProps({
    msg: {
        type: String,
        required: true
    }
})

window.addEventListener("scroll", function() {
    var navbar = document.querySelector(".navbar");
    navbar.classList.toggle("blur", window.scrollY > 0);
  });

import { RouterLink } from 'vue-router';
</script>

<template>
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <RouterLink class="navbar-brand fs-4 text-light" to="/"><b>{{msg}}</b><small style="font-size: 50%; color: #585858;">@fphaikal</small></RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon text-light"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <RouterLink class="nav-link text-light" aria-current="page" to="/">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link text-light" aria-current="page" to="/member">Member Room</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link text-light" to="/theater-schedules">Theater Schedules</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link text-light" to="/recent-live">Recent Live</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link text-light" to="/about">About</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
    .navbar {
      transition: backdrop-filter 0.3s, box-shadow 0.3s, opacity 0.3s;
      backdrop-filter: blur(0);
      background-color: rgba(30, 33, 36, 1);
      box-shadow: none;
      position: sticky; /* Menjadikan navbar tetap berada di atas saat di-scroll */

    }

    .navbar.blur {
      backdrop-filter: blur(10px);
      background-color: rgba(30, 33, 36, 0.8);
      box-shadow: 0 0px 10px rgba(0, 0, 0, 0.7);
    }
</style>