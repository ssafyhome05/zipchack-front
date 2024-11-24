
<script setup>
    import {ref, onMounted} from 'vue';
    import { useLocationInfoStore } from '@/stores/LocationInfo';
    import { useUserInfoStore }from '@/stores/userInfoStore';

    import DashboardListItem from '@/components/MapviewComponents/SideBarComponents/DashboardListItems/DashboardListItem.vue';
    import PopulationSection from '@/components/MapviewComponents/SideBarComponents/DashboardListItems/DashboardListItemSections/PopulationSection.vue';
    import BusinessBuildingSection from '@/components/MapviewComponents/SideBarComponents/DashboardListItems/DashboardListItemSections/BusinessBuildingSection.vue';
    import ClosestSection from '@/components/MapviewComponents/SideBarComponents/DashboardListItems/DashboardListItemSections/ClosestSection.vue';
    import AnalysisSection from '@/components/MapviewComponents/SideBarComponents/DashboardListItems/DashboardListItemSections/AnalysisSection.vue';

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

    onMounted(() => {
        if(userInfoStore.user){
            locationInfoStore.getUserBookmarkLocation();
        }else{
            return;
        }
    });

    const loadUserLocation = () => {

    }

    const loadLocationData = () => {

    }

</script>

<template>
    
    <DashboardListItem v-for="board,idx in boardList" :board="board" :key="idx"/>

</template>
    
    
<style>
    
</style>