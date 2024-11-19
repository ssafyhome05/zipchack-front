import axios from "axios";
import { useUserInfoStore } from "@/stores/userInfoStore"
import { useHouseDetailStore } from "@/stores/houseDetailStore";
import { useSpotRouteStore } from "@/stores/SpotRouteStore";
import { useKakaoMapStore } from "@/stores/kakaoMapStore";
import { ref, onMounted, watch, nextTick } from "vue";
import { SERVER_URL } from "@/assets/resources/configs/config";
import { reissueAccessToken } from "@/assets/js/PlatformViewsScript/CommonScripts/reissueAccessToken";
import { Modal } from 'bootstrap';
import start_marker from '@/assets/imgs/mark/test-mark.png';
import end_marker from '@/assets/imgs/mark/red-mark.png';

export default {
    name: 'HouseRoute',
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
        const isClicked = ref(false);


        onMounted(() => {
            kakaoMap.value = kakaoMapStore.mapInstance;
            if(userInfoStore.user){
                isLogin.value = true;
                houseDetail.value = houseDetailStore.getHouseDetail
                const userSeq = userInfoStore.user.data.userSeq;
                const access_token = userInfoStore.access_token;
    
            }else{
                isLogin.value = false;
            }
        });

        watch(() => houseDetailStore.houseDetail, (newVal) => {
            spotRouteStore.routeList = [];
            routeList.value = spotRouteStore.routeList;
            clearMapObjects();
            if(userInfoStore.user){
                isLogin.value = true;
                houseDetail.value = newVal;
                const userSeq = userInfoStore.user.data.userSeq;
                const access_token = userInfoStore.access_token;
            }else{
                isLogin.value = false;
                // userHouse.value = null;
            }
        }, { deep: true });

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