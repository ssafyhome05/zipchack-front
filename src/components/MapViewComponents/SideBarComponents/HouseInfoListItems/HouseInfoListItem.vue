<template>
    <div class="house-deal-list-item" @click="clickHouse(house.aptSeq)">
        <div class="house-deal-list-item-detail">
            <div class="house-deal-list-item-detail-aptname">{{ house.aptNm }}</div>
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
    // import HouseInfoListItem from '@/assets/js/PlatformViewsScript/MapViewScripts/SideBarScripts/HouseInfoListScripts/HouseInfoListItem.js';

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

    const clickHouse = (aptSeq) => {
        console.log(aptSeq);
    };
</script>
