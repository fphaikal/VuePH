<template>
    <main>
        <div v-if="setlistInfo">
            <div class="ratio ratio-21x9 d-md-none" style="position: relative">
                <img :src="setlistInfo.setlist.image" class="" style="
                object-fit: cover;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
              " alt="..." />
            </div>
        </div>
        <div class="full-height-section text-light" style="background-color: #1e2124">

            <div class="container">
                <div v-if="setlistInfo">
                    <div class="row g-2 mt-2">
                        <div class="col-md-8">
                            <div class="ratio ratio-16x9 d-none d-md-block shadow" style="position: relative">
                                <img :src="setlistInfo.setlist.image" class="card-img-top rounded-4" style="
                    object-fit: cover;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                  " alt="..." />
                            </div>
                            <div class="row mt-4">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <h2 class="my-auto mb-2 mobile-text-center">
                                                {{ setlistInfo.setlist.name }}
                                            </h2>
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-center justify-content-md-end">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white"
                                                class="bi bi-calendar-fill my-auto" viewBox="0 0 16 16">
                                                <path
                                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5z" />
                                            </svg>
                                            <p class="ms-2 my-auto">
                                                Theater Date:
                                                {{ formatLocalDate(setlistInfo.showDate) }}
                                            </p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                fill="currentColor" class="bi bi-clock-fill my-auto ms-3"
                                                viewBox="0 0 16 16">
                                                <path
                                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                            </svg>
                                            <p class="ms-2 my-auto">
                                                Show Time:
                                                {{ setlistInfo.showTime }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="card mt-2 rounded-4 shadow" style="background-color: #282b30">
                                        <div class="card-body text-light">
                                            <p class="my-auto">
                                                {{ setlistInfo.setlist.description }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="row g-2 mt-1 mb-3">
                                        <div class="col-md-6">
                                            <a :href="setlistInfo.ticketShowroom" class="card rounded-4 bg-success shadow">
                                                <div class="card-body text-light d-flex">
                                                    <p class="my-auto mx-auto">
                                                        Buy Ticket Live Streaming
                                                    </p>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="col-md-6">
                                            <a :href="setlistInfo.ticketTheater" class="card rounded-4 bg-danger shadow">
                                                <div class="card-body text-light d-flex">
                                                    <p class="my-auto mx-auto">Buy Ticket Theater</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card rounded-4 shadow" style="background-color: #282b30">
                                <div class="card-body text-light">
                                    <h5>Lineup Member</h5>
                                    <div class="row g-2 mt-2">
                                        <div v-for="member in setlistInfo.memberList" :key="member._id"
                                            class="col-md-4 col-sm-3 col-4">
                                            <div class="card shadow rounded-4" style="background-color: #1e2124">
                                                <img :src="member.image" class="card-img-top rounded-top-4" style="" alt="Member Image" />
                                                <div class="card-body">
                                                    <p class="my-auto text-center text-light card-title">
                                                        {{ member.stage_name.trim() }}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>Loading...</p>
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
</style>

<script>
import { getShowroomAdminData } from "../components/api";

export default {
    data() {
        return {
            setlistInfo: null,
            loading: true, // Mulai dengan menampilkan loading
        };
    },
    async mounted() {
        try {
            const setlistId = this.$route.params.setlistId;
            this.setlistInfo = await getShowroomAdminData(`schedules/${setlistId}`);
        } catch (error) {
            console.error("Gagal mengambil data member:", error);
        }
    },

    methods: {
        formatLocalDate(dateString) {
            const date = new Date(dateString);
            const options = {
                timeZone: "Asia/Jakarta", // Zona waktu Indonesia (WIB)
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            return date.toLocaleString("id-ID", options);
        },
    },
};
</script>
