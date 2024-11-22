import axios from "axios";
import { SERVER_URL } from "@/assets/resources/configs/config.js";
import { useUserInfoStore } from "@/stores/userInfoStore";

// async function reissueAccessToken() {
//     const userInfoStore = useUserInfoStore();
//     const access_token = userInfoStore.getAccessToken;
//     try {
//         axios.defaults.withCredentials = true;
//         console.log("test", userInfoStore.getAccessToken)
//         const response = await axios.post(`${SERVER_URL}/api/auth/reissue`, null, 
//             {   
//                 headers: {
//                     "Authorization": `${userInfoStore.getAccessToken}`,
//                 },
//                 withCredentials: true
//             });
//         console.log("re", response.headers.authorization)
//         userInfoStore.access_token = response.headers.authorization;

//         console.log("re", userInfoStore.access_token);
//     } catch (error) {
//         console.error("토큰 재발급 실패:", error);
//         throw error;
//     }
// };

async function reissueAccessToken() {
    const userInfoStore = useUserInfoStore();
    const access_token = userInfoStore.getAccessToken;
    try {
        axios.defaults.withCredentials = true;
        console.log("test", userInfoStore.getAccessToken)
        const response = await axios.post(`${SERVER_URL}/api/auth/reissue`, null, 
            {   
                withCredentials: true
            });
        console.log("re", response.headers.authorization)
        userInfoStore.access_token = response.headers.authorization;

        console.log("re", userInfoStore.access_token);
    } catch (error) {
        console.error("토큰 재발급 실패:", error);
        throw error;
    }
};

export{
    reissueAccessToken,
    // test
}