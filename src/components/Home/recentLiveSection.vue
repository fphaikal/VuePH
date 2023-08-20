<template> 
<h3>Recent Live</h3>
  <div class="col-md-12 mt-2">
    <div class="container rounded-4 p-4" style="background-color: #282b30;">
      <div v-if="loading">
        <p class="text-center my-auto">Loading...</p>
      </div>
      <div v-else>
        <div class="row">
          <div v-if="recentLive">
            <div class="row g-2">
              <div v-for="recent in recentLive.recents" :key="recent._id" class="col-md-4">
                  <div class="card rounded-4" style="background-color: #1e2124;">
                    <img :src="recent.member.img" class="card-img rounded-top-4" :alt="recent.member.name">
                    <div class="card-body text-light">
                      <h5 class="card-title">{{ recent.member.name }}</h5>
                      <p class="card-text">Viewers: {{ recent.live_info.viewers }}</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="text-center my-auto">Tidak Ada Member yang LIVE.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecentLive } from '../api';

export default {
    data() {
        return {
            recentLive: [],
        }
    },
    async mounted() {
        this.recentLive = await getRecentLive("date", 1, "active", -1, 3);
    }
}
</script>