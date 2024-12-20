<template>
    <div v-if="user" class="bookmark-list">
        <div class="user-custom-location-desc">사용자 지역</div>
        <div class="user-custom-location-list">
            <div v-if="userCustomSpotList.length !== 0">
                <CustomLocationItem 
                    v-for="(customSpot, index) in userCustomSpotList" 
                    :key="index" 
                    :customSpots="customSpot"
                    @refresh-list="handleRefreshList"
                />
            </div>
            
            <div class="user-custom-location-item">
                <div class="location-item">
                    <div class="location-item-add" @click="showCustomSearchModal">
                        <i class="bi bi-plus"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="bookmark-desc">즐겨찾기한 매물</div>
        <div v-if="bookmarkHouseList === null" class="none-bookmark-list" v-show="!isLoading">
            <div class="none-bookmark-list-desc">
                북마크한 매물이 없습니다.
            </div>
        </div>
        <div v-else class="exist-bookmark-list">
            <BookmarkListItem
                v-for="house in bookmarkHouseList" 
                :key="house.aptSeq" 
                :house="house" 
            />
        </div>
        <VueSpinner v-show="isLoading" size="40" color="#007bff" class="spinner"/>
    </div>
    
    <div v-else class="none-user">
       <RequiredLogin />
    </div>

    <SearchCustomSpot 
        v-show="isSearch" 
        @close-model="handleCloseModel"
        @refresh-list="handleRefreshList"
    />
    <HouseDetail 
        v-if="showModal"
    />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useUserInfoStore } from '@/stores/userInfoStore';
import { useHouseDetailStore } from '@/stores/houseDetailStore';
import { SERVER_URL } from '@/assets/resources/configs/config';
import { reissueAccessToken } from '@/assets/js/PlatformViewsScript/CommonScripts/reissueAccessToken';
import axios from 'axios';

import SearchCustomSpot from './BookmarkListItems/SearchCustomSpot.vue';
import { VueSpinner } from 'vue3-spinners';

const userInfoStore = useUserInfoStore();
const houseDetailStore = useHouseDetailStore();
const user = ref(null);
const userCustomSpotList = ref([]);
const bookmarkHouseList = ref(null);
const showModal = ref(houseDetailStore.showDetailModal);
const isLoading = ref(false);
const isSearch = ref(false);

onMounted(() => {
    if(userInfoStore.user){
        user.value = userInfoStore.user;
        getBookmarkList(userInfoStore.access_token, 1);
        getUserCustomSpotList(userInfoStore.access_token, 1);
    }else{
        user.value = null;
    }
});

watch(
    () => houseDetailStore.showDetailModal,
    () => {
        showModal.value = houseDetailStore.showDetailModal;
    },
    { immediate: true }
);


const getBookmarkList = async (access_token, times) => {
    // if (times === 0) {
    //     console.error("재시도 한도를 초과했습니다.");
    //     return;
    // }
    try {
        isLoading.value = true;
        const res = await axios.get(`${SERVER_URL}/api/bookmark/house`, {
            headers: {
                "Authorization": `${access_token}`,
            },
        });

        // 토큰 갱신이 필요한 경우 처리
        if (res.data.code === 401012 || res.data.code === 401011) {
            console.log("토큰 갱신이 필요합니다.");
            await reissueAccessToken();
            const newAccessToken = userInfoStore.access_token;
            return getBookmarkList(newAccessToken, times - 1); // 재귀 호출
        }

        // 요청 성공 시 처리
        if (res.status === 200) {
            bookmarkHouseList.value = res.data;
            return;
        }
    } catch (error) {
        console.error("요청 중 오류 발생:", error);

        // 토큰 갱신 및 재시도 처리
        await reissueAccessToken();
        const newAccessToken = userInfoStore.access_token;
        return getBookmarkList(newAccessToken, times - 1); // 재귀 호출
    } finally {
        isLoading.value = false; // 요청 상태 해제
    }
};

const getUserCustomSpotList = async (access_token, times) => {
    // if (times === 0) {
    //     console.error("재시도 한도를 초과했습니다.");
    //     return;
    // }
    try {
        isLoading.value = true;

        const res = await axios.get(`${SERVER_URL}/api/bookmark/custom`, {
            headers: {
                "Authorization": `${access_token}`,
            },
        });

        // 토큰 갱신이 필요한 경우 처리
        if (res.data.code === 401012 || res.data.code === 401011) {
            console.log("토큰 갱신이 필요합니다.");
            await reissueAccessToken();
            const newAccessToken = userInfoStore.access_token;
            return getUserCustomSpotList(newAccessToken, times - 1); // 재귀 호출
        }

        // 요청 성공 시 처리
        if (res.status === 200) {
            userCustomSpotList.value = res.data;
        }
    } catch (error) {
        console.error("요청 중 오류 발생:", error);

        // 토큰 갱신 및 재시도 처리
        await reissueAccessToken();
        const newAccessToken = userInfoStore.access_token;
        return getUserCustomSpotList(newAccessToken, times - 1); // 재귀 호출
    } finally {
        isLoading.value = false; // 로딩 상태 해제
    }
};

const showCustomSearchModal = () => {
    isSearch.value = true;
}

const handleCloseModel = () => {
    isSearch.value = false; 
};

const handleRefreshList = () => {
    const accessToken = userInfoStore.access_token;
    getUserCustomSpotList(accessToken, 1);
};


</script>
<style scoped>
@import '@/assets/css/PlatformViewsStyle/MapViewStyles/SideBarStyles/BookmarkList.css';
@import '@/assets/css/PlatformViewsStyle/MapViewStyles/SideBarStyles/BookmartListItems/CustomLocationItem.css';
</style>