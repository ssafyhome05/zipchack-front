import { Modal } from 'bootstrap';
import { ref, onMounted } from 'vue';
import logoImg from '@/assets/resources/images/activeZipchak.png';

export default {
    setup() {
        const logo = logoImg;
        const user = ref(null);

        onMounted(() => {
            getUser();
        });
        
        const getUser = () => {
            // 'refresh' 쿠키로 유저 로그인 여부 확인
            if (document.cookie) {
              const refreshToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('refresh='))
                ?.split('=')[1];
      
              user.value = parseJWT(refreshToken);
            }
        };

        const parseJWT = (token) => {
            const base64Url = token.split('.')[1]; // Payload 부분 추출
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64Url을 Base64로 변환
            const jsonPayload = decodeURIComponent(escape(window.atob(base64))); // Base64 디코드
        
            return JSON.parse(jsonPayload); // JSON 객체로 변환
        };

        return { 
            logo, 
            user,
        };
    }
}