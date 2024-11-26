import {defineStore} from 'pinia';
import { SERVER_URL } from '@/assets/resources/configs/config';
import { ref } from 'vue';
import axios from 'axios';
import { useUserInfoStore } from './userInfoStore';

export const useAiStore = defineStore('aiStore', {
    state: () => ({
        nativePrompt: ref(''),
        promptVariables: ref([]),
        response: ref('')

    }),

    getters: {
        getNativePrompt() {
            return this.nativePrompt;
        },
        getPromptVariables() {
            return this.promptVariables;
        },    },
    actions: {
        async setAiResponse(promptResourceDto) {
            const userInfoStore = useUserInfoStore();
            const accessToken = userInfoStore.getAccessToken;

            console.log("싱행은 됨");
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
                                        "입니다. \n\n가장 큰 이유 : "+ response.data.data.reason +
                                        "\n\n 상세설명 : " + response.data.data.description;
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