import { ref, onMounted, nextTick, watch } from 'vue';
import { Modal } from 'bootstrap';
import { SERVER_URL } from '@/assets/resources/configs/config';
import axios from 'axios';
import logoImg from '@/assets/resources/images/activeZipchak.png';
import { useUserInfoStore } from '@/stores/userInfoStore.js';
;
export default {
    setup() {
        const logo = logoImg;
        const user = ref(null);
        const userInfoStore = useUserInfoStore();

        onMounted(() => {
            getUser();
            console.log(user.value)
        });

        watch(
            () => userInfoStore.user,
            (newVal) => {
                if (newVal) {
                    user.value = newVal;
                } else {
                    console.log('사용자 정보 없음.');
                }
            }
        );

        // user store에 저장되어 있는 정보로
        // 유저 로그인 여부 확인
        function getUser() {
            // userInfoStore.setUser();
            if(userInfoStore.user){
                user.value = userInfoStore.getUser;
            }
        };

        function openLoginModal() {
            nextTick(() => {
                const modalElement = document.querySelector('#login-modal');
                if (modalElement) {
                    const modalInstance = new Modal(modalElement);
                    modalInstance.show();
                }
            });
        };

        async function logout() {
            await axios.post(`${SERVER_URL}/auth/logout`, null, {
              withCredentials: true,
            });
            
            userInfoStore.user = null;
            userInfoStore.access_token = null;
            window.location.href = '/';
        };

        const openNoticeModal = () => {
            nextTick(() => {
                const modalElement = document.querySelector('#notice-modal');
                if (modalElement) {
                    const modalInstance = new Modal(modalElement);
                    modalInstance.show();
                }
            });
        }

        return { 
            logo, 
            user,
            openLoginModal,
            openNoticeModal,
            logout,
        };
    }
}