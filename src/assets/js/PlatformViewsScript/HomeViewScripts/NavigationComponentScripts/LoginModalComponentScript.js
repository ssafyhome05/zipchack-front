import { Modal } from 'bootstrap';
import { ref, nextTick } from 'vue';
import { SERVER_URL } from '@/assets/resources/configs/config';
import { showWarningToast, showSuccessToast, showErrorToast } from '@/assets/js/PlatformViewsScript/CommonScripts/showToast';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useUserInfoStore } from '@/stores/userInfoStore';
export default {
    setup() {
        const serverUrl = ref(SERVER_URL);
        const userInfoStore = useUserInfoStore();
        const isAuthorized = ref(true);

        function closeLoginModal() {
            const modalElement = document.getElementById('login-modal');
            const modalInstance = Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();
            }
        };  

        function openRegistModal() {
            closeLoginModal();
            nextTick(() => {
                const modalElement = document.querySelector('#regist-modal');
                if (modalElement) {
                    const modalInstance = new Modal(modalElement);
                    modalInstance.show();
                } 
            });
        };

        function openFindIdModal() {
            closeLoginModal();
            nextTick(() => {
                
            });
        }

        function openFindPwModal() {
            closeLoginModal();
            nextTick(() => {
                const modalElement = document.querySelector('#find-pw-modal');
                if (modalElement) {
                    const modalInstance = new Modal(modalElement);
                    modalInstance.show();
                }
            });
        }

        async function login() {
            const inputId = document.querySelector('.id').value;
            const inputPassword = document.querySelector('.pw').value;

            if (inputId === '' || inputPassword === '') {
                showWarningToast('아이디 또는 비밀번호를 입력해주세요.');
                isAuthorized.value = false;
                return;
            }

            try{
                const formData = new FormData();
                formData.append('username', inputId);
                formData.append('password', inputPassword);

                const response = await axios.post(`${SERVER_URL}/auth/login`, formData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    withCredentials: true,
                });
                
                if(response.status === 200){
                    showSuccessToast("로그인되었습니다.");
                    userInfoStore.setUser(response.headers.authorization);
                }else{
                    showWarningToast("아이디 또는 비밀번호를 확인해주세요.");
                }
    
                isAuthorized.value = true;

                closeLoginModal();
            } catch (error) {
                showWarningToast("아이디 또는 비밀번호를 확인해주세요.");
                isAuthorized.value = false;
            }
            
        }


        return {
            // data
            serverUrl,
            isAuthorized,

            // methods
            closeLoginModal,
            openRegistModal,
            openFindIdModal,
            openFindPwModal,

            login
        };
    }
};