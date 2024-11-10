import { KAKAO_API_KEY } from '@/assets/resources/configs/config';
import { useHouseListStore } from '@/stores/houseListStore';
import { ref, onMounted } from 'vue';

export default{
    setup(){
        const houseListStore = useHouseListStore();
        const kakaoMap = ref(null);
        const markers = ref([]);
        const houseInfoList = ref([]);

        onMounted(() => {
            // kakao api 스크립트 소스 불러오기 및 지도 출력
        if (window.kakao && window.kakao.maps) {
                loadMap();
            } else {
                loadScript();
            }
        })

        const loadScript = () => {
            const script = document.createElement("script");
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false&libraries=services`; 
            script.onload = () => window.kakao.maps.load(loadMap); 
            document.head.appendChild(script);
        };

        // 맵 출력하기
        const loadMap = () => {
            const container = document.getElementById("map"); 
            const options = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667), 
                level: 3
            };
            kakaoMap.value = new window.kakao.maps.Map(container, options); 
            loadMaker();
        };

        // 지정한 위치에 마커 불러오기
        const loadMaker = () => {
            const markerPosition = new window.kakao.maps.LatLng(
                33.450701,
                126.570667
            );
            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
            });
            markers.value.push(marker);
            markers.value[0].setMap(kakaoMap.value);
        };

        return {
            houseListStore,
            kakaoMap,
        }
    }
}