import { KAKAO_API_KEY } from '@/assets/resources/configs/config';
import { useHouseListStore } from '@/stores/houseListStore';
import { ref, onMounted, watch, toRaw, watchEffect, nextTick } from 'vue';
import axios from 'axios';
import { SERVER_URL } from '@/assets/resources/configs/config';

import sampleRouteData from './sample_route.json';
import start_marker from '@/assets/imgs/mark/test-mark.png';
import end_marker from '@/assets/imgs/mark/red-mark.png';

export default{
    setup(){
        const houseListStore = useHouseListStore();
        const kakaoMap = ref(null);
        const markers = ref([]);
        const polygon = ref(null);
        const houseInfoList = ref([]);
        const routes = ref(null);
        // const start_marker = "@/src/assets/imgs/mark/start-mark.png";

        onMounted( async () => {
            await created();
            // kakao api 스크립트 소스 불러오기 및 지도 출력
            if (window.kakao && window.kakao.maps) {
                loadMap();
                nextTick(() => {
                    drawRoutes();
                });
            } else {
                loadScript();
            }
    
        });

        watch(() => houseListStore.houseList, (newVal) => {
            houseInfoList.value = loadHouseInfo(newVal);
        }, { deep: true });

        const  created = async () => {
            try {
              const response = await fetch("/src/assets/js/PlatformViewsScript/MapViewScripts/sample_route.json");
              const data = await response.json();
              routes.value = data[0].routes;
            } catch (error) {
              console.error("JSON 파일 로드 오류:", error);
            }
        };

        const createCustomMarker = (size, iamge, lat, lng) => {
                const markerImage = new window.kakao.maps.MarkerImage(iamge, size);
                var markerPosition  = new window.kakao.maps.LatLng(lat, lng); 
                var marker = new window.kakao.maps.Marker({
                    map: kakaoMap.value,
                    position: markerPosition,
                    image: markerImage,
                });
            
            return marker;  
        };

        const drawRoutes = () => {
            ["car", "transport", "walk"].forEach((mode) => {

              if (routes.value[mode]) {
                    routes.value[mode].forEach((route) => {
                    // console.log("이동수단: ", mode);
                    // console.log("시간: ", route.totalTime);
                    // console.log("거리: ", route.totalDistance);
                    const points = route.routeInfos
                        .filter((info) => info.type === "Point")
                        .map((info) => {
                            return new window.kakao.maps.LatLng(info.coordinates[1], info.coordinates[0]);
                        });

                    // 시작
                    const imgSize = new window.kakao.maps.Size(28, 35);
                    createCustomMarker(imgSize, start_marker, points[0].Ma, points[0].La);
                    // 종료
                    const imgSize2 = new window.kakao.maps.Size(28, 35);
                    createCustomMarker(imgSize2, end_marker, points[points.length - 1].Ma, points[points.length - 1].La);

                    const path = route.routeInfos
                            .filter((info) => info.type === "LineString")
                            .flatMap((info) =>
                            info.coordinates.map(
                                (coord) => new window.kakao.maps.LatLng(coord[1], coord[0])
                            )
                        );
                    
                    const polyline = new window.kakao.maps.Polyline({
                        map: kakaoMap.value,
                        path,
                        strokeWeight: 4,
                        strokeColor: "#007bff",
                        strokeOpacity: 1,
                        strokeStyle: "solid",
                    });
                });
              }
            });
          };
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
                
                if (response.data && Array.isArray(response.data)) {
                    const coordinates = response.data.map((location) => {
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

        const addRoadview = (latitude, longitude) => {
            const roadviewContainer = document.getElementById("load-view-container");
            const roadview = new window.kakao.maps.Roadview(roadviewContainer);
            const roadviewClient = new window.kakao.maps.RoadviewClient();

            // 로드뷰 위치 설정
            const position = new window.kakao.maps.LatLng(latitude, longitude);
            roadviewClient.getNearestPanoId(position, 200, (panoId) => {
                if (panoId) {
                    roadview.setPanoId(panoId, position);
                }
            });
        };

        return {
            houseListStore,
            houseInfoList,
            kakaoMap,
        }
    }
}