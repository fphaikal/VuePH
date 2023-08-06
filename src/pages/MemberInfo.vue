<template>
  <main>
    <div class="full-height-section text-light" style="background-color: #1e2124;">
      <div class="container">
        <div class="row mt-4">
          <div class="col-md-8">
            <div v-if="memberInfo">
              <h2>{{ memberInfo.main_name }} Room Info</h2>
              <div class="row g-2 mt-3">
                <div class="col-md-4">
                  <div class="card" style="background-color: #282b30;">
                    <div class="card-body text-light">Tanggal Lahir: <br> <b>{{ birthday }}</b></div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card" style="background-color: #282b30;">
                    <div class="card-body text-light">Zodiac Signs: <br><b>{{ zodiac }}</b></div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card" style="background-color: #282b30;">
                    <div class="card-body text-light">{{ birthday }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div v-if="memberInfo">
              <div class="card">
                <img :src="memberInfo.image" class="card-img" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
  
<script>
import { getShowroomData } from '../components/api';

export default {
  data() {
    return {
      memberInfo: null,
      birthday: null,
      zodiac: ' ',
    };
  },
  async mounted() {
    try {
      const roomId = this.$route.params.roomId;
      // Ambil data member berdasarkan roomId
      this.memberInfo = await getShowroomData(
        `rooms/profile/${roomId}/SQghJNnUPttxNbRudspw5Oo9Cnf_X16jFXvKjRkl_QrQzgzQcHvr0jlLoI7JL02z`
      );

      this.zodiac = this.getZodiacFromDescription(this.memberInfo.description);

      // Parsing properti description untuk mendapatkan data birthday
      const description = this.memberInfo.description;
      const regex = /Birthday: ([^\r\n]+)/;
      const match = regex.exec(description);

      // Cek apakah data birthday berhasil ditemukan
      if (match && match[1]) {
        this.birthday = match[1];
      } else {
        this.birthday = 'Data birthday tidak ditemukan.';
      }
    } catch (error) {
      console.error('Gagal mengambil data member:', error);
    }
  },
  methods: {
    getZodiacFromDescription(description) {
      const regex = /Zodiac signs: ([A-Za-z]+)/; // RegEx untuk mencari zodiac
      const match = description.match(regex);
      return match ? match[1] : ''; // Ambil hasil RegEx, jika tidak ada kembalikan string kosong
    },
  },
};
</script>
  