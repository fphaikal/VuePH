<template>
    <h3 class="mt-5">Room Trainee</h3>
    <hr>
    <div v-if="loading">
        <p>Loading...</p>
    </div>
    <div v-else>
        <div class="row g-2">
            <div v-for="trainee in traineeData" :key="trainee.room_id" class="col-md-3 col-sm-6 col-6 mt-1 mb-1"
                @click="redirectToMemberInfo(trainee.room_url_key,trainee.room_id)">
                <div class="card text-light shadow rounded-4" style="background-color: #282b30;">
                    <img :src="trainee.image" class="card-img rounded-top-4" alt="" srcset="">
                    <div class="card-body">
                        <h6 class="card-title mb-0"><b>{{ getName(trainee.main_name) }}</b></h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getShowroomData, getShowroomAdminData } from '../api';

export default {
    data() {
        return {
            traineeData: [],
            loading: true, // Mulai dengan menampilkan loading
        };
    },
    async mounted() {
        this.traineeData = await getShowroomData('rooms/trainee');
        this.loading = false;

    },

    methods: {
        // Fungsi untuk mengalihkan ke halaman informasi member
        redirectToMemberInfo(memberName, roomId) {
            this.$router.push({ path: `/member/${memberName}/${roomId}` });
        },
        getName(ShortName) {
        return ShortName.replace("（JKT48）", "")
      },
    },
};
</script>