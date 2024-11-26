import {defineStore} from 'pinia';
import { SERVER_URL } from '@/assets/resources/configs/config';
import { ref } from 'vue';
import axios from 'axios';
import { useUserInfoStore } from './userInfoStore';

export const useAiStore = defineStore('aiStore', {
    state: () => ({
        nativePrompt: ref(''),
        promptVariables: ref([]),
        response: ref(''),
        
        //전망분석
        house : ref('후암')
    }),

    getters: {
        getNativePrompt() {
            return this.nativePrompt;
        },
        getPromptVariables() {
            return this.promptVariables;
        },    
        getHouse(){
            return house.value;
        }
    },
    actions: {
        setHouse(newHouse){
            this.house = newHouse;
        },
        async setAiDealResponse(promptResourceDto) {
            const userInfoStore = useUserInfoStore();
            const accessToken = userInfoStore.getAccessToken;

            console.log("시세추이 예측 : 실행");
            console.log(promptResourceDto)
            try {
                await axios.post(`${SERVER_URL}/api/ai/deal`, promptResourceDto, {
                    headers: {
                        'Authorization': accessToken
                    },
                }
                    )
                    .then(response => {
                        if(response.data.code === 200050){
                            console.log(response.data.data)
                            this.response = "집착이 분석한 집은 " + response.data.data.aptName +
                                        "입니다. 😋\n\n1. 매물 점수 (1~10) : "+ response.data.data.rate +
                                        "\n\n2. 거래분석 📈\n"+ response.data.data.deal +
                                        "\n\n3. 인프라분석 🏪\n"+ response.data.data.infra +
                                        "\n\n4. 인구분석 💁\n"+ response.data.data.population +
                                        "\n\n5. 지하철분포 🚅\n"+ response.data.data.metro +
                                        "\n\n6. 최종의견 ⭐ "+ response.data.data.description +
                                        "\n\n" + "더 궁금하신 사항이 있으시면 편하게 물어봐주세요! 😋"
                        }
                    }); 
            } catch (error) {
                console.error("데이터 가져오기에 실패했습니다:", error);
            }
        },




        async setAiResponse(promptResourceDto) {
            const userInfoStore = useUserInfoStore();
            const accessToken = userInfoStore.getAccessToken;

            console.log("실행은 됨");
            console.log(promptResourceDto)
            try {
                await axios.post(`${SERVER_URL}/api/ai/house`, promptResourceDto, {
                    headers: {
                        'Authorization': accessToken
                    },

                }
                    )
                    .then(response => {
                        if(response.data.code === 200050){
                            this.response = "집착이 추천하는 집은 " + response.data.data.aptName +
                                        "입니다. 🫡 \n\n1. 가장 큰 이유 : "+ response.data.data.reason +
                                        "\n\n 2. 상세 요인 ❓\n " + response.data.data.description +
                                        "\n\n" + "더 궁금하신 사항이 있으시면 편하게 물어봐주세요! 😋";
                            console.log("결과 도출")
                            console.log(this.response)
                        }
                    }); 
            } catch (error) {
                console.error("데이터 가져오기에 실패했습니다:", error);
            }
        },
    },
    // 새로고침 시 데이터 유지
    // persist: true,
});