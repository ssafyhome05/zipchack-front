<template>
  <div class="content-item">
    <div class="content-title">{{ item.title }}</div>
    <div class="content-list-item">
      <component :is="item.component" />
    </div>
  </div>
  
</template>

<script>
import ToptenBox from './ToptenBox.vue';
import NewsBox from './NewsBox.vue';

export default {
    components: {
        ToptenBox,
        NewsBox
    },
    props: {
        item: Object
    }
}
</script>

<style>
@import '@/assets/css/PlatformViewsStyle/MapViewStyles/SideBarStyles/MainList.css';
</style>