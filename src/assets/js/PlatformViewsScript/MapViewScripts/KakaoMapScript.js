import { KAKAO_API_KEY } from '@/assets/resources/configs/config';
import { defineStore } from 'pinia';
import { useHouseListStore } from '@/stores/houseListStore';
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { SERVER_URL } from '@/assets/resources/configs/config';

export default{
    setup(){
        const houseListStore = useHouseListStore();
        const kakaoMap = ref(null);
        const markers = ref([]);
        const polygon = ref(null);
        const houseInfoList = ref([]);

        onMounted(() => {
            // kakao api 스크립트 소스 불러오기 및 지도 출력
            if (window.kakao && window.kakao.maps) {
                loadMap();
            } else {
                loadScript();
            }
        });
        
        watch(() => houseListStore.houseList, (newVal) => {
            houseInfoList.value = loadHouseInfo(newVal); // 새로운 houseList 값으로 갱신
            console.log(houseInfoList.value);
        }, { deep: true });


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

        // 매물 정보 불러오기 
        const loadHouseInfo = (houseList) => {
            clearMarkers();
            
            var geocoder = new window.kakao.maps.services.Geocoder();
            const sidoName = houseListStore.getSidoName;
            const gugunName = houseListStore.getGugunName;
            const dongName = houseListStore.getDongName;
            var addrCodeStr = sidoName + " " + gugunName + " " + dongName;
            geocoder.addressSearch(addrCodeStr, (result, status) => {
                if(status === window.kakao.maps.services.Status.OK){
                    var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                    kakaoMap.value.setCenter(coords);
                }
            });

            addNeighborhoodPolygon(houseListStore.getDongCode);
            // houseListStore에서 houseList를 가져와서 사용
            for (let i = 0; i < houseList.length; i++) {
                const position = new window.kakao.maps.LatLng(houseList[i].latitude, houseList[i].longitude);
                
                const marker = new window.kakao.maps.Marker({
                    map: kakaoMap.value,
                    position: position,
                });
        
                const infowindow = new window.kakao.maps.InfoWindow({
                    content: houseList[i].aptNm,
                });
        
                // 이벤트 리스너 등록
                window.kakao.maps.event.addListener(marker, 'mouseover', makeInfoWindow(kakaoMap.value, marker, infowindow));
                window.kakao.maps.event.addListener(marker, 'mouseout', removeInfoWindow(infowindow));
                
                // 마커 배열에 저장
                markers.value.push(marker);
            }

            return houseList;
        };
        
        const findNeighborhoodCoordinates = async (dong) => {
            try {
                const response = await axios.get(`${SERVER_URL}/api/house/polygon`, {
                    params: { dongCode: dong }
                });
                
                if (response.data && Array.isArray(response.data)) {
                    // Map the response to extract latitude and longitude
                    const coordinates = response.data.map((location) => {
                        return {
                            lat: location.lat, // Extract latitude
                            lng: location.lng  // Extract longitude
                        };
                    });
                    return coordinates; // Return array of coordinates
                } else {
                    console.error("Unexpected response structure:", response.data);
                    return [];
                }
            } catch (error) {
                console.error("Error fetching coordinates:", error.message);
                return [];
            }
        };

        const addNeighborhoodPolygon = async (dong) => {
            const coordinatesList = await findNeighborhoodCoordinates(dong);

            if (!Array.isArray(coordinatesList) || coordinatesList.length === 0) {
                console.log("Coordinates not found for the specified dong.");
                return;
            }

            const polygonPath = [];
            
            if (polygon.value) {
                polygon.value.setMap(null);
            }

            coordinatesList.forEach(({ lat, lng }) => {
                polygonPath.push(new window.kakao.maps.LatLng(lat, lng));
            });

            addPolygon(polygonPath);
        };

        const addPolygon = (polygonPath) => {
            polygon.value = new window.kakao.maps.Polygon({
                path: polygonPath,
                strokeWeight: 1, // 선의 두께입니다 
                strokeColor: '#75B8FA', // 선의 색깔입니다
                strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle: 'solid', // 선의 스타일 입니다
                fillColor: '#CFE7FF', // 채우기 색깔입니다
                fillOpacity: 0.5  // 채우기 불투명도 입니다  
            });

            polygon.value.setMap(kakaoMap.value);
        };

        // 이전 마커 초기화
        const clearMarkers = () => {
            for (var i = 0; i < markers.value.length; i++) {
                markers.value[i].setMap(null); // 지도에서 마커 제거
            }
            markers.value = []; // 마커 배열 초기화
        };

        // 마커 infowindow 표시
        const makeInfoWindow = (map, marker, infowindow) => {
            return () => {
                infowindow.open(map, marker);
            };
        };

        // 마커 infowindow 숨기기
        const removeInfoWindow = (infowindow) => {
            return () => {
                infowindow.close();
            };
        };

        return {
            houseListStore,
            houseInfoList,
            kakaoMap,
        }
    }
}