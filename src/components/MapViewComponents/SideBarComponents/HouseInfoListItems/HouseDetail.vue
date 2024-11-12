<template>
    <div v-if="houseDetail !== null">
    <div class="house-detail-container">
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
            <div class="house-detail-graph">
                <p class="house-detail-graph-title">
                    <i class="bi bi-bar-chart-line-fill"></i>
                    거래 추이

                    <select class="house-detail-graph-year-select">
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