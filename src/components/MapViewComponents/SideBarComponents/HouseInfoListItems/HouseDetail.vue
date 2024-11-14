<template>
    <div v-if="houseDetail !== null" class="house-detail-container">
        <i class="bi bi-x detail-close-btn"></i>
        <div class="load-view-container" id="load-view-container">
            
        </div>
        <div class="house-detail-header">
            <div class="house-detail-title">
                <span>{{ houseDetail.aptNm }}</span>
                <span class="house-detail-bookmark">
                    <i class="bi bi-star    "></i>
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
                    <table class="house-detail-distance-info">
                        <thead>
                            <tr>
                                <th class="house-detail-distance-info-title">소요 거리</th>
                                <th class="house-detail-distance-info-icon"><i class="bi bi-car-front-fill"></i></th>
                                <td class="table-line"></td>
                                <th class="house-detail-distance-info-icon"><i class="bi bi-person-walking"></i></th>
                                <td class="table-line"></td>
                                <th class="house-detail-distance-info-icon"><i class="bi bi-bus-front"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="house-detail-distance-info-location">집</td>
                                <td class="house-detail-distance-info-time"><a>2분</a></td>
                                <td class="table-line"></td>
                                <td class="house-detail-distance-info-time"><a>5분</a></td>
                                <td class="table-line"></td>
                                <td class="house-detail-distance-info-time"><a>없음</a></td>
                            </tr>
                            <tr>
                                <td class="house-detail-distance-info-location">집</td>
                                <td class="house-detail-distance-info-time"><a>3분</a></td>
                                <td class="table-line"></td>
                                <td class="house-detail-distance-info-time"><a>10분</a></td>
                                <td class="table-line"></td>
                                <td class="house-detail-distance-info-time"><a>없음</a></td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import HouseDetail from '@/assets/js/PlatformViewsScript/MapViewScripts/SideBarScripts/HouseInfoListScripts/HouseDetail.js';
export default HouseDetail;
</script>
<style>
@import '@/assets/css/PlatformViewsStyle/MapViewStyles/SideBarStyles/HouseInfoListItems/HouseDetail.css';
</style>