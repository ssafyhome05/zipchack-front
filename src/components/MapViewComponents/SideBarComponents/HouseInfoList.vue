<template>
    <div class="house-deal-content-list">
        <div class="search-box">
            <i class="bi bi-search"></i>
            <div class="search-form">
                <input type="text" class="search-input" placeholder="건물 상세 검색" />
            </div>
        </div>
        <div class="search-subtitle">` {{ keyword }} ` 으로 검색하기</div>

        <div class="search-title">지역 선택</div>
        <div class="option-box">
            <div class="option-item">
                <div class="sido" @click="openSidoModal">시·도</div>
                <div class="gugun" @click="openGugunModal">구·군</div>
                <div class="dong" @click="openDongModal">읍·면·동</div>

                <div v-if="isLocationBookmark" class="dong-like-box" @click="doLocationBookmark">
                    <i class="bi bi-star-fill"></i>
                </div>
                <div v-else class="dong-dislike-box" @click="doLocationBookmark">
                    <i class="bi bi-star"></i>
                </div>
                
            </div>
            <!-- <div class="option-item-date">
                <i class="bi bi-calendar-fill start-date-icon"></i>
                <input type="month" class="start-date-input" placeholder="시작일자" />
                <i class="bi bi-calendar-fill end-date-icon"></i>
                <input type="month" class="end-date-input" placeholder="종료일자" />
            </div> -->

        </div>
      

        <button type="submit" class="search-btn" value="매물 조회" @click="validateForm"> 매물 조회</button>
        
        <div class="house-deal-list">
            <div v-if="houseInfoList.length == 0" class="none-house-deal-list">조회된 매물이 없습니다.</div>
            
            <div v-else class="house-deal-list-item-container">
                <HouseInfoListItem 
                    v-for="house in houseInfoList" 
                    :key="house.aptSeq" 
                    :house="house" 
                    :sidoName="sidoName"
                    :gugunName="gugunName"
                    :dongName="dongName"
                    @click-house="openHouseDetail(house)"
                />
            </div>
        </div>
    </div>

    <HouseDetail 
        v-if="showModal"
        :houseDetail="houseDetail"
    />

    <DoughnutChart v-if="showDoughnutGraph"/>

    <div v-if="isLoading" class="loading-screen">
        <VueSpinner size="50" color="#007bff" class="search-spinner"/>
    </div>
    
</template>

<script>
// import { VueSpinner } from 'vue3-spinners';
import HouseInfoListScript from '@/assets/js/PlatformViewsScript/MapViewScripts/SideBarScripts/HouseInfoListScripts/HouseInfoList.js';
import HouseDetail from './HouseInfoListItems/HouseDetail.vue';
export default HouseInfoListScript;
</script>

<style>
@import '@/assets/css/PlatformViewsStyle/MapViewStyles/SideBarStyles/HouseInfoList.css';
</style>