// component
import AiPricePredict from '@/components/MapViewComponents/SideBarComponents/DashboardListItems/DashboardListItemSections/AnalysisSections/AiPricePredict.vue';
import AiRecommend from '@/components/MapViewComponents/SideBarComponents/DashboardListItems/DashboardListItemSections/AnalysisSections/AiRecommend.vue';


// icon

import aiPricePredictIcon from '@/assets/resources/images/aiPricePredict.png';
import aiPricePredictActiveIcon from '@/assets/resources/images/aiPricePredictActive.png';
import aiRecommendIcon from '@/assets/resources/images/aiRecommend.png';
import aiRecommendActiveIcon from '@/assets/resources/images/aiRecommendActive.png';

import {ref, onMounted, shallowRef } from 'vue';

export default {

    components: {
        AiPricePredict,
        AiRecommend
    },


    setup() {

        const selectedAiTab = shallowRef('aiPricePredict');
        const selectedAiComponent = shallowRef(AiPricePredict);

        onMounted(() => {
            showDefaultList();
        });

        const showDefaultList = () => {
            selectedAiTab.value = "aiPricePredict";
            selectedAiComponent.value = AiPricePredict;
        };

        const changeTab = (tabName) => {
            
            selectedAiTab.value = tabName;
            switch(tabName) {
                case "aiPricePredict": 
                    selectedAiComponent.value = AiPricePredict; 
                    break;
                case "aiRecommend": 
                    selectedAiComponent.value = AiRecommend; 
                    break;
            }
            
        };      

        return { 
            // images
            aiPricePredictIcon,
            aiPricePredictActiveIcon,
            aiRecommendIcon,
            aiRecommendActiveIcon,

            // tab components
            selectedAiComponent, 
            selectedAiTab,

            // methods
            changeTab 
        };
    }
}