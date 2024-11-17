<template>
    <div class="house-deal-list-item" @click="clickHouse(house)">
        <div class="house-deal-list-item-detail">
            <div class="house-deal-list-item-detail-aptname">
                {{ house.aptNm }}
                <span v-if="house.bookmark === false" class="house-deal-list-item-detail-bookmark">
                    <i class="bi bi-star" @click.stop="clickBookmark(house.aptSeq, house.bookmark)"></i>
                </span>
                <span v-else class="house-deal-list-item-detail-bookmark-fill">   
                    <i class="bi bi-star-fill" @click.stop="clickBookmark(house.aptSeq, house.bookmark)"></i>
                </span>
            </div>
            <div class="house-deal-list-item-detail-cnt-price">
                총 거래량 {{ house.dealCnt }}회 / 평균 {{ house.avgDealAmount }}만 원
            </div>
            <div class="house-deal-list-item-detail-address">
                <p>{{ sidoName }} {{ gugunName }} {{ dongName }} {{ house.roadNm }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
//    import { HouseInfoListItem, clickHouse } from '@/assets/js/PlatformViewsScript/MapViewScripts/SideBarScripts/HouseInfoListScripts/HouseInfoListItem.js';
// import  HouseInfoListItem  from '@/assets/js/PlatformViewsScript/MapViewScripts/SideBarScripts/HouseInfoListScripts/HouseInfoListItem.js';
import axios from 'axios';
import { SERVER_URL } from '@/assets/resources/configs/config.js';
import { showWarningToast, showSuccessToast, showErrorToast, showInfoToast } from '@/assets/js/PlatformViewsScript/CommonScripts/showToast';
import { useHouseListStore } from '@/stores/houseListStore';
import { useHouseDetailStore } from '@/stores/houseDetailStore';
import { useUserInfoStore } from '@/stores/userInfoStore';
import { onMounted, ref } from 'vue';
import { reissueAccessToken } from '@/assets/js/PlatformViewsScript/CommonScripts/reissueAccessToken';
import { addHouseBookmark, removeHouseBookmark } from '@/assets/js/PlatformViewsScript/MapViewScripts/SideBarScripts/HouseInfoListScripts/bookmark';

const props = defineProps({
    house: {
        type: Object,
        required: true,
    },
    sidoName: {
        type: String,
        required: true,
    },
    gugunName: {
        type: String,
        required: true,
    },
    dongName: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(['click-house']);
const houseDetailStore = useHouseDetailStore();
const houseListStore = useHouseListStore();
const userInfoStore = useUserInfoStore();
const user = ref(null);

onMounted(() => {
    loadKakaoMapScript();
});

// 스크립트 로드 후 로드뷰 호출
const loadKakaoMapScript = () => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_API_KEY&autoload=false&libraries=services";
        
        document.head.appendChild(script);
    });
};

const clickBookmark = async (aptSeq, isBookmark) => {
    user.value = userInfoStore.getUser;

    if (!user.value) {
        showInfoToast("로그인 후 이용가능합니다.");
        return;
    }

    const access_token = userInfoStore.access_token;

    if (isBookmark === false) {
        // await reissueAccessToken();
        try {
            await addHouseBookmark(aptSeq, access_token, 1);
        } catch (error) {
            showErrorToast("오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
        }
    } else {
        try {
            await removeHouseBookmark(aptSeq, access_token, 1);
            // 북마크 상태 업데이트
            showInfoToast("북마크에서 삭제되었습니다.");
        } catch (error) {
            console.error("북마크 삭제 중 오류 발생:", error);
            showErrorToast("오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
        }
    }
};

const clickHouse = (house) => {
    houseDetailStore.setHouseDetail(house);
    const address = `${props.sidoName} ${props.gugunName} ${props.dongName} ${house.roadNm}`;
    houseDetailStore.setAddress(address);
    emit('click-house', house);
    console.log(house);
};
</script>
