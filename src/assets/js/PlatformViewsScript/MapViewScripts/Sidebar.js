import MainList from '@/components/MapViewComponents/SideBarComponents/MainList.vue';
import HouseInfoList from '@/components/MapViewComponents/SideBarComponents/HouseInfoList.vue';
import BookmarkList from '@/components/MapViewComponents/SideBarComponents/BookmarkList.vue';
import DashboardList from '@/components/MapViewComponents/SideBarComponents/DashboardList.vue';

import {ref, onMounted, shallowRef } from 'vue';
import zLogo from '@/assets/resources/images/z.png';
import zipchak from '@/assets/resources/images/zipchak.png';
import activeZipchak from '@/assets/resources/images/activeZipchak.png';
import dashboard from '@/assets/resources/images/dashboard.png';
import activeDashboard from '@/assets/resources/images/activeDashboard.png';
import { useHouseDetailStore } from '@/stores/houseDetailStore';


export default {
    components: {
        MainList,
        HouseInfoList,
        BookmarkList,
        DashboardList
    },

    setup() {
        const selectedTab = shallowRef('main');
        const selectedComponent = shallowRef(MainList);
        const houseDetailStore = useHouseDetailStore();

        onMounted(() => {
            showDefaultList();
        });

        const showDefaultList = () => {
            selectedTab.value = "main";
            selectedComponent.value = MainList;
        };

        const changeTab = (tabName) => {
            houseDetailStore.showDetailModal = false;
            houseDetailStore.showDoughnutGraph = false;
            selectedTab.value = tabName;
            switch(tabName) {
                case "main": 
                    selectedComponent.value = MainList; 
                    break;
                case "house": 
                    selectedComponent.value = HouseInfoList; 
                    break;
                case "bookmark": 
                    selectedComponent.value = BookmarkList; 
                    break;
                case "dashboard": 
                    selectedComponent.value = DashboardList; 
                    break;
            }
            
        };      

        return { 
            // images
            zLogo,
            zipchak,
            activeZipchak,
            dashboard,
            activeDashboard,

            // tab components
            selectedComponent, 
            selectedTab,

            // methods
            changeTab 
        };
    }
}