// stores/kakaoMapStore.js
import { defineStore } from 'pinia';

export const useKakaoMapStore = defineStore('kakaoMap', {
    state: () => ({
        mapInstance: null,  // 카카오 맵 인스턴스를 저장할 변수
    }),
    actions: {
        setMapInstance(map) {
            this.mapInstance = map;  // 맵 인스턴스를 설정
        },
    },
});
