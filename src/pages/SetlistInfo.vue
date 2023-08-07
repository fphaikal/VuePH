<template>
    <main>

    </main>
</template>


<script>
import { getShowroomAdminData } from '../components/api';

export default {
    data() {
        return {
            setlistInfo: [],
        };
    },
    async mounted(){
        try {
            const setlistId  = this.$route.params.setlistId;
            this.setlistInfo = await getShowroomAdminData(`schedules/${setlistId}`)

        } catch(error) {
            console.error('Gagal mengambil data member:', error)
        }
    }


}
</script>