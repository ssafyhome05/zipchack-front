<template>
    <div v-if="user" class="bookmark-list">
        <div class="bookmark-desc">즐겨찾기한 매물</div>
        <div v-if="bookmarkHouseList === null" class="none-bookmark-list">
            <div class="none-bookmark-list-desc">
                북마크한 매물이 없습니다.
            </div>
        </div>
            <BookmarkListItem
                v-for="house in bookmarkHouseList" 
                :key="house.aptSeq" 
                :house="house" 
            />
    </div>
    <div v-else class="none-user">
       <RequiredLogin />
    </div>

    <HouseDetail 
        v-if="showModal"
    />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useUserInfoStore } from '@/stores/userInfoStore';
import { useHouseDetailStore } from '@/stores/houseDetailStore';
import { SERVER_URL } from '@/assets/resources/configs/config';
import { reissueAccessToken, test } from '@/assets/js/PlatformViewsScript/CommonScripts/reissueAccessToken';
import axios from 'axios';

const userInfoStore = useUserInfoStore();
const houseDetailStore = useHouseDetailStore();
const user = ref(null);
const bookmarkHouseList = ref(null);
const showModal = ref(houseDetailStore.showDetailModal);

onMounted(() => {
    if(userInfoStore.user){
        user.value = userInfoStore.user.data;
        getBookmarkList(userInfoStore.access_token, 1);
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
    if(times === 0){
        return;
    }
    try{
        await axios.get(`${SERVER_URL}/api/bookmark/house`, 
        {
            headers: {
                "Authorization": `${access_token}`,
            }
        }).then(async (res) => {
            if(res.data.code === 401012){
                console.log("토큰 만료됨");
                await test(); // reissueAccessToken
                return await getBookmarkList(access_token, times - 1);
            }

            if(res.data.code === 401011){
                console.log("유효하지 않은 토큰임", res);
                await test(); // reissueAccessToken
                return await getBookmarkList(access_token, times - 1);
            }

            if(res.status === 200){
                // console.log("사용자 북마크 매물 불러오기 완료", res.status);
                bookmarkHouseList.value = res.data;
                // console.log(bookmarkHouseList.value);
            }
        }).catch(err => {
            console.log(err);
        });

    }catch(error){
        console.log(error);
    }

};

</script>
<style scoped>
.none-user{
    width: 425px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.none-bookmark-list{
    width: 425px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.none-bookmark-list-desc{
    width: 100%;
    height: 20px;
    font-weight: 17px;
}

.bookmark-desc{
    font-size: 19px;
    padding-left: 20px;
    font-weight: bold;
    padding-bottom: 20px;
}

.bookmark-list{
    position: relative;
    width: 424px;
    height: 100%;
    overflow-y: scroll;
    padding-top: 30px;
    margin-bottom: 20px;
}

.bookmark-list::-webkit-scrollbar {
  width: 0.5vw;
}

.bookmark-list::-webkit-scrollbar-thumb {
  background-color: #cacaca;
  border-radius: 10px;
}
</style>