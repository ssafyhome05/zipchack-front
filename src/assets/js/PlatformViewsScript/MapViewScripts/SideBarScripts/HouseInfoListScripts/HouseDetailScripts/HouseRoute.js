import axios from "axios";
import { useUserInfoStore } from "@/stores/userInfoStore"
import { useHouseDetailStore } from "@/stores/houseDetailStore";
import { useSpotRouteStore } from "@/stores/SpotRouteStore";
import { useKakaoMapStore } from "@/stores/kakaoMapStore";
import { ref, onMounted, watch, nextTick, onUnmounted } from "vue";
import { SERVER_URL } from "@/assets/resources/configs/config";
import { reissueAccessToken } from "@/assets/js/PlatformViewsScript/CommonScripts/reissueAccessToken";
import { Modal } from 'bootstrap';
import start_marker from '@/assets/imgs/mark/start-mark.png';
import end_marker from '@/assets/imgs/mark/end-mark.png';
import { VueSpinner } from 'vue3-spinners';

export default {
    name: 'HouseRoute',
    components: {
        VueSpinner
    },
    setup() {
        const serverUrl = SERVER_URL;
        const userInfoStore = useUserInfoStore();
        const houseDetailStore = useHouseDetailStore();
        const spotRouteStore = useSpotRouteStore();
        const isLogin = ref(false);
        const houseDetail = ref(null);
        const spotSearchDto = ref(null);
        const isLoading = ref(false);
        const houseInfo = ref({});
        const routeList = ref(spotRouteStore.routeList);
        const kakaoMapStore = useKakaoMapStore();
        const kakaoMap = ref(null);
        const polylines = ref([]);
        const markers = ref([]);
        const showRoute = ref(false);
        const isClicked = ref(false);


        onMounted(() => {
            kakaoMap.value = kakaoMapStore.mapInstance;
            if(userInfoStore.user){
                isLogin.value = true;
                houseDetail.value = houseDetailStore.getHouseDetail;
                getNearstSpost(houseDetail.value.aptSeq, userInfoStore.access_token);
            }else{
                isLogin.value = false;
            }
        });

        watch(() => houseDetailStore.houseDetail, (newVal) => {
            spotRouteStore.routeList = [];
            routeList.value = spotRouteStore.routeList;
            
            clearMapObjects();
            if(userInfoStore.user){
                getNearstSpost(newVal.aptSeq, userInfoStore.access_token);
                isLogin.value = true;
                houseDetail.value = newVal;
            }else{
                isLogin.value = false;
                // userHouse.value = null;
            }
        }, { deep: true });

        const getNearstSpost = async (houseSeq, access_token) => {
            isLoading.value = true;
        
            try {
                const response = await axios.get(`${SERVER_URL}/api/navigate/spot`, {
                    headers: {
                        'Authorization': access_token,
                    },
                    params: {
                        "houseSeq": houseSeq,
                    },
                });
        
                if (response.status === 200) {
                    console.log(response.data.code);
                    console.log(response.data.data);
                    const data = response.data.data;
                    data.forEach((route) => {
                        const newRoute = { ...route.routes };
                        newRoute.customName = route.requestParameter.endPointName;
                        spotRouteStore.addRoute(newRoute);
                    });
                }
            } catch (error) {
                if (error.response && error.response.data?.code === 401012) {
                    console.log("토큰 만료로 재발급 시도");
                    await reissueAccessToken();
                    await getNearstSpost(houseSeq, userInfoStore.access_token);  // 재시도
                } else {
                    console.error("에러 발생:", error);
                    showWarningToast("요청에 실패했습니다.");
                }
            } finally {
                isLoading.value = false;
            }
        };        

        const openSearchModal = () => {
            nextTick(() => {
                const modalElement = document.getElementById('search-modal');
                if (modalElement) {
                    initInput();
                    const modalInstance = new Modal(modalElement);
                    modalInstance.show();
                } 
            });
        };

        const initInput = () => {
            document.getElementById('place').value = "";
            document.getElementById('roadAddress').value = "";
            document.getElementById('jibunAddress').value = "";
        }

        const createCustomMarker = (size, image, lat, lng) => {
            const markerImage = new window.kakao.maps.MarkerImage(image, size);
            const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        
            const marker = new window.kakao.maps.Marker({
                map: kakaoMap.value,
                position: markerPosition,
                image: markerImage,
            });
        
            markers.value.push(marker);
            
            return marker;
        };
        
        const drawPolyline = (type, routeInfos) => {
            if(showRoute.value){
                // polylines.value = [];
                clearMapObjects();
                showRoute.value = false;
                return drawPolyline(type, routeInfos);
            }

            showRoute.value = true;
            isClicked.value = false;
            clearMapObjects();
        
            const points = [];
        
            routeInfos.forEach((route) => {
                if (route.type === "Point") {
                    const point = new window.kakao.maps.LatLng(
                        route.coordinates[1],
                        route.coordinates[0]
                    );
                    points.push(point);
                }
            });
        
            const path = routeInfos
                .filter((info) => info.type === "LineString")
                .flatMap((info) =>
                    info.coordinates.map(
                        (coord) => new window.kakao.maps.LatLng(coord[1], coord[0])
                    )
                );
        
            const imgSizeStart = new window.kakao.maps.Size(28, 35);
            createCustomMarker(imgSizeStart, start_marker, points[0].Ma, points[0].La);
        
            const imgSizeEnd = new window.kakao.maps.Size(28, 37);
            createCustomMarker(imgSizeEnd, end_marker, points[points.length - 1].Ma, points[points.length - 1].La);
        
            const polyline = new window.kakao.maps.Polyline({
                map: kakaoMap.value,
                path,
                strokeWeight: 4,
                strokeColor: "#007bff",
                strokeOpacity: 1,
                strokeStyle: "solid",
            });
        
            polylines.value.push(polyline);
        };
        
        const clearMapObjects = () => {
            polylines.value.forEach((polyline) => polyline.setMap(null));
            polylines.value = [];
        
            markers.value.forEach((marker) => marker.setMap(null));
            markers.value = [];
        };

        const showTransportRoutesModal = () => {
            clearMapObjects();
            isClicked.value = !isClicked.value;
        }
        

        return {
            isLogin,
            isLoading,
            serverUrl,
            houseDetail,
            routeList,
            isClicked,

            openSearchModal,
            drawPolyline,
            showTransportRoutesModal
        }
    },
}