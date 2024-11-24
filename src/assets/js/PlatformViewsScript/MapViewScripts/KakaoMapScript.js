/*global kakao*/
import { KAKAO_API_KEY } from '@/assets/resources/configs/config';
import { useHouseListStore } from '@/stores/houseListStore';
import { useKakaoMapStore } from "@/stores/kakaoMapStore";
import { ref, onMounted, watch, toRaw, watchEffect, nextTick } from 'vue';
import axios from 'axios';
import { SERVER_URL } from '@/assets/resources/configs/config';
import defaultMarkerImage from '@/assets/imgs/mark/house-mark.png';
import bookmarkMarkerImage from '@/assets/imgs/mark/bookmark-mark.png';

export default{
    setup(){
        const houseListStore = useHouseListStore();
        const kakaoMapStore = useKakaoMapStore();
        const kakaoMap = ref(null);
        const markers = ref([]);
        const polygon = ref(null);
        const houseInfoList = ref([]);
        const routes = ref(null);

        onMounted( async () => {
            if (window.kakao && window.kakao.maps) {
                loadMap();
            } 
            else {
                loadScript();
            }
        });

        watch(() => houseListStore.houseList, (newVal) => {
            houseInfoList.value = loadHouseInfo(newVal);
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
                center: new window.kakao.maps.LatLng(37.5012767241426, 127.039600248343), 
                level: 3
            };
            kakaoMap.value = new window.kakao.maps.Map(container, options);
            kakaoMapStore.setMapInstance(kakaoMap.value);
            // loadMaker();
        };

        // 지정한 위치에 마커 불러오기
        const loadMaker = () => {
            const markerPosition = new window.kakao.maps.LatLng(
                37.5012767241426,
                127.039600248343
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
                
                // const marker = new window.kakao.maps.Marker({
                //     map: kakaoMap.value,
                //     position: position,
                // });
                const markerImg = houseList[i].bookmark === true ? bookmarkMarkerImage : defaultMarkerImage;
                const markerImgSize = new window.kakao.maps.Size(28, 37);
                const marker = createCustomMarker(markerImgSize, markerImg, houseList[i].latitude, houseList[i].longitude);

        
                const infowindow = new window.kakao.maps.InfoWindow({
                    content: houseList[i].aptNm,
                });
        
                // 이벤트 리스너 등록 - 마커에 마우스를 올렸을 때 로드뷰 인포윈도우 표시
                window.kakao.maps.event.addListener(marker, 'mouseover', 
                    makeInfoWindowWithRoadview(toRaw(kakaoMap.value), marker, infowindow, houseList[i].latitude, houseList[i].longitude));
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
                
                if (response.data.data && Array.isArray(response.data.data)) {
                    const coordinates = response.data.data.map((location) => {
                        return {
                            lat: location.lat,
                            lng: location.lng
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
            // addRoadview();
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

        // loadview test
        // 로드뷰 설정
        const addRoadviewToInfowindow = (latitude, longitude, infowindow) => {
            const roadviewContainer = document.createElement("div");
            roadviewContainer.style.width = "300px";
            roadviewContainer.style.height = "200px";
            
            const roadview = new window.kakao.maps.Roadview(roadviewContainer);
            const roadviewClient = new window.kakao.maps.RoadviewClient();

            // 로드뷰 위치 설정
            const position = new window.kakao.maps.LatLng(latitude, longitude);
            roadviewClient.getNearestPanoId(position, 50, (panoId) => {
                if (panoId) {
                    roadview.setPanoId(panoId, position);
                    infowindow.setContent(roadviewContainer);
                } else {
                    infowindow.setContent("<div>로드뷰가 없습니다.</div>");
                }
            });
        };

        /// 마커 infowindow 표시
        const makeInfoWindowWithRoadview = (map, marker, infowindow, latitude, longitude) => {
            return () => {
                addRoadviewToInfowindow(latitude, longitude, infowindow);
                infowindow.open(map, marker);
            };
        };

        const createCustomMarker = (size, image, lat, lng) => {
            const markerImage = new window.kakao.maps.MarkerImage(image, size);
            const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        
            // 마커 생성
            const marker = new window.kakao.maps.Marker({
                map: kakaoMap.value,
                position: markerPosition,
                image: markerImage,
            });
        
            // 생성된 마커를 배열에 추가
            markers.value.push(marker);
        
            return marker;
        };

        return {
            houseListStore,
            houseInfoList,
            kakaoMap,
        }
    }
}