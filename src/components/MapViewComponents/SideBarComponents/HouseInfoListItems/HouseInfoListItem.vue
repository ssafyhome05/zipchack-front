<template>
    <div class="house-deal-list-item" @click="clickHouse(house)">
        <div class="house-deal-list-item-detail">
            <div class="house-deal-list-item-detail-aptname">
                {{ house.aptNm }}
                <span v-if="house.bookmark === false" class="house-deal-list-item-detail-bookmark">
                    <i class="bi bi-star" @click="HouseInfoListItem(house.aptSeq, house.bookmark)"></i>
                </span>
                <span v-else class="house-deal-list-item-detail-bookmark-fill">   
                    <i class="bi bi-star-fill" @click.stop="HouseInfoListItem(house.aptSeq, house.bookmark)"></i>
                </span>
            </div>
            <div class="house-deal-list-item-detail-cnt-price">
                거래량 {{ house.dealCnt }}회 / 평균 {{ house.avgDealAmount }}만 원
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
import { SERVER_URL } from '@/assets/resources/configs/config';
import { showWarningToast, showSuccessToast, showErrorToast, showInfoToast } from '@/assets/js/PlatformViewsScript/CommonScripts/showToast';
import { useHouseDetailStore } from '@/stores/houseDetailStore';
import { onMounted } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';


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

const houseDetailStore = useHouseDetailStore();

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

const HouseInfoListItem = (aptSeq, isBookmark) => {
    if(isBookmark === false) {
        showInfoToast("북마크에 추가되었습니다.");
    } else {
        showInfoToast("북마크에서 삭제되었습니다.");
    }
}

// const clickHouse = (dongCode) => {
//     houseDetailStore.setHouseDetail(dongCode);
//     houseDetailStore.setAddress(dongCode);
// }
const clickHouse = (house) => {
    houseDetailStore.setHouseDetail(house);
    const address = `${props.sidoName} ${props.gugunName} ${props.dongName} ${house.roadNm}`;
    houseDetailStore.setAddress(address);
    console.log(house.aptSeq);
};
</script>
