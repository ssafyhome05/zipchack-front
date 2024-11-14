<template>
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
    <Bar v-if="dataLoaded"
        id="house-detail-year-graph"
        :options="chartOptions"
        :data="chartData"
        :key="dataLoaded"
    />
</template>

<script>
import HouseGraph from '@/assets/js/PlatformViewsScript/MapViewScripts/SideBarScripts/HouseInfoListScripts/HouseDetailScripts/HouseGraph.js';
export default HouseGraph;
</script>