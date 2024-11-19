<template>
    <div class="transport-modal">
      <div 
        class="transport-route"
        v-for="(option, index) in routeOptions"
        :key="index"
      >
        <button 
          :class="{ active: selectedOption === index }"
          @click="selectOption(index)"
        >
          {{ option }}
        </button>
  
        <span v-if="index !== routeOptions.length - 1" class="line"></span>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useKakaoMapStore } from "@/stores/kakaoMapStore";
import start_marker from '@/assets/imgs/mark/test-mark.png';
import end_marker from '@/assets/imgs/mark/red-mark.png';

const props = defineProps({
    route: {
        type: Array,
        required: true,
    },
    isClicked: {
        type: Boolean,
        required: true,
    }
});

const kakaoMapStore = useKakaoMapStore();
const kakaoMap = ref(kakaoMapStore.mapInstance);
const selectedOption = ref(null);
const polylines = ref([]);
const markers = ref([]);
const colors = ["#FFBB00", "#FFE400", "#1DDB16"];

const routeOptions = computed(() => 
    props.route.map((_, index) => String.fromCharCode(65 + index) + "안") // A, B, C ...
);

watch(() => props.isClicked, () => {
    clearMapObjects();
});


const selectOption = (index) => {
    selectedOption.value = index;
    const transportRoute = props.route[index].routeInfos;

    drawPolyline(transportRoute, index);
};

const drawPolyline = (transportRoute, index) => {

    clearMapObjects();

    const path = transportRoute.flatMap((routes) => 
        routes.coordinates.map((route) => 
            new window.kakao.maps.LatLng(route[1], route[0])
        )
    );

    const imgSizeStart = new window.kakao.maps.Size(28, 35);
    createCustomMarker(imgSizeStart, start_marker, path[0].Ma, path[0].La);

    const imgSizeEnd = new window.kakao.maps.Size(28, 37);
    createCustomMarker(imgSizeEnd, end_marker, path[path.length - 1].Ma, path[path.length - 1].La);

    const polyline = new window.kakao.maps.Polyline({
        map: kakaoMap.value,
        path,
        strokeWeight: 4,
        strokeColor: colors[index],
        strokeOpacity: 1,
        strokeStyle: "solid",
    });

    polylines.value.push(polyline);
};

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

const clearMapObjects = () => {
    polylines.value.forEach((polyline) => polyline.setMap(null));
    polylines.value = [];

    markers.value.forEach((marker) => marker.setMap(null));
    markers.value = [];
};

</script>
  

<style scoped>
@import '@/assets/css/PlatformViewsStyle/MapViewStyles/SideBarStyles/HouseInfoListItems/TransportModal.css';
</style>