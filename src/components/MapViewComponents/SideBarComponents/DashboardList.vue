
<script setup>
    import {ref, onMounted} from 'vue';
    import { useLocationInfoStore } from '@/stores/LocationInfo';
    import { useUserInfoStore }from '@/stores/userInfoStore';

    import DashboardListItem from '@/components/MapViewComponents/SideBarComponents/DashboardListItems/DashboardListItem.vue';
    import PopulationSection from '@/components/MapViewComponents/SideBarComponents/DashboardListItems/DashboardListItemSections/PopulationSection.vue';
    import BusinessBuildingSection from '@/components/MapViewComponents/SideBarComponents/DashboardListItems/DashboardListItemSections/BusinessBuildingSection.vue';
    import ClosestSection from '@/components/MapViewComponents/SideBarComponents/DashboardListItems/DashboardListItemSections/ClosestSection.vue';
    import AnalysisSection from '@/components/MapViewComponents/SideBarComponents/DashboardListItems/DashboardListItemSections/AnalysisSection.vue';

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

    onMounted(() => {
        if(userInfoStore.user){
            isLoading.value = true;
            locationInfoStore.getUserBookmarkLocation();
            isLoading.value = false;
        }else{
            return;
        }
    });

</script>

<template>
    
    <DashboardListItem v-for="board,idx in boardList" :board="board" :key="idx"/>
    <div>
        
    </div>
</template>
    
    
<style>
    
</style>