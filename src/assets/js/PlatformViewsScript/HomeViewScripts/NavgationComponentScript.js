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
        });

        watch(() => userInfoStore.user, (newVal) => {
            user.value = newVal;
        });

        // user store에 저장되어 있는 정보로
        // 유저 로그인 여부 확인
        function getUser() {
            userInfoStore.setUser();
            user.value = userInfoStore.getUser;
        };

        // 로그인 모달 열기
        function openLoginModal() {
            // Wait for the DOM to load fully
            nextTick(() => {
                const modalElement = document.querySelector('#login-modal');
                if (modalElement) {
                    const modalInstance = new Modal(modalElement);
                    modalInstance.show();
                } else {
                    console.error('Modal element not found');
                }
            });
        };

        async function logout() {
            await axios.post(`${SERVER_URL}/auth/logout`, null, {
              withCredentials: true,
            });
            
            userInfoStore.user = null;
            window.location.href = '/';
        };

        return { 
            logo, 
            user,
            openLoginModal,
            logout
        };
    }
}