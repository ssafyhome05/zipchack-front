import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHouseDetailStore = defineStore('houseDetail', {
    state: () => ({
        houseDetail: ref(null),
        address: ref(null),
        showDetailModal: ref(false),
        showDoughnutGraph: ref(false),
    }),
    getters: {
        getHouseDetail() {
            return this.houseDetail;
        },
        getAddress() {
            return this.address;
        },
    },
    actions: {
        setHouseDetail(house) {
            this.houseDetail = house;
        },
        setAddress(address) {
            this.address = address;
        },
    },
});