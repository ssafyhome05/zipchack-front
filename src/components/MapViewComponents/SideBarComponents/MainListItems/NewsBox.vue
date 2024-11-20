<template>
  <div 
    v-for="(news, index) in newsList"
    :key="index"
    class="news-item "
    @click="moveMap(news.cityName)" 
  >
    <h5 class="city-name">{{ news.cityName }}</h5>
    <a :href="news.url" class="title">{{ news.title }}</a>
    <div class="image-container">
      <img :src="news.img" alt="News Image" />
    </div>
    <p class="source">출처 : {{ news.ref }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import newsList from '@/assets/js/PlatformViewsScript/MapViewScripts/SideBarScripts/MainItemListScripts/newsList.js';
export default newsList;

</script>

<style scoped>
.news-item {
  
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  box-shadow: 0px 5px 5px rgba(160, 160, 160, 0.42);

}

.news-item:hover {
  background-color: #f9f9f9;
}

.city-name {
  font-size: 0.9rem; /* news.title보다 작게 */
  margin-bottom: 4px;
}

.title {
  font-weight: bold; /* 기본 굵기 */
  font-size: 1rem; /* 기본 크기 */
  margin-bottom: 8px;
  color: inherit; /* 링크 색상을 상속 */
  text-decoration: none; /* 기본 밑줄 제거 */
  position: relative; /* 말풍선 위치 조정을 위해 relative 추가 */
}
/* hover 시 글씨를 굵게 설정 */
.title:hover {
  color:skyblue;
  font-weight: bolder; /* 글씨를 더 굵게 */
}

.title:hover::after {
  content: "기사원문보기"; /* 말풍선에 표시될 텍스트 */
  position: absolute;
  top: -25px; /* 텍스트가 위쪽에 위치하도록 조정 */
  left: 50%;
  transform: translateX(-50%); /* 중앙 정렬 */
  background-color: #333; /* 말풍선 배경색 */
  color: #fff; /* 말풍선 텍스트 색상 */
  padding: 5px 10px; /* 말풍선 여백 */
  border-radius: 4px; /* 둥근 모서리 */
  font-size: 0.8rem; /* 말풍선 텍스트 크기 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none; /* 말풍선 클릭 방지 */
}

.title:hover::after {
  opacity: 1;
}

.source {
  font-size: 0.8rem; /* 출처 부분 한 단위 작게 */
  color: #888; /* 회색 설정 */
  text-align: right;
}

/* 이미지 스타일 */
.image-container {
  width: 100%; /* 이미지 가로 사이즈를 부모에 맞춤 */
  height: 150px; /* 이미지가 차지할 고정 높이 */
  overflow: hidden; /* 이미지가 높이를 넘어갈 경우 숨김 */
  border-radius: 8px; /* 이미지에 둥근 테두리 적용 */
  margin-bottom: 8px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 가로는 맞추고, 세로는 잘리게 */
}
</style>


