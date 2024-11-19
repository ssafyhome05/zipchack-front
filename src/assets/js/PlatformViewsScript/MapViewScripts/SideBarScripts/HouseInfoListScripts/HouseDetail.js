import { KAKAO_API_KEY } from '@/assets/resources/configs/config.js';
import { useHouseDetailStore } from '@/stores/houseDetailStore.js';
import { useSpotRouteStore } from "@/stores/SpotRouteStore";
import { ref, onMounted, watch, nextTick } from 'vue';

export default {
    setup() {
        const houseDetailStore = useHouseDetailStore();
        const spotRouteStore = useSpotRouteStore();
        const houseDetail = ref(null);
        const address = ref(null);

        onMounted(async () => {
            loadScript();  
            houseDetail.value = houseDetailStore.getHouseDetail;
            address.value = houseDetailStore.getAddress;
            nextTick(() => {
                addRoadview(houseDetail.value.latitude, houseDetail.value.longitude);
            });
        });

        watch(() => houseDetailStore.houseDetail, (newVal) => {
            houseDetail.value = newVal;
            address.value = houseDetailStore.getAddress;
           
            nextTick(() => {
                if (houseDetail.value && houseDetail.value.latitude && houseDetail.value.longitude) {
                    addRoadview(houseDetail.value.latitude, houseDetail.value.longitude);
                }
            });
        }, { deep: true});

        const loadScript = () => {
            const script = document.createElement("script");
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false&libraries=services`; 
            document.head.appendChild(script);
        };

        const addRoadview = (latitude, longitude) => {
            const roadviewContainer = document.getElementById("load-view-container");
            const roadview = new window.kakao.maps.Roadview(roadviewContainer);
            const roadviewClient = new window.kakao.maps.RoadviewClient();
            if(latitude && longitude) {
            // 로드뷰 위치 설정
                const position = new window.kakao.maps.LatLng(latitude, longitude);
                    roadviewClient.getNearestPanoId(position, 200, (panoId) => {
                        if (panoId) {
                            roadview.setPanoId(panoId, position);
                        }
                    });
                customOverlay(houseDetail.value.aptNm, address.value, latitude, longitude, roadview, roadviewClient);
            }else{
                addRoadviewToAddress(address.value, roadview, roadviewClient);
                customOverlay(houseDetail.value.aptNm, address.value, latitude, longitude, roadview, roadviewClient);
            }
        };

        const addRoadviewToAddress = (address, roadview, roadviewClient) => {
            var geocoder = new kakao.maps.services.Geocoder();

            geocoder.addressSearch(address, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    const latitude = result[0].y;
                    const longitude = result[0].x;
                    roadviewClient.getNearestPanoId(new kakao.maps.LatLng(latitude, longitude), 200, (panoId) => {
                        if (panoId) {
                            roadview.setPanoId(panoId, new kakao.maps.LatLng(latitude, longitude));
                        }
                    });
                }
            });
        };

        // 커스텀 오버레이
        const customOverlay = (aptNm, address, latitude, longitude, roadview, roadviewClient) => {

            var content = ' <div class="overlay_info">';
            content += '        <a><i class="bi bi-house-fill"></i><strong>' + aptNm + '</strong></a>';
            content += '    </div>';

            var position = new window.kakao.maps.LatLng(latitude, longitude);
            var overlay = new window.kakao.maps.CustomOverlay({
                position: position,
                content: content,
                xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
                yAnchor: 1.1 // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
            });

            window.kakao.maps.event.addListener(roadview, 'init', function() {

                // 커스텀 오버레이를 생성합니다
                var rvCustomOverlay = new window.kakao.maps.CustomOverlay({
                    position: position,
                    content: content,
                    xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
                    yAnchor: 0.5 // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
                });
            
                rvCustomOverlay.setMap(roadview);
            
                var projection = roadview.getProjection(); // viewpoint(화면좌표)값을 추출할 수 있는 projection 객체.
                
                // 커스텀오버레이의 position과 altitude값을 통해 viewpoint값(화면좌표)를 추출합니다.
                var viewpoint = projection.viewpointFromCoords(rvCustomOverlay.getPosition(), rvCustomOverlay.getAltitude());
            
                roadview.setViewpoint(viewpoint); //커스텀 오버레이를 로드뷰의 가운데에 오도록 로드뷰의 시점을 변화
            });
        }

        
        return {
            houseDetail,
            address,
        };
    },
};
