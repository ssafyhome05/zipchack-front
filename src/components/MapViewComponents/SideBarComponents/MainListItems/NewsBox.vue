<template>
  <div 
    v-for="(news, index) in newsList"
    :key="index"
    class="news-item "
    @click="moveMap(news.cityName)" 
  >
    <h5 class="city-name">{{ news.cityName }}</h5>
    <a :href="news.url" class="title" target="_blank">{{ news.title }}</a>
    <div class="image-container">
      <img :src="news.img" alt="News Image" />
    </div>
    <p class="source">출처 : {{ news.ref }}</p>
  </div>
</template>

<script>
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
  font-size: 0.9rem;
  margin-bottom: 4px;
}

.title {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 8px;
  color: inherit;
  text-decoration: none;
  position: relative;
}

.title:hover {
  color:skyblue;
  font-weight: bolder;
}

.title:hover::after {
  content: "기사원문보기";
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none;
}

.title:hover::after {
  opacity: 1;
}

.source {
  font-size: 0.8rem;
  color: #888;
  text-align: right;
}

.image-container {
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 8px;
  margin-top: 8px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>


