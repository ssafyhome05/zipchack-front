import {defineStore} from 'pinia';
import { SERVER_URL } from '@/assets/resources/configs/config';
import { ref } from 'vue';
import axios from 'axios';

export const useHouseListStore = defineStore('houseInfoList', {
    state: () => ({
        houseList: ref([]),
        dongCode: ref(''),
        keyWord: ref(''),
        sidoName: ref(''),
        gugunName: ref(''),
        dongName: ref(''),
        dongPopInfo: ref([]),
        dongNearBy: ref([]),
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
        getDongPopInfo(){
            return this.dongPopInfo;
        }
    },
    actions: {
        async setHouseList(dong, keyword, userSeq) {
            const HouseSearchWithTimeDto = {
                dongCode: dong,
                keyword: keyword,
                userSeq: userSeq,
            }
            try {
                await axios.post(`${SERVER_URL}/api/house`, HouseSearchWithTimeDto)
                    .then(response => {
                        if(response.data.code === 200050){
                            this.houseList = response.data.data;
                            this.dongCode = dong;
                            this.keyWord = keyword;
                        }
                    }); 
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

        async setDongPopInfo(dong){
            await axios.get(`${SERVER_URL}/api/house/population`, {
                params: {
                    dongCode: dong,
                }
            }).then(response => {
                const data = response.data;
                if(data.code === 200050){
                    this.dongPopInfo = data.data;
                }
            })
        },

        async setNearBy(dong){
            try{
                // console.log(testData)
                // this.dongNearBy = testData;
                await axios.get(`${SERVER_URL}/api/spot`,
                    {
                        params: {
                            dongCode: dong,
                        }   
                    }
                ).then((res) => {
                    if(res.data.code === 200030){
                         this.dongNearBy = res.data.data;
                    }
                    console.log(res.data.data);
                });
            }catch(err){
                console.log(err);
            }
        },
    },
    // 새로고침 시 데이터 유지
    // persist: true,
});