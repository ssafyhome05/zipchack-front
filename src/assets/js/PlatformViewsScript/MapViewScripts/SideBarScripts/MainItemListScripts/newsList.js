import { onMounted, ref, } from 'vue';
import { useNewsListStore } from '@/stores/newsListStore';
import { useKakaoMapStore } from '@/stores/kakaoMapStore';


export default {

    setup() {
        const newsListStore = useNewsListStore();
        const kakaoMapStore = useKakaoMapStore();
        

        const newsList = ref([]);
        const marker = ref([]);
        const kakaoMap = ref(null);

        onMounted(async() => {
           await newsListStore.setNewsList();
           newsList.value = newsListStore.getNewsList;
           kakaoMap.value = kakaoMapStore.mapInstance;

        });

        const openLink = (url) => {
            window.open(url, '_blank');

        };

        const moveMap = (name) =>{
            clearMarkers();

            var geocoder = new window.kakao.maps.services.Geocoder();

            geocoder.addressSearch(name, function(result, status) {
                if (status === window.kakao.maps.services.Status.OK) {

                var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                    const mark = new window.kakao.maps.Marker({
                        map: kakaoMap.value,
                        position: coords
                    });
                    marker.value.push(mark);
                    kakaoMap.value.setCenter(coords);
                } 
            });    
        }
        
        const clearMarkers = () => {
            for (var i = 0; i < marker.value.length; i++) {
                marker.value[i].setMap(null);
            }
            marker.value = [];
        };

        return {
            newsList,
            openLink,
            moveMap
        }
    }

}
