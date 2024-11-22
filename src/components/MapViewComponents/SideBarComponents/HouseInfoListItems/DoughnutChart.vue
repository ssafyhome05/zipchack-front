<template>
  <div class="doughnut-div">
    <Doughnut v-if="dataLoaded"
      :options="chartOptions"
      :data="chartData"
    />
    <div class="gugunName">{{ gugunName }}</div>
  </div>
</template>

<script>
import Doughnut from '@/assets/js/PlatformViewsScript/MapViewScripts/SideBarScripts/HouseInfoListScripts/Doughnut';
export default Doughnut;
</script>

<style>
@import '@/assets/css/PlatformViewsStyle/MapViewStyles/SideBarStyles/BookmartListItems/Doughnut.css';
</style>
