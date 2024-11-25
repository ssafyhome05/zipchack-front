<template>
    <div v-if="dongNearBy !== null" class="toggle-box">
        <img 
      v-for="(button, index) in buttons" 
      :key="index" 
      :src="button.isActive ? button.activeImg : button.inactiveImg" 
      @click="toggleButton(index)"
    />
    </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
import { useHouseListStore } from '@/stores/houseListStore';
import { useKakaoMapStore } from '@/stores/kakaoMapStore';
import train_marker_image from '@/assets/imgs/mark/train-mark.png';
import cafe_marker_image from '@/assets/imgs/mark/cafe-mark.png';
import mart_marker_image from '@/assets/imgs/mark/mart-mark.png';
import hospital_marker_image from '@/assets/imgs/mark/hospital-mark.png';
import school_marker_image from '@/assets/imgs/mark/school-mark.png';
import { showInfoToast } from '@/assets/js/PlatformViewsScript/CommonScripts/showToast';

const houseListStore = useHouseListStore();
const kakaoMapStore = useKakaoMapStore();
const dongCode = ref(houseListStore.dongCode);
const dongNearBy = ref(houseListStore.dongNearBy);
const kakaoMap = ref(kakaoMapStore.mapInstance);
const stationMarkers = ref([]);
const cafeMarkers = ref([]);
const martMarkers = ref([]);
const schoolMarker = ref([]);
const hospitalMarker = ref([]);

const buttons = ref([
  {
    name: "역",
    isActive: false,
    activeImg: "src/assets/imgs/button/train-button-fill.png",
    inactiveImg: "src/assets/imgs/button/train-button-empty.png",
  },
  {
    name: "카페",
    isActive: false,
    activeImg: "src/assets/imgs/button/cafe-button-fill.png",
    inactiveImg: "src/assets/imgs/button/cafe-button-empty.png",
  },
  {
    name: "편의점",
    isActive: false,
    activeImg: "src/assets/imgs/button/mart-button-fill.png",
    inactiveImg: "src/assets/imgs/button/mart-button-empty.png",
  },
  {
    name: "학교",
    isActive: false,
    activeImg: "src/assets/imgs/button/school-button-fill.png",
    inactiveImg: "src/assets/imgs/button/school-button-empty.png",
  },
  {
    name: "병원",
    isActive: false,
    activeImg: "src/assets/imgs/button/hospital-button-fill.png",
    inactiveImg: "src/assets/imgs/button/hospital-button-empty.png",
  },
]);

onMounted(() => {
    kakaoMap.value = kakaoMapStore.mapInstance;
});

watch(() => houseListStore.dongNearBy, (newVal) => {
    dongNearBy.value = newVal;
});

watch(() => kakaoMapStore.mapInstance, (newMapInstance) => {
    kakaoMap.value = newMapInstance;
});

watch(() => houseListStore.dongCode, (newDongCode, oldDongCode) => {
    if (newDongCode !== oldDongCode) {
        resetState();
    }
});

const resetState = async () => {
    buttons.value.forEach((button) => {
        button.isActive = false;
    });
    await kakaoMapStore.resetMap();
    // await loadMap();
    // removeAllMarkers();
};

const toggleButton = (index) => {
    buttons.value[index].isActive = !buttons.value[index].isActive;
    const markerImgSize = new window.kakao.maps.Size(28, 37);

    const tag = buttons.value[index].name;
    
    if (buttons.value[index].isActive) {
        let locations;
        let markerImg;

        switch (tag) {
            case "역":
                locations = dongNearBy.value.역;
                markerImg = train_marker_image;
                break;
            case "카페":
                locations = dongNearBy.value.카페;
                markerImg = cafe_marker_image;
                break;
            case "편의점":
                locations = dongNearBy.value.편의점;
                markerImg = mart_marker_image;
                break;
            case "학교":
                locations = dongNearBy.value.학교;
                markerImg = school_marker_image;
                break;
            case "병원":
                locations = dongNearBy.value.병원;
                markerImg = hospital_marker_image;
                break;
            default:
                return;
        }

         // 정보가 없을 경우 처리
         if (locations.length === 0) {
            showInfoToast(`${tag} 정보가 없습니다.`);
            buttons.value[index].isActive = false;
            return;
        }

        if (locations) {
            locations.forEach((loc) => {
                createCustomMarker(markerImgSize, markerImg, loc.latitude, loc.longitude, tag);
            });
        }
    } else {
        removeMarkers(tag);
    }
};


const createCustomMarker = (size, image, lat, lng, tag) => {
    const markerImage = new window.kakao.maps.MarkerImage(image, size);
    const markerPosition = new window.kakao.maps.LatLng(lat, lng);

    const marker = new window.kakao.maps.Marker({
        map: kakaoMap.value,
        position: markerPosition,
        image: markerImage,
    });

    if (tag === "역") {
        stationMarkers.value.push(marker);
    } else if (tag === "카페") {
        cafeMarkers.value.push(marker);
    } else if (tag === "편의점") {
        martMarkers.value.push(marker);
    } else if (tag === "학교") {
        schoolMarker.value.push(marker);
    } else if (tag === "병원") {
        hospitalMarker.value.push(marker);
    }

    return marker;
};

const removeMarkers = (tag) => {
    let markersToRemove;

    switch (tag) {
        case "역":
            markersToRemove = stationMarkers.value;
            break;
        case "카페":
            markersToRemove = cafeMarkers.value;
            break;
        case "편의점":
            markersToRemove = martMarkers.value;
            break;
        case "학교":
            markersToRemove = schoolMarker.value;
            break;
        case "병원":
            markersToRemove = hospitalMarker.value;
            break;
        default:
            return;
    }

    if (markersToRemove) {
        markersToRemove.forEach((marker) => marker.setMap(null));
        markersToRemove.length = 0;
    }
};

const removeAllMarkers = () => {
    [stationMarkers, cafeMarkers, martMarkers, schoolMarker, hospitalMarker].forEach((markerGroup) => {
        markerGroup.value.forEach((marker) => marker.setMap(null));
        markerGroup.value.length = 0;
    });
};

const loadMap = async () => {
            const container = document.getElementById("map"); 
            const options = {
                center: new window.kakao.maps.LatLng(37.5012767241426, 127.039600248343), 
                level: 3
            };
            const map =  new window.kakao.maps.Map(container, options);
            // kakaoMap.value = new window.kakao.maps.Map(container, options);
            kakaoMapStore.setMapInstance(map);
            kakaoMap.value = kakaoMapStore.mapInstance;
            // loadMaker();
        };

</script>
<style scoped>
.toggle-box{
    height: fit-content;
    width: fit-content;
    position: absolute;
    top: 140%;
    right: 1%;
    z-index: 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

img {
  width: 110px;
  margin-bottom: 5px;
  cursor: pointer;
  transition: transform 0.2s;
}

img:hover {
  transform: scale(1.1);
}
</style>