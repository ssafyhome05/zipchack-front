import { defineStore } from 'pinia';
import axios from 'axios';
import { SERVER_URL } from '@/assets/resources/configs/config';
import { useUserInfoStore } from '@/stores/userInfoStore';

export const useUserManageStore = defineStore('userManage', {
    state: () => ({
        userData: [],
        total: 1
    }),

    getters: {
        getUserData() {
            return this.userData;
        },
        getTotal() {
            return this.total;
        }
    },

    actions: {
        async axiosGetUserData(page, size) {
            const userInfoStore = useUserInfoStore();
            try {
                const response = await axios.get(`${SERVER_URL}/api/user/list/${page}?size=${size}`, {
                    headers: {
                        Authorization: userInfoStore.getAccessToken
                    }
                });
                this.userData = response.data.data.content;
                this.total = response.data.data.total;
            } catch (error) {
                if (error.response.data.code == 401012) {
                    await userInfoStore.reissueAccessToken();
                    this.axiosGetUserData(page, size);
                }
            }
        }
    },

    persist: true,
}); 