<template>
  <h3>News</h3>

  <div v-if="news">
    <div class="row">
      <div v-for="data in news.newsDataList.slice(0,5)" class="col-12 mb-2">
        <RouterLink :to="'/news/detail/' + data.id" class="card text-light rounded-4" style="background-color: #282b30;">
          <div class="card-body">
            <img :src="'https://jkt48.com/' + data.img" class="img-fluid rounded-3 mb-1" alt="">
            <h6 class="card-title mb-0">{{ data.title }}</h6>
            <small class="card-text m-0">{{ data.time }}</small>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { getNews } from "../api";

export default {
    data() {
        return {
          news: [],
        };
    },
    async mounted() {
        this.news = await getNews(`news`);
    },
    components: { RouterLink }
};
</script>
