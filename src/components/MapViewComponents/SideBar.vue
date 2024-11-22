<template>
    <div class="side-list" :class="{'side-list-dashboard': selectedTab === 'dashboard'}">
        <!-- side-list-menu  -->
        <div class="side-list-menu">
            <div class="side-list-menu-item-logo" @click="scrollToTop">
                <img :src="zLogo" class="side-list-menu-item-logo-img" />
            </div>
            <div class="side-list-menu-item1" @click="changeTab('main')" :class="{'active': selectedTab === 'main'}">   
                 <img :src="selectedTab === 'main' ? activeZipchak : zipchak"  class="side-list-menu-item-tabimg zipchak-img" />
                <span class="side-list-menu-item-tabtext">지도홈</span>
            </div>
                <div class="side-list-menu-item2" @click="changeTab('house')" :class="{'active': selectedTab === 'house'}">   
                <i class="bi bi-house-fill side-list-menu-item-tabimg"></i>
                <span class="side-list-menu-item-tabtext">매물보기</span>
            </div>
            <div class="side-list-menu-item3" @click="changeTab('bookmark')" :class="{'active': selectedTab === 'bookmark'}">
                <i class="bi bi-star-fill side-list-menu-item-tabimg"></i>
                <span class="side-list-menu-item-tabtext">즐겨찾기</span>
            </div>
            <div class="side-list-menu-item4" @click="changeTab('dashboard')" :class="{'active': selectedTab === 'dashboard'}">
                <img :src="selectedTab === 'dashboard' ? activeDashboard : dashboard"  class="side-list-menu-item-tabimg zipchak-img" />
                <span class="side-list-menu-item-tabtext">대시보드</span>
            </div>
        </div>
        
        <!-- side-list-content  --> 
        <div class = "side-list-content" :class="{'side-list-content-dashboard': selectedTab === 'dashboard'}">
            <!-- show default list -->
            <component :is="selectedComponent" />
        </div>


    </div>
</template>

<script>
import SidebarScript from '@/assets/js/PlatformViewsScript/MapViewScripts/Sidebar.js';
export default SidebarScript;
</script>
<style scoped>
@import '@/assets/css/PlatformViewsStyle/MapViewStyles/SideBar.css';
</style>
