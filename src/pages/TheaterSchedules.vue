<template>
    <main>
        <div class="full-height-section text-light" style="background-color: #1e2124;">
            <div class="container">
                <div class="row mt-2">
                    <div class="col-md-12">
                        <h3>Theater Schedules</h3>
                    </div>
                </div>
                <div v-if="filteredRecents">
                    <div class="row g-2 mt-2">
                        <div v-for="list in filteredRecents" :key="list._id" class="col-md-4"
                            @click="redirectToSetlistInfo(list._id)">
                            <div class="card rounded-4" style="background-color: #282b30;">
                                <div class="ratio ratio-16x9 " style="position: relative;">
                                    <img :src="list.setlist.image" class="card-img-top rounded-top-4"
                                        style="object-fit: cover; position: absolute; width: 100%; height: 100%; top: 0; left: 0;"
                                        alt="...">
                                </div>
                                <div class="card-body text-light">
                                    <h5 class="card-title">{{ list.setlist.name }}</h5>
                                    <p>{{ truncateDescription(list.setlist.description, 15) }}</p>
                                    <hr>
                                    <div class="row ">
                                        <div class="col-auto d-flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white"
                                                class="bi bi-calendar-fill my-auto" viewBox="0 0 16 16">
                                                <path
                                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5z" />
                                            </svg>
                                            <p class="ms-2 my-auto text-light">
                                                Theater Date:
                                                {{ formatLocalDate(list.showDate) }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="row mt-1">
                                        <div class="col-auto d-flex justify-content-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white"
                                                class="bi bi-clock-fill my-auto" viewBox="0 0 16 16">
                                                <path
                                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                            </svg>
                                            <p class="ms-2 my-auto text-light">
                                                Show Time:
                                                {{ list.showTime }}
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
    </main>
</template>

<script>
import { getShowroomAdminData } from '../components/api';
import { useHead } from '@unhead/vue';

export default {
    data() {
        return {
            schedules: [],
        }
    },
    async mounted() {
        this.schedules = await getShowroomAdminData('schedules')

        useHead({
            title: this.$route.meta.title || 'VuePH',
            meta: [
                {
                name: 'description',
                content: this.$route.meta.description,
                },
                {
                property: 'og:title',
                content: this.$route.meta.title,
                },
                {
                property: 'og:description',
                content: this.$route.meta.description,
                },
            ],
            });
    },
     
    computed: {
        filteredRecents() {
            const currentDate = new Date();
            return this.schedules.filter(theater => {
                const theaterDate = new Date(theater.showDate);
                return theaterDate > currentDate || theaterDate.toDateString() === currentDate.toDateString();
            });
        },
    },


    methods: {
        redirectToSetlistInfo(setlistId) {
            this.$router.push({ path: `/setlist/${setlistId}` })
        },
        truncateDescription(description, maxLength) {
            const words = description.split(' ');
            if (words.length > maxLength) {
                return words.slice(0, maxLength).join(' ') + '...';
            }
            return description;
        },
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
    }

}
</script>