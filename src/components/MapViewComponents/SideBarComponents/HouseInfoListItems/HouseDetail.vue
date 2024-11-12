<template>
    <div v-if="houseDetail !== null" class="house-detail-container">
        <div class="load-view-container" id="load-view-container">
            로드뷰 넣을거임
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
                <p class="house-detail-graph-title">
                    <i class="bi bi-bar-chart-line-fill"></i>
                    거래 추이

                    <select class="house-detail-graph-year-select" @change="changeYear">
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                    </select>
                </p>
                <Bar
                    id="house-detail-year-graph"
                    :options="chartOptions"
                    :data="chartData"
                />
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