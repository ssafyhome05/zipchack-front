import {defineStore} from 'pinia';
import { SERVER_URL } from '@/assets/resources/configs/config';
import { ref } from 'vue';
import axios from 'axios';


export const useHouseListStore = defineStore('houseInfoList', {
    state: () => ({
        houseList: ref([]),
        dongCode: ref(''),
        sidoName: ref(''),
        gugunName: ref(''),
        dongName: ref(''),
    }),

    getters: {
        getHouseList() {
            return this.houseList;
        },
        getDongCode() {
            return this.dongCode;
        },
        getSidoName() {
            return this.sidoName;
        },
        getGugunName() {
            return this.gugunName;
        },
        getDongName() {
            return this.dongName;
        },
    },
    actions: {
        async setHouseList(dong, keyword) {
            try {
                const response = await axios.get(`${SERVER_URL}/api/house`, {
                    params: {
                        dongCode: dong,
                        keyWord: keyword,
                    }
                });

                this.houseList = response.data;
                this.dongCode = dong;
            } catch (error) {
                console.error("데이터 가져오기에 실패했습니다:", error);
            }
        },

        setSidoName(name) {
            this.sidoName = name;
        },
        setGugunName(name) {
            this.gugunName = name;
        },
        setDongName(name) {
            this.dongName = name;
        },
    },
});