<script setup>
import formatLongDate from "../utils/formatLongDate"
import formatLiveDuration from "../utils/formatLiveDuration"
import formatNumber from "../utils/formatNumber"
import formatTimeAgo from "../utils/formatTimeAgo"
</script>
<template>
    <div class="full-height-section text-light" style="background-color: #1e2124;">
        <div class="container">
            <div class="row mt-2 mb-3">
                <div class="col-md-12">
                    <h3>Recent Live</h3>
                </div>
            </div>
            <div v-if="recentLive">
                <div class="row g-2">
                    <div v-for="data in recentLive.recents" :key="data.data_id" class="col-4 mb-2">
                        <div class="card text-light rounded-4 border-0" style="background-color: #282b30;">
                            <img :src="data.member.img" alt="" class="card-img rounded-top-4">
                            <div class="card-body">
                                <h5 class="card-title">{{ data.member.name }}</h5>
                                <div class="row mt-2">
                                    <div class="col-auto d-flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" class="bi bi-calendar-fill my-auto" viewBox="0 0 16 16">
                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5z"/>
                                        </svg>
                                        <p class="my-auto ms-2">
                                            {{ formatLongDate(data.live_info.date.start) }} - {{ formatLongDate(data.live_info.date.end, true) }}
                                        </p>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-auto d-flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor" class="bi bi-clock-fill my-auto" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                        </svg>
                                        <p class="my-auto ms-2">{{ formatLiveDuration(data.live_info.duration) }}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-auto d-flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor" class="bi bi-people-fill my-auto" viewBox="0 0 16 16">
                                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                                        </svg>
                                        <p class="my-auto ms-2">{{ formatNumber(data.live_info.viewers) }}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-auto d-flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor" class="bi bi-gift-fill my-auto" viewBox="0 0 16 16">
                                            <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zm6 4v7.5a1.5 1.5 0 0 1-1.5 1.5H9V7h6zM2.5 16A1.5 1.5 0 0 1 1 14.5V7h6v9H2.5z"/>
                                        </svg>
                                        <p class="my-auto ms-2">{{ formatNumber(data.points) }}</p>
                                    </div>
                                </div>
                                <hr>
                                <div class="d-flex">
                                    <h6>{{ formatTimeAgo(data.live_info.date.end) }}</h6>
                                    <div class="ms-auto">
                                        <h6>Detail ></h6>
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
import { getRecentLive } from '../components/api';

export default {
    data() {
        return {
            recentLive: [],
        }
    },
    async mounted() {
        this.recentLive = await getRecentLive("date", 1, "active", -1, 30)
    },
    methods: {
    }
}
</script>