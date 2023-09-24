<script setup>
import formatNumber from "../../utils/formatNumber";
</script>
<template>
  <div class="col-md-8 col-3 my-auto">
    <h3>Statistik</h3>
  </div>    
  <div class="col-md-4 col-9 my-auto d-flex justify-content-end">
    <div class="btn-group" role="group" aria-label="Statistik">
      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnradio1"
        v-model="selectedOption"
        value="7 Hari"
      />
      <label
        class="btn rounded-start-4 text-light"
        style="background-color: #282b30"
        for="btnradio1"
        >7 Hari</label
      >

      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnradio2"
        v-model="selectedOption"
        value="4 Minggu"
      />
      <label
        class="btn text-light"
        style="background-color: #282b30"
        for="btnradio2"
        >4 Minggu</label
      >

      <input
        type="radio"
        class="btn-check"
        name="btnradio"
        id="btnradio3"
        v-model="selectedOption"
        value="3 Bulan"
      />
      <label
        class="btn rounded-end-4 text-light"
        style="background-color: #282b30"
        for="btnradio3"
        >3 Bulan</label
      >
    </div>
  </div>
  <hr class="mb-1" />

  <!-- Isi Konten -->
  <div v-if="selectedOption === '7 Hari'">
    <div v-if="statsWeek">
      <div class="row g-2 p-0">
        <div v-for="week in statsWeek.stats" class="col-md-6">
          <div
            class="card rounded-4 text-light"
            style="background-color: #282b30"
          >
            <div class="row g-0">
              <div class="col-8 my-auto">
                <div class="card-body ms-2">
                  <p class="card-title">{{ week.title }}</p>
                  <h4 class="card-text">
                    <b>{{ week.value }}</b>
                  </h4>
                </div>
              </div>
              <div class="col-4">
                <div class="ratio ratio-1x1" style="position: relative">
                  <img
                    v-if="week.img"
                    :src="week.img.src"
                    :alt="week.img.title"
                    class="img-fluid rounded-end-4"
                    style="object-fit: cover; position: absolute"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-1 mt-2">
        <div class="col-12 rounded-4" style="background-color: #282b30">
          <div class="row p-3">
            <div class="col-12">
              <div class="d-flex">
                <h3>Top Fans</h3>
                <button
                  type="button"
                  class="btn border-0 rounded-4 ms-auto text-light"
                  style="background-color: #1e2124"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Selengkapnya
                </button>
                <!-- Modal -->
                <div
                  class="modal fade rounded-4"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog rounded-4">
                    <div
                      class="modal-content rounded-4"
                      style="background-color: #282b30"
                    >
                      <div class="modal-header" data-bs-theme="dark">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                          Top Fans
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div
                          class="overflow-y-scroll overflow-x-hidden"
                          style="max-height: 500px"
                        >
                          <div v-for="(data, index) in fansWeek" :key="data.id">
                            <div class="row g-2 mt-2">
                              <div class="col-1 my-auto">{{ index + 1 }}</div>
                              <div class="col-2 my-auto text-center mx-auto">
                                <img
                                  :src="`https://static.showroom-live.com/image/avatar/${data.avatar_id}.png`"
                                  class="img-fluid"
                                  width="50"
                                  alt=""
                                />
                              </div>
                              <div class="col-9 my-auto">
                                <h6 class="m-0 my-auto">
                                  {{ data.name }}
                                </h6>
                                <a>{{ formatNumber(data.fans_point) }}pts</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mt-3 g-1">
                <div
                  v-for="(data, index) in fansWeek.slice(0, 12)"
                  :key="data.id"
                  class="col-md-4 mb-3"
                >
                  <div class="row g-1">
                    <div class="col-2 my-auto">
                      <img
                        :src="`https://static.showroom-live.com/image/avatar/${data.avatar_id}.png`"
                        class="img-fluid"
                        width="100"
                        alt=""
                      />
                    </div>
                    <div class="col-10 my-auto">
                      <h6 class="m-0 my-auto">
                        {{ data.name }}
                      </h6>
                      <a>{{ formatNumber(data.fans_point) }}pts</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else></div>
  </div>

  <div v-if="selectedOption === '4 Minggu'">
    <div v-if="statsMonthly">
      <div class="row g-2 p-0">
        <div v-for="month in statsMonthly.stats" class="col-md-6">
          <div
            class="card rounded-4 text-light"
            style="background-color: #282b30"
          >
            <div class="row g-0">
              <div class="col-8 my-auto">
                <div class="card-body ms-2">
                  <p class="card-title">{{ month.title }}</p>
                  <h4 class="card-text">
                    <b>{{ month.value }}</b>
                  </h4>
                </div>
              </div>
              <div class="col-4">
                <div class="ratio ratio-1x1" style="position: relative">
                  <img
                    v-if="month.img"
                    :src="month.img.src"
                    :alt="month.img.title"
                    class="img-fluid rounded-end-4"
                    style="object-fit: cover; position: absolute"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-1 mt-2">
        <div class="col-12 rounded-4" style="background-color: #282b30">
          <div class="row p-3">
            <div class="col-12">
                <div class="d-flex">
                <h3>Top Fans</h3>
                <button
                  type="button"
                  class="btn border-0 rounded-4 ms-auto text-light"
                  style="background-color: #1e2124"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Selengkapnya
                </button>
                <!-- Modal -->
                <div
                  class="modal fade rounded-4"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog rounded-4">
                    <div
                      class="modal-content rounded-4"
                      style="background-color: #282b30"
                    >
                      <div class="modal-header" data-bs-theme="dark">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                          Top Fans
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div
                          class="overflow-y-scroll overflow-x-hidden"
                          style="max-height: 500px"
                        >
                          <div v-for="(data, index) in fansMonth" :key="data.id">
                            <div class="row g-2 mt-2">
                              <div class="col-1 my-auto">{{ index + 1 }}</div>
                              <div class="col-2 my-auto text-center mx-auto">
                                <img
                                  :src="`https://static.showroom-live.com/image/avatar/${data.avatar_id}.png`"
                                  class="img-fluid"
                                  width="50"
                                  alt=""
                                />
                              </div>
                              <div class="col-9 my-auto">
                                <h6 class="m-0 my-auto">
                                  {{ data.name }}
                                </h6>
                                <a>{{ formatNumber(data.fans_point) }}pts</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mt-3 g-1">
                <div
                  v-for="(data, index) in fansMonth.slice(0, 12)"
                  :key="data.id"
                  class="col-md-4 mb-3"
                >
                  <div class="row g-1">
                    <div class="col-2 my-auto">
                      <img
                        :src="`https://static.showroom-live.com/image/avatar/${data.avatar_id}.png`"
                        class="img-fluid"
                        width="100"
                        alt=""
                      />
                    </div>
                    <div class="col-10 my-auto">
                      <h6 class="m-0 my-auto">
                        {{ data.name }}
                      </h6>
                      <a>{{ formatNumber(data.fans_point) }}pts</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="selectedOption === '3 Bulan'">
    <div v-if="statsQuarter">
      <div class="row g-2 p-0">
        <div v-for="quarter in statsQuarter.stats" class="col-md-6">
          <div
            class="card rounded-4 text-light"
            style="background-color: #282b30"
          >
            <div class="row g-0">
              <div class="col-8 my-auto">
                <div class="card-body ms-2">
                  <p class="card-title">{{ quarter.title }}</p>
                  <h4 class="card-text">
                    <b>{{ quarter.value }}</b>
                  </h4>
                </div>
              </div>
              <div class="col-4">
                <div class="ratio ratio-1x1" style="position: relative">
                  <img
                    v-if="quarter.img"
                    :src="quarter.img.src"
                    :alt="quarter.img.title"
                    class="img-fluid rounded-end-4"
                    style="object-fit: cover; position: absolute"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-1 mt-2">
        <div class="col-12 rounded-4" style="background-color: #282b30">
          <div class="row p-3">
            <div class="col-12">
                <div class="d-flex">
                <h3>Top Fans</h3>
                <button
                  type="button"
                  class="btn border-0 rounded-4 ms-auto text-light"
                  style="background-color: #1e2124"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Selengkapnya
                </button>
                <!-- Modal -->
                <div
                  class="modal fade rounded-4"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog rounded-4">
                    <div
                      class="modal-content rounded-4"
                      style="background-color: #282b30"
                    >
                      <div class="modal-header" data-bs-theme="dark">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                          Top Fans
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div
                          class="overflow-y-scroll overflow-x-hidden"
                          style="max-height: 500px"
                        >
                          <div v-for="(data, index) in fansQuarter" :key="data.id">
                            <div class="row g-2 mt-2">
                              <div class="col-1 my-auto">{{ index + 1 }}</div>
                              <div class="col-2 my-auto text-center mx-auto">
                                <img
                                  :src="`https://static.showroom-live.com/image/avatar/${data.avatar_id}.png`"
                                  class="img-fluid"
                                  width="50"
                                  alt=""
                                />
                              </div>
                              <div class="col-9 my-auto">
                                <h6 class="m-0 my-auto">
                                  {{ data.name }}
                                </h6>
                                <a>{{ formatNumber(data.fans_point) }}pts</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mt-3 g-1">
                <div
                  v-for="(data, index) in fansQuarter.slice(0, 12)"
                  :key="data.id"
                  class="col-md-4 mb-3"
                >
                  <div class="row g-1">
                    <div class="col-2 my-auto">
                      <img
                        :src="`https://static.showroom-live.com/image/avatar/${data.avatar_id}.png`"
                        class="img-fluid"
                        width="100"
                        alt=""
                      />
                    </div>
                    <div class="col-10 my-auto">
                      <h6 class="m-0 my-auto">
                        {{ data.name }}
                      </h6>
                      <a>{{ formatNumber(data.fans_point) }}pts</a>
                    </div>
                  </div>
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
import { getShowroomDataDetail } from "../api";

export default {
  data() {
    return {
      selectedOption: "7 Hari",
      showingToast: false,
      statsWeek: [],
      statsMonthly: [],
      statsQuarter: [],
      fansWeek: [],
      fansMonth: [],
      fansQuarter: [],
    };
  },

  async mounted() {
    this.statsWeek = await getShowroomDataDetail(`stats?type=weekly`);
    this.statsMonthly = await getShowroomDataDetail(`stats?type=monthly`);
    this.statsQuarter = await getShowroomDataDetail(`stats?type=quarterly`);

    this.fansWeek = this.statsWeek.ranks.fans;
    this.fansMonth = this.statsMonthly.ranks.fans;
    this.fansQuarter = this.statsQuarter.ranks.fans;
  },
  methods: {
    showToast() {
      this.showingToast = true;
      // Menampilkan toast
      var toastElList = [].slice.call(document.querySelectorAll(".toast"));
      var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl);
      });
      toastList[0].show(); // Menampilkan toast pertama
    },
    // Metode lainnya
  },
};
</script>
