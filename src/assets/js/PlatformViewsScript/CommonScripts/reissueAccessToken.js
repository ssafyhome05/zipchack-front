import axios from "axios";
import { SERVER_URL } from "@/assets/resources/configs/config";
import { useUserInfoStore } from "@/stores/userInfoStore";

const reissueAccessToken = async () => {
    const userInfoStore = useUserInfoStore();
    
    try {
        axios.defaults.withCredentials = true;

        const response = await axios.post(`${SERVER_URL}/api/auth/reissue`);
        
        userInfoStore.access_token = response.headers.authorization;

        console.log("re", userInfoStore.access_token);
    } catch (error) {
        console.error("토큰 재발급 실패:", error);
        throw error;
    }
};

export { reissueAccessToken };
