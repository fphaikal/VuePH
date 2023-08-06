<template>
  <main>
    <div class="full-height-section text-light" style="background-color: #1e2124;">
      <div class="container">
        <div class="row mt-4 g-2">
          <div class="col-md-8">
            <div v-if="memberInfo">
              <h2>{{ memberInfo.main_name }}Room Info</h2>
              <div class="row g-2 mt-3">
                <div class="col-md-4">
                  <div class="card rounded-4 shadow" style="background-color: #282b30;">
                    <div class="card-body text-light">Tanggal Lahir: <br> <b>{{ displayBirthday(memberInfo.description)
                    }}</b></div>
                  </div>
                </div>
                <div class="col-md-4">
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
          <div class="col-md-4">
            <div class="card rounded-4 shadow" style="background-color: #282b30;">
              <div v-if="memberInfo">
                <div v-if="memberInfo.is_onlive">                
                  <div class="card-body text-light text-center"><b>Room Sedang Online</b></div>
                </div>
                <div v-else>
                  <div class="card-body text-light text-center"><b>Room Sedang Offline</b></div>
                </div>
              </div>
            </div>
            <div v-if="memberInfo">
              <div class="card rounded-4 shadow mt-2">
                <img :src="memberInfo.image" class="card-img rounded-4 shadow" alt="">
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
      zodiac: '',
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
  