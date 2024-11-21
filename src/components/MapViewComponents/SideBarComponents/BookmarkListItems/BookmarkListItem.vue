<template>
    <div class="bookmark-list-item" @click="clickBookmarkHouse(house)">
        <div class="bookmark-item">
            <div class="bookmark-item-title">
                {{ house.aptNm }}
                <span class="bookmark-item-like">   
                    <i class="bi bi-star-fill"></i>
                </span>
            </div>
            <div class="bookmark-item-desc">
                총 거래량 {{ house.dealCnt }}회 / 평균 {{ house.avgDealAmount }}만 원
            </div>
        </div>
    </div>
</template>
<script setup>
import { useHouseDetailStore } from '@/stores/houseDetailStore';

defineProps({
    house: {
        type: Object,
        required: true,
    },
});
const houseDetailstore = useHouseDetailStore();

const clickBookmarkHouse = (house) => {
    houseDetailstore.showDetailModal = true;
    houseDetailstore.houseDetail = house;
    houseDetailstore.address = null;
}
</script>
<style scoped>
@import '@/assets/css/PlatformViewsStyle/MapViewStyles/SideBarStyles/BookmartListItems/BookmarkListItem.css';
</style>