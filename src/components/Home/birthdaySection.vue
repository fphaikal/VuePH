<template>
  <div class="container">
    <div
      class="col-12 p-3 rounded-4 border-0"
      style="background-color: #282b30">
      <h3 class="mb-4">Ulang Tahun Bulan Ini</h3>
      <div v-if="birthday">
        <div class="row mb-0">
            <div v-for="data in birthday" class="col-md-3 col-6 mb-2 mt-0 g-5 text-center">
              <RouterLink :to="'member/' + data.url_key + '/' + data.room_id">
                <div class="card border-0 rounded-4" style="background-color: #1e2124;">
                    <div class="ratio ratio-1x1">
                        <img :src="data.img" alt="" class="img-fluid rounded-top-4" style="object-fit: cover;">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title text-light mt-0 mb-0">{{ data.name }}</h5>
                    </div>
                </div>
              </RouterLink>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBirthday } from "../api";

export default {
  data() {
    return {
      birthday: null,
    };
  },
  async mounted() {
    this.birthday = await getBirthday("jkt48");
  },
};
</script>
