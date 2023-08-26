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
</script>

<template>
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand fs-4 text-light" href="/"><b>{{msg}}</b><small style="font-size: 50%; color: #585858;">@fphaikal</small></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon text-light"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link text-light" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-light" href="/theater-schedules">Theater Schedules</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-light" href="/recent-live">Recent Live</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-light" href="/">About</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style>
    .navbar {
      transition: backdrop-filter 0.3s, box-shadow 0.3s, opacity 0.3s;
      backdrop-filter: blur(0);
      background-color: rgba(30, 33, 36, 1);
      box-shadow: none;
      height: 70px;
      position: sticky; /* Menjadikan navbar tetap berada di atas saat di-scroll */

    }

    .navbar.blur {
      backdrop-filter: blur(10px);
      background-color: rgba(30, 33, 36, 0.7);
      box-shadow: 0 0px 10px rgba(0, 0, 0, 0.7);
    }
</style>