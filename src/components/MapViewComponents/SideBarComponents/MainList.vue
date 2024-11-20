<template>
    <!-- content-list -->
    <div class="content-list">
        <MainItem v-for="item in mainItems" :key="item.title" :item="item" />
    </div>
</template>
<script>
import MainItem from './MainItems/MainItem.vue';
import ToptenBox from './MainItems/ToptenBox.vue';
import NewsBox from './MainItems/NewsBox.vue';

export default {
    components: {
        MainItem
    },
    data() {
        return {
            mainItems: [{title: '인기 검색어', component: ToptenBox}, {title: '뉴스에서 핫한 지역', component: NewsBox}, {title: '가장 많은 거래가 있었던 매물', component: 'DealBox'}]
        }
    }
}
</script>
<style scoped>
@import '@/assets/css/PlatformViewsStyle/MapViewStyles/SideBarStyles/MainList.css';
</style>