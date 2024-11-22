import { defineStore } from 'pinia';
import axios from 'axios';
import { SERVER_URL } from '@/assets/resources/configs/config';

export const useNoticeManageStore = defineStore('noticeManage', {
    state: () => ({
        noticeData: [],
        total: 1
    }),

    getters: {
        getNoticeData() {
            return this.noticeData;
        },
        getTotal() {
            return this.total;
        }
    },

    actions: {
        async axiosGetNoticeData(page, size) {
            try {
                const response = await axios.get(`${SERVER_URL}/api/notice/${page}?size=${size}`);
                this.noticeData = response.data.data.content;
                this.total = response.data.data.total;
            } catch (error) {
                console.error('공지사항 데이터 조회 실패:', error);
                throw error;
            }
        }
    },

    persist: true,
}); 