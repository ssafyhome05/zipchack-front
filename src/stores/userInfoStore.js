import { defineStore } from 'pinia';
import { SERVER_URL } from '@/assets/resources/configs/config';
import axios from 'axios';

export const useUserInfoStore = defineStore('userInfo', {
    state: () => ({
        user: null,
        access_token: null, // access token을 userinfo에 저장
    }),

    getters: {
        getUser() {
            console.log(this.user) //이후에 /api/user/info 에서 받아올 유저 정보 변경 필요
            return this.user;
        },
    },

    actions: {
        // access token을 통해서 user 정보 받아오는 함수
        setUser(access_token) {
            if (access_token) {
                this.access_token = access_token;
            }
            const getUserInfo = async (times) => {
                //times는 토큰 재발급 시도 횟수
                if(times === 0 || !access_token) return;
                axios.get(`${SERVER_URL}/api/user/info`, {
                    headers: {
                        'Authorization': access_token
                    }
                }).then((res) => {
                    this.user = res.data
                }).catch(async (err) => {
                    // 이 부분이 중요한데 access token이 만료되면 reissue하는 로직
                    // 거의 모든 axios 요청에 대해서 들어가야 하는 부분인데 어떻게 처리하면 좋을까?
                    console.log(err)
                    if(err.response.status === 401012) {
                        console.log('토큰 재발급')
                        await reissueAccessToken();
                        getUserInfo(times - 1);
                    }
                })
            }
            getUserInfo(1);
        },
        // refresh token을 통해 access token 재발급 함수
        reissueAccessToken: async () => {
            axios.defaults.withCredentials = true;
            const response = await axios.post(`${SERVER_URL}/api/auth/reissue`)
            this.access_token = response.headers.authorization;
        }
    },
    // 새로고침 시 데이터 유지
    persist: true,
});

