<script setup>
import liveSection from '../components/Home/liveSection.vue';
import schedulesSection from '../components/Home/schedulesSection.vue';
import memberSection from '../components/Home/memberSection.vue';
import banner from '../components/Home/banner.vue'
import recentLiveSection from '../components/Home/recentLiveSection.vue';
import birthdaySection from '../components/Home/birthdaySection.vue';
import statsSection from '../components/Home/statsSection.vue'
import newsSection from '../components/Home/newsSection.vue';
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
            <div class="row mt-4">
              <birthdaySection/>
            </div>
            <div class="row mt-4">
              <recentLiveSection/>
            </div>

            <div class="row mt-4 g-2">
              <statsSection/>
            </div>

            <div class="row mt-4 g-2">
              <newsSection/>
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