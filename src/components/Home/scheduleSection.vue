<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="card rounded-4 shadow" style="background-color: #282b30">
    <div class="card-body text-light">
      <div v-if="schedules" class="d-flex">
        <h3 class="my-auto">Schedule</h3>
        <h6 class="ms-auto my-auto">{{ schedules.period }}</h6>
      </div>
      <div v-if="schedules">
        <div v-for="data in schedules.listSchedule">
          <div class="card text-light rounded-4 mb-2 mt-3" style="background-color: #1e2124;" v-if="data.event.length > 0">
            <div class="card-body">
                <div class="row g-1">
                  <div class="col-md-2 col-3 my-auto" v-if="data.event.length > 0">
                    <h6 class="m-0">{{ data.date }}</h6>
                  </div>
                  <div class="col-md-1 col-3 my-auto" v-if="data.event.length > 0">
                    <div v-for="events in data.event" :key="events.title" class="my-auto mx-auto">
                      <img :src="'https://jkt48.com' + events.category" class="img-fluid m-0 rounded-3" alt="">
                    </div>
                  </div>
                  <div class="col-md-6 col-6 my-auto" v-if="data.event.length > 0">
                    <div v-for="events in data.event" :key="events.title" class="my-auto">
                      <h6 class="mb-0">{{ events.title }}</h6>
                    </div>
                  </div>
                  <div class="col-7 my-auto" v-else>
                    <p class="text-muted">Tidak ada acara</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script>
import { getSchedule } from "../api";

export default {
  data() {
    return {
      schedules: [],
    };
  },
  async mounted() {
    this.schedules = await getSchedule("schedule");
  },


};
</script>
