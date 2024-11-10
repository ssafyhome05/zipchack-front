import { ref, onMounted, nextTick } from 'vue';
import { Modal } from 'bootstrap';
import { SERVER_URL } from '@/assets/resources/configs/config';
import axios from 'axios';
import logoImg from '@/assets/resources/images/activeZipchak.png';
export default {
    setup() {
        const logo = logoImg;
        const user = ref(null);

        onMounted(() => {
            getUser();
        });
        
        // 'refresh' 쿠키로 유저 로그인 여부 확인
        const getUser = () => {
            if (document.cookie) {
              const refreshToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('refresh='))
                ?.split('=')[1];
      
              user.value = parseJWT(refreshToken);
              
            }
        };

        // JWT 파싱
        const parseJWT = (token) => {
            const base64Url = token.split('.')[1]; // Payload 부분 추출
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64Url을 Base64로 변환
            const jsonPayload = decodeURIComponent(escape(window.atob(base64))); // Base64 디코드
        
            return JSON.parse(jsonPayload); // JSON 객체로 변환
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
            
            user.value = null;
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