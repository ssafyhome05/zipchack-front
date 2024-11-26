
<script setup>
    import {ref, onMounted} from 'vue';
    import { useLocationInfoStore } from '@/stores/LocationInfo';
    import { useUserInfoStore }from '@/stores/userInfoStore';

    import DashboardListItem from '@/components/MapViewComponents/SideBarComponents/DashboardListItems/DashboardListItem.vue';
    import PopulationSection from '@/components/MapViewComponents/SideBarComponents/DashboardListItems/DashboardListItemSections/PopulationSection.vue';
    import BusinessBuildingSection from '@/components/MapViewComponents/SideBarComponents/DashboardListItems/DashboardListItemSections/BusinessBuildingSection.vue';
    import ClosestSection from '@/components/MapViewComponents/SideBarComponents/DashboardListItems/DashboardListItemSections/ClosestSection.vue';
    import AnalysisSection from '@/components/MapViewComponents/SideBarComponents/DashboardListItems/DashboardListItemSections/AnalysisSection.vue';
    import LoadingScreen from './DashboardListItems/DashboardListItemSections/LoadingScreen.vue';

    const boardList = ref([
        {
            title: '집착 지역',        
            components : [
                PopulationSection,
                BusinessBuildingSection,
            ]
        },
        {
            title: '집착 매물',        
            components : [
                ClosestSection,
                AnalysisSection
            ]
        }
    ]);

    const userInfoStore = useUserInfoStore();
    const locationInfoStore = useLocationInfoStore();
    const isLoading = ref(false);

    onMounted(async () => {
        if(userInfoStore.user){
            isLoading.value = true;
            await locationInfoStore.getNearestAptFromCustomSpot();
            isLoading.value = false;
        }else{
            return;
        }
    });

</script>

<template>
    <div class="dashboard-container">
        <DashboardListItem v-for="board,idx in boardList" :board="board" :key="idx"/>
    <transition name="fade">
      <LoadingScreen v-if="isLoading" />
    </transition>
    </div>
    
</template>
    
    
<style scoped>
.dashboard-container{
    position: absolute;
    height: 85%;
    width: 113.5%;
    overflow: auto
}

.dashboard-container::-webkit-scrollbar {
    width: 0.5vw;
} 

.dashboard-container::-webkit-scrollbar-thumb {
    background-color: #cacaca;
    border-radius: 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease; /* 0.3초 동안 부드러운 전환 */
}

.fade-enter-from, .fade-leave-to {
  opacity: 0; /* 시작 또는 종료 시 투명도 */
}

.fade-enter-to, .fade-leave-from {
  opacity: 1; /* 끝 또는 시작 시 완전 불투명 */
}
</style>