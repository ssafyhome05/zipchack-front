import {defineStore} from 'pinia';
import { SERVER_URL } from '@/assets/resources/configs/config';
import { ref } from 'vue';
import axios from 'axios';

export const useNewsListStore = defineStore('newsList', {
    state: () => ({
        newsList: [123],
        
    }),

    getters: {
        getNewsList() {
            return this.newsList;
        }
    },
    actions: {
        async setNewsList() {
            await axios.get(`${SERVER_URL}/api/house/news`)
                .then(response => {
                    if(response.data.code === 200050){
                        this.newsList = response.data.data.news;
                    }
                })
                .catch((error)=> console.error("데이터 가져오기에 실패했습니다:", error)); 
    },
    //새로고침 시 데이터 유지
    persist: true
    }
});