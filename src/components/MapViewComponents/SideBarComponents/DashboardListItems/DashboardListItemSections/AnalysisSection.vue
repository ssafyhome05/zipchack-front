<template>
    <div>
        <div class="card">
        <h3>AI 분석</h3>

            <div>
                <!-- side-list-menu  -->
                <div class="side-list-menu">
                    
                    <div class="side-list-menu-item" @click="changeTab('aiPricePredict')" :class="{'active': selectedAiTab === 'aiPricePredict'}">   
                        <img :src="selectedAiTab === 'aiPricePredict' ? aiPricePredictActiveIcon : aiPricePredictIcon"  class="side-list-menu-item-tabimg zipchak-img" />
                        <span class="side-list-menu-item-tabtext">전망분석</span>
                    </div>

                    <div class="side-list-menu-item" @click="changeTab('aiRecommend')" :class="{'active': selectedAiTab === 'aiRecommend'}">   
                        <img :src="selectedAiTab === 'aiRecommend' ? aiRecommendActiveIcon : aiRecommendIcon"  class="side-list-menu-item-tabimg zipchak-img" />
                        <span class="side-list-menu-item-tabtext">매물추천</span>
                    </div>
                    
                </div>
                
                <!-- side-list-content  --> 
                <div class = "">
                    <!-- show default list -->
                    <component :is="selectedAiComponent" />
                </div>
            </div>
        </div>
    </div>


  </template>
  
  <script>
import AnalysisSection from '@/assets/js/PlatformViewsScript/MapViewScripts/SideBarScripts/DashboardListScripts/AnalysisSection.js'
export default AnalysisSection;

  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .card h3 {
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: bold;
  }
  
  /* 사이드 메뉴 스타일 */
  .side-list-menu {
    display: flex;
    flex-direction: row; /* 가로 정렬 */
    gap: 16px; /* 메뉴 간격 */
    /* justify-content: center; 아이콘을 가운데 정렬 */
    align-items: center; /* 세로 정렬 가운데 */
  }
  
  .side-list-menu-item {
    display: flex;
    flex-direction: column; /* 아이콘과 텍스트를 세로로 배치 */
    align-items: flex-start; /* 가운데 정렬 */
    
    cursor: pointer;
  }
  
  .side-list-menu-item-tabimg {
    width: 55px; /* 아이콘 크기 설정 */
    height: 55px; /* 아이콘 크기 설정 */
    margin-bottom: 8px; /* 아이콘과 텍스트 간격 */
  }
  
  .side-list-menu-item-tabtext {
    font-size: 14px;
    font-weight: 500;
    text-align: center;
  }

  
  .active .side-list-menu-item-tabtext {
    color: #007bff; /* 활성화된 텍스트 색상 */
  }
  </style>