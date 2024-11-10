import MainList from '@/components/MapViewComponents/SideBarComponents/MainList.vue';
import HouseInfoList from '@/components/MapViewComponents/SideBarComponents/HouseInfoList.vue';
import BookmarkList from '@/components/MapViewComponents/SideBarComponents/BookmarkList.vue';
import {ref, onMounted, shallowRef } from 'vue';
import zLogo from '@/assets/resources/images/z.png';
import zipchak from '@/assets/resources/images/zipchak.png';
import activeZipchak from '@/assets/resources/images/activeZipchak.png';

export default {
    components: {
        MainList,
        HouseInfoList,
        BookmarkList
    },

    setup() {
        const selectedTab = shallowRef('main');
        const selectedComponent = shallowRef(MainList);

        onMounted(() => {
            showDefaultList();
        });

        const showDefaultList = () => {
            selectedTab.value = "main";
            selectedComponent.value = MainList;
        };

        const changeTab = (tabName) => {
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
            }
        };      

        return { 
            // images
            zLogo,
            zipchak,
            activeZipchak,

            // tab components
            selectedComponent, 
            selectedTab,

            // methods
            changeTab 
        };
    }
}