import axios from 'axios';
import { SERVER_URL } from '@/assets/resources/configs/config';
import { showWarningToast, showSuccessToast, showErrorToast, showInfoToast } from '@/assets/js/PlatformViewsScript/CommonScripts/showToast';
import { useHouseListStore } from '@/stores/houseListStore';
import { useHouseDetailStore } from '@/stores/houseDetailStore';
// const houseListStore = useHouseListStore();  
import { onMounted } from 'vue';

// export default {
//     setup() {
    const houseDetailStore = useHouseDetailStore();

        onMounted(() => {
            loadKakaoMapScript();
        });

        // 스크립트 로드 후 로드뷰 호출
        const loadKakaoMapScript = () => {
            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_API_KEY&autoload=false&libraries=services";
                
                document.head.appendChild(script);
            });
        };
        
//         return {};
//     }
// }

const HouseInfoListItem = (aptSeq, isBookmark) => {
    if(isBookmark === false) {
        showInfoToast("북마크에 추가되었습니다.");
    } else {
        showInfoToast("북마크에서 삭제되었습니다.");
    }
}

const clickHouse = (dongCode) => {
    console.log(dongCode);
}