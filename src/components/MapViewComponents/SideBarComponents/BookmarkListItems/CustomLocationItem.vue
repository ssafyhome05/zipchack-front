<template>
    <div class="user-custom-location-item">
        <div class="location-item">
            <div class="location-item-title">
                {{ customSpots.spotName }}
                <span class="location-item-delete" @click="deleteCustomSpot(customSpots.spotSeq)">삭제</span>
            </div>
            
            <div class="location-item-addr">
                {{ customSpots.roadNm }}
            </div>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { SERVER_URL } from '@/assets/resources/configs/config';
import { useUserInfoStore } from '@/stores/userInfoStore';
import { test } from '@/assets/js/PlatformViewsScript/CommonScripts/reissueAccessToken';

defineProps({
    customSpots: {
        type: Object
    }
})

const emit = defineEmits(['refresh-list']);

const userInfoStore = useUserInfoStore();


const deleteCustomSpot = async (customSeq) => {
    await axios.delete(`${SERVER_URL}/api/bookmark/custom/${customSeq}`, {
                headers: {
                    'Authorization': userInfoStore.access_token,
                }
            })
            .then(async (res) => {
                if (res.data.code === 401012 || res.data.code === 401011) {
                    console.log("토큰 갱신이 필요합니다.");
                    return deleteCustomSpot(customSeq);
                }
                if(res.status === 200){
                    const data = res.data;
                    emit('refresh-list');
                    console.log(data);

                }
            })
            .catch(error => {
                console.error("에러 발생:", error);
                showWarningToast("요청에 실패했습니다.");
            });
}
</script>
<style scoped>
@import '@/assets/css/PlatformViewsStyle/MapViewStyles/SideBarStyles/BookmartListItems/CustomLocationItem.css';
</style>