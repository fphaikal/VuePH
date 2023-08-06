<template>
  <main>
    <div class="full-height-section text-light" style="background-color: #1e2124;">
      <div class="container">
        <div v-if="memberInfo">
          <div class="row mt-3">
            <div class="col-md-1 text-center my-auto">
              <img :src="memberInfo.image_square" class="img-fluid rounded-circle mobile-image" alt="">
            </div>
            <div class="col-md-9 my-auto mobile-text-center">
              <h2><b>{{ memberInfo.main_name }}</b></h2>
            </div>
            <div class="col-md-2 my-auto text-center">
              <a :href="'https://www.showroom-live.com/room/profile?room_id=' + memberInfo.room_id" target="_blank"
                class="btn btn-sm btn-light rounded-pill ">Go To SHOWROOM</a>
            </div>
          </div>
        </div>
        <hr>

        <div class="row mt-3 g-3">
          <div class="col-md-4">
            <div v-if="memberInfo">
              <div class="card rounded-4 shadow mb-2">
                <img :src="memberInfo.image" class="card-img rounded-4 shadow" alt="Test">
              </div>
            </div>
            <div class="card rounded-4 shadow mb-2" style="background-color: #282b30;">
              <div v-if="memberInfo">
                <div v-if="memberInfo.is_onlive">
                  <div class="card-body text-light text-center"><b>Room Sedang Online</b></div>
                </div>
                <div v-else>
                  <div class="card-body text-light text-center"><b>Room Sedang Offline</b></div>
                </div>
              </div>
            </div>
            <hr>
            <div v-if="onlivesData.length > 0">
                  <div class="container-fluid rounded-4 mt-2 " style="background-color: #282b30;">
                    <div v-for="live in onlivesData" :key="live.room_id">
                      <div class="card text-light shadow" style="background-color: #282b30;">
                        <img :src="live.image_url" :alt="live.main_name" class="card-img-top">
                        <div class="card-body">
                          <div class="card-title"><b>{{ live.main_name }}</b></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="container-fluid rounded-4 mt-2 shadow" style="background-color: #282b30;">
                    <div class="p-5 text-center">
                      <p>Tidak Ada Member Yang Live</p>
                    </div>
                  </div>
                </div>
          </div>
          <div class="col-md-8">
            <div v-if="memberInfo">
              <div class="row g-2">
                <div class="col-md-4 col-sm-6">
                  <div class="card rounded-4 shadow" style="background-color: #282b30;">
                    <div class="card-body text-light">Tanggal Lahir: <br> <b>{{ displayBirthday(memberInfo.description)
                    }}</b></div>
                  </div>
                </div>
                <div class="col-md-4 col-sm-6 ">
                  <div class="card rounded-4 shadow" style="background-color: #282b30;">
                    <div class="card-body text-light">Zodiac Signs: <br><b>{{ zodiac }}</b></div>
                  </div>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-12">
                  <div class="card rounded-4 shadow" style="background-color: #282b30;">
                    <div class="card-body text-light">
                      <h5>Deskripsi</h5>
                      <p class="mt-3" v-html="formatDescription(memberInfo.description)"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
  
<style>
@media (max-width: 767px) {
  .mobile-text-center {
    text-align: center;
  }
}

@media (max-width: 767px) {
  .mobile-image {
    max-width: 86px;
    max-height: 86px;
  }
}
</style>
<script>
import { getShowroomData } from '../components/api';

export default {
  data() {
    return {
      memberInfo: null,
      birthday: null,
      zodiac: '',
      onlivesData: [],

    };
  },
  async mounted() {
    this.onlivesData = await getShowroomData('rooms/onlives');

    try {
      const roomId = this.$route.params.roomId;
      // Ambil data member berdasarkan roomId
      this.memberInfo = await getShowroomData(
        `rooms/profile/${roomId}/SQghJNnUPttxNbRudspw5Oo9Cnf_X16jFXvKjRkl_QrQzgzQcHvr0jlLoI7JL02z`
      );

      this.zodiac = this.getZodiacFromDescription(this.memberInfo.description);

      if (this.memberInfo && this.memberInfo.is_onlive) {
        // Misalnya, Anda dapat mengakses waktu live saat ini dengan this.memberInfo.current_live_started_at
        console.log('Current live started at:', this.memberInfo.current_live_started_at);
      }
    } catch (error) {
      console.error('Gagal mengambil data member:', error);
    }
  },
  methods: {
    getZodiacFromDescription(description) {
      const zodiacIndex = description.indexOf('Zodiac signs:');
      if (zodiacIndex !== -1) {
        const zodiacStartIndex = zodiacIndex + 14; // Panjang teks "Zodiac signs:"
        const zodiacEndIndex = description.indexOf('\r\n', zodiacStartIndex); // Cari indeks akhir dari zodiac
        if (zodiacEndIndex !== -1) {
          return description.substring(zodiacStartIndex, zodiacEndIndex);
        } else {
          // Jika zodiac tidak memiliki karakter line break ("\r\n") setelahnya
          return description.substring(zodiacStartIndex);
        }
      }
      return '';
    },
    formatDescription(description) {
      // Mengganti karakter baris baru (\n) dengan tag HTML <br>
      const unwantedKeys = ['Birthday', 'Zodiac'];
      const lines = description.split('\n');
      const filteredLines = lines.filter(line => !unwantedKeys.some(key => line.includes(key)));
      const sanitizedLines = filteredLines.map(line => line.replace(/"/g, '')); // Menghapus tanda petik
      const filteredDescription = sanitizedLines.join('<br>');
      return filteredDescription;
    },
    displayBirthday(description) {
      // Pisahkan baris dalam description
      const lines = description.split('\r\n');

      // Cari baris yang berisi tanggal lahir
      const birthdayLine = lines.find((line) => line.startsWith('Birthday:'));

      // Jika tanggal lahir ditemukan, ambil tanggal lahir dari baris tersebut
      if (birthdayLine) {
        const birthday = birthdayLine.replace('Birthday:', '').trim();
        return `${birthday}`;
      }

      // Jika tanggal lahir tidak ditemukan, kembalikan teks default
      return 'Tanggal Lahir Tidak Diketahui';
    },
  },
};
</script>
  