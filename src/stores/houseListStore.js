import {defineStore} from 'pinia';
import { SERVER_URL } from '@/assets/resources/configs/config';
import axios from 'axios';


export const useHouseListStore = defineStore('houseInfoList', {
    state: () => ({
        houseList: [],
    }),

    getters: {
        getHouseList() {
            return this.houseList;
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
                
            } catch (error) {
                console.error("데이터 가져오기에 실패했습니다:", error);
            }
        },
    },
});