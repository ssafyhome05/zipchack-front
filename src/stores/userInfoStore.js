import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserInfoStore = defineStore('userInfo', {
    state: () => ({
        user: null,
    }),

    getters: {
        getUser() {
            return this.user;
        },
    },

    actions: {
        setUser() {
            if (document.cookie) {
                const refreshToken = document.cookie
                  .split('; ')
                  .find(row => row.startsWith('refresh='))
                  ?.split('=')[1];
        
                this.user = this.parseJWT(refreshToken);
                // console.log(this.user);
            }
        },
        
        parseJWT(token) {
            const base64Url = token.split('.')[1]; // Payload 부분 추출
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64Url을 Base64로 변환
            const jsonPayload = decodeURIComponent(escape(window.atob(base64))); // Base64 디코드

            return JSON.parse(jsonPayload); // JSON 객체로 변환
        },  
    },
});

