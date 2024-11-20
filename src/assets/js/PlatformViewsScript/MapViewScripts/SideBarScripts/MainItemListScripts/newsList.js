import { onMounted, ref, } from 'vue';
import { useNewsListStore } from '@/stores/newsListStore';
import { useKakaoMapStore } from '@/stores/kakaoMapStore';



export default {

    setup() {
        const newsListStore = useNewsListStore();
        const kakaoMapStore = useKakaoMapStore();
        
        // Store 초기화
        const newsList = ref([]);
        const marker = ref(null);
        const kakaoMap = ref(null);


        // Mounted 시점에 지도 및 초기 설정 로드
        onMounted(async() => {
           await newsListStore.setNewsList();
           
           newsList.value = newsListStore.getNewsList;
           console.log(newsList.value);
           kakaoMap.value = kakaoMapStore.mapInstance;
           console.log(kakaoMap.value);
        });

        const openLink = (url) => {
            window.open(url, '_blank');
          };

        //openLink(news.url)
        const moveMap = (name) =>{
            marker.value = null;

            var geocoder = new window.kakao.maps.services.Geocoder();

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(name, function(result, status) {

            // 정상적으로 검색이 완료됐으면 
            if (status === window.kakao.maps.services.Status.OK) {

            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시합니다
                marker.value = new window.kakao.maps.Marker({
                    map: kakaoMap.value,
                    position: coords
                });

                // // 인포윈도우로 장소에 대한 설명을 표시합니다
                // var infowindow = new window.kakao.maps.InfoWindow({
                //     content: '<div style="width:150px;text-align:center;padding:6px 0;">'+name+'</div>'
                // });
                // infowindow.open(kakaoMap, marker.value);

                

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                kakaoMap.value.setCenter(coords);
            } 
});    

        }
        

        return {
            newsList,
            openLink,
            moveMap
        }
    }

}
