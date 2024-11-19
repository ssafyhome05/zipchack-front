<template>

    <div v-if="houseDetail !== null" class="house-detail-container">
        <i class="bi bi-x detail-close-btn"></i>
        <div class="load-view-container" id="load-view-container">
            
        </div>
        <div class="house-detail-header">
            <div class="house-detail-title">
                <span>{{ houseDetail.aptNm }}</span>
                <span v-if="houseDetail.bookmark === false" class="house-detail-bookmark">
                    <i class="bi bi-star"></i>
                </span>
                <span v-else class="house-detail-none-bookmark">
                    <i class="bi bi-star-fill"></i>
                </span>
            </div>
            <div class="house-detail-address">
                <span>{{ address }}</span>
            </div>
        </div>

        <div class="house-detail-content">
            <!-- 거래 추이 그래프 - 컴포넌트 분리 필요 -->
            <div class="house-detail-graph">
                <HouseGraph />
            </div>

            <!-- 거래 횟수 및 평균 거래 금액 -->
            <div class="house-detail-info">
                <div class="house-detail-info-deal-avg">
                    <div class="house-detail-info-deal-avg-title">
                        <span>평균 거래 금액</span>
                        <span class="house-detail-info-deal-avg-amount">{{ houseDetail.avgDealAmount }} 만 원</span>
                    </div>
                    <p class="house-detail-info-deal-cnt">
                        {{ houseDetail.dealCnt }} 회
                    </p>
                </div>
            </div>

            <!-- 사용자 지정 장소에서 집까지의 거리 및 소요 시간 -->
            <!-- 해당 매물에서부터 주변 편의 시설까지의 거리 및 소요 시간 -->
            <!-- 컴포넌트 분리 필요 -->
            <div class="house-detail-distance">
                <HouseRoute />
            </div>
        </div>
    </div>
    
</template>

<script>
import HouseDetail from '@/assets/js/PlatformViewsScript/MapViewScripts/SideBarScripts/HouseInfoListScripts/HouseDetail.js';
export default HouseDetail;
</script>
<style>
@import '@/assets/css/PlatformViewsStyle/MapViewStyles/SideBarStyles/HouseInfoListItems/HouseDetail.css';
</style>