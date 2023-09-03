<script setup>
import formatLongDate from "../utils/formatLongDate"
import formatLiveDuration from "../utils/formatLiveDuration"
import formatNumber from "../utils/formatNumber"
import formatTimeAgo from "../utils/formatTimeAgo"
import { RouterLink } from "vue-router"
</script>
<template>
    <div class="full-height-section text-light" style="background-color: #1e2124;">
        <div class="container">
            <div class="row mt-2 mb-3">
                <div class="col-md-12">
                    <h3>Recent Live</h3>
                </div>
            </div>
            <div v-if="recentLive" class="d-none d-sm-block">
                <div class="row g-2 ">
                    <div v-for="data in recentLive.recents" :key="data.data_id" class="col-md-4 col-6 mb-2">
                        <div class="card text-light rounded-4 border-0" style="background-color: #282b30;">
                            <img :src="data.member.img" alt="" class="card-img rounded-top-4">
                            <div class="card-body">
                                <h5 class="card-title">{{ getName(data.member.name) }}</h5>
                                <div class="row mt-2">
                                    <div class="col-auto d-flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor"
                                            class="bi bi-calendar-fill my-auto" viewBox="0 0 16 16">
                                            <path
                                                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5z" />
                                        </svg>
                                        <p class="my-auto ms-2">
                                            {{ formatLongDate(data.live_info.date.start) }} - {{
                                                formatLongDate(data.live_info.date.end, true) }}
                                        </p>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-auto d-flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor"
                                            class="bi bi-clock-fill my-auto" viewBox="0 0 16 16">
                                            <path
                                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                        </svg>
                                        <p class="my-auto ms-2">{{ formatLiveDuration(data.live_info.duration) }}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-auto d-flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor"
                                            class="bi bi-people-fill my-auto" viewBox="0 0 16 16">
                                            <path
                                                d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                        </svg>
                                        <p class="my-auto ms-2">{{ formatNumber(data.live_info.viewers) }}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-auto d-flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="currentColor"
                                            class="bi bi-gift-fill my-auto" viewBox="0 0 16 16">
                                            <path
                                                d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zm6 4v7.5a1.5 1.5 0 0 1-1.5 1.5H9V7h6zM2.5 16A1.5 1.5 0 0 1 1 14.5V7h6v9H2.5z" />
                                        </svg>
                                        <p class="my-auto ms-2">{{ formatNumber(data.points) }}</p>
                                    </div>
                                </div>
                                <hr>
                                <div class="d-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-clock-history my-auto" viewBox="0 0 16 16">
                                        <path
                                            d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                                        <path
                                            d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                                    </svg>
                                    <h6 class="my-auto ms-2">{{ formatTimeAgo(data.live_info.date.end) }}</h6>
                                    <div @click="redirectToRecentLiveDetail(data.member.url, data.data_id)" class="ms-auto">
                                        <h6 class="my-auto">Detail ></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile View -->
            <div v-if="recentLive" class="d-md-none">
                <div v-for="data in recentLive.recents" :key="data.data_id" class="row g-2 mb-2">
                    <div class="text-light rounded-4 border-0 p-2 " style="background-color: #282b30;">
                        <div class="row g-1">
                            <div class="col-5">
                                <img :src="data.member.img" class="img-fluid rounded-4" alt="">
                            </div>
                            <div class="col-6 ms-2">
                                <h6 class="mb-1">{{ getName(data.member.name) }}</h6>
                                <div class="row">
                                    <div class="col-auto">
                                        <div class="row">
                                            <div class="col-auto d-flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" fill="currentColor"
                                                    class="bi bi-clock-fill my-auto" viewBox="0 0 16 16">
                                                    <path
                                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                                </svg>
                                                <small class="my-auto ms-2">{{ formatLiveDuration(data.live_info.duration)
                                                }}</small>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-auto d-flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" fill="currentColor"
                                                    class="bi bi-people-fill my-auto" viewBox="0 0 16 16">
                                                    <path
                                                        d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                                </svg>
                                                <small class="my-auto ms-2">{{ formatNumber(data.live_info.viewers) }}</small>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-auto d-flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" fill="currentColor"
                                                    class="bi bi-gift-fill my-auto" viewBox="0 0 16 16">
                                                    <path
                                                        d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zm6 4v7.5a1.5 1.5 0 0 1-1.5 1.5H9V7h6zM2.5 16A1.5 1.5 0 0 1 1 14.5V7h6v9H2.5z" />
                                                </svg>
                                                <small class="my-auto ms-2">{{ formatNumber(data.points) }}</small>
                                            </div>
                                        </div>
    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <hr class="mb-2 mt-3">
                                <div class="d-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-clock-history my-auto" viewBox="0 0 16 16">
                                        <path
                                            d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                                        <path
                                            d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                                    </svg>
                                    <h6 class="my-auto ms-2">{{ formatTimeAgo(data.live_info.date.end) }}</h6>
                                    <RouterLink :to="'recent-live/' + data.member.url + '/' + data.data_id"  class="ms-auto">
                                        <h6 class="my-auto">Detail ></h6>
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
import { getRecentLive } from '../components/api';

export default {
    data() {
        return {
            recentLive: [],
            getShortName: "",
        }
    },
    async mounted() {
        this.recentLive = await getRecentLive("date", 1, "active", -1, 30)
    },
    methods: {
        redirectToRecentLiveDetail(memberName, dataId) {
            this.$router.push({ path: `/recent-live/${memberName}/${dataId}` })
        },
        getName(ShortName) {
            return ShortName.replace("（JKT48）", "")
        },
    }
}
</script>