<template>
  <div class="full-height-section">
    <div class="container">
      <div v-if="newsDetail">
        <div class="row g-5">
          <div class="col-8 text-light">
            <h3>{{ newsDetail[0].title }}</h3>  
            <small>{{ newsDetail[0].time }}</small>
            <p class="mt-4" v-html="formatNewsText(newsDetail[0].news)"></p>
            <div v-for="img in newsDetail[0].imageUrls">
              <img :src="img" class="img-fluid mb-2" alt="">
            </div>
          </div>
          <div class="col-4 text-light">
            <h3>News</h3>
            <div v-if="news">
              <div class="row">
                <div v-for="data in news.newsDataList.slice(0,7)" class="col-12 mb-2">
                  <RouterLink :to="'/news/detail/' + data.id" @click="loadNewsDetail(data.id)" class="card text-light rounded-4" style="background-color: #282b30;">
                    <div class="card-body">
                      <img :src="'https://jkt48.com/' +data.img" class="img-fluid rounded-3 mb-1" alt="">
                      <h6 class="card-title mb-0">{{ data.title }}</h6>
                      <small class="card-text m-0">{{ data.time }}</small>
                    </div>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
import { getNews } from '../../components/api';
import { useHead } from '@unhead/vue';
import { InferSeoMetaPlugin } from '@unhead/addons'


export default {
  data() {
    return {
      newsDetail: null,
      news: [],
    };
  },

  async mounted() {
    const idNews = this.$route.params.idNews
    this.newsDetail = await getNews(`news/detail/${idNews}`)
    this.news = await getNews('news')

    this.titleNews = await this.newsDetail[0].title

    useHead({
      title: `${this.titleNews } | VuePH`,
    });
  },

  methods: {
    formatNewsText(text) {
      // Replace '\n\n' with '<br>' to display line breaks
      return text.replace(/\n/g, '<br>');
    },
    async loadNewsDetail(id) {
      this.newsDetail = await getNews(`news/detail/${id}`);
    },
  },
};
</script>
