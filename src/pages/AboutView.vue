<template>
  <main>
    <div class="full-height-section" style="background-color: #1e2124;">
      <div class="container">
        <div class="row g-2">
          <div class="col-md-12 p-5 text-light text-center rounded-4" style="background: linear-gradient(0deg,rgba(33, 37, 41, 0.6) 0%,rgba(33, 37, 41, 0.6) 100%), url('https://pbs.twimg.com/media/F2w4pJQaoAAKFzM?format=jpg&name=large'); object-fit: cover; background-position: center;">
            <h1>About</h1>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-8 text-light">
            <p>
              VuePH adalah website seperti SHOWROOM tetapi memiliki perbedaan yaitu hanya terdapat room JKT48 saja. Pada Saat versi ini kalian hanya bisa
              melihat siapa saja member yang sedang LIVE, Theater Schedule, dan Detail live terakhir dari member JKT48.
              <br>
              <br>
              Website ini dibuat dan dikembangkan oleh <a class="text-light" href="https://twitter.com/fp_haikal16"><b>FPHaikal</b></a>. Website
              ini Insyaallah pasti akan terus dikembangkan.
              <br>
              <br>
              Source Code : <br>              
              <a href="https://github.com/crstlnz/jkt48showroom">https://github.com/crstlnz/jkt48showroom</a> (RECENT LIVE JKT48 API & Member Info Detail)
              <a href="https://github.com/ikhbaldwiyan/showroom">https://github.com/ikhbaldwiyan/showroom</a>  (JKT48 SHOWROOM WEB) 
              <a href="https://github.com/ikhbaldwiyan/jkt48-showroom-api">https://github.com/ikhbaldwiyan/jkt48-showroom-api</a> (JKT48 SHOWROOM API)
              <a href="https://github.com/AldyRevigustian/Showroom-Api">https://github.com/AldyRevigustian/Showroom-Api</a> (SHOWROOM API)

              <br>
              <br>
              Thank You For:
              <br>
              Ikhbal Dwiyantoro <br>
              Aldy Revigustian <br>
              crstlnz
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script> 
import { useHead } from '@unhead/vue';

export default {
  async mounted() {
    useHead({
      title: `About | VuePH`,
      meta: [
        {
          name: 'description',
          content: this.$route.meta.description,
        },
      ],
    });
  }
}
</script>
