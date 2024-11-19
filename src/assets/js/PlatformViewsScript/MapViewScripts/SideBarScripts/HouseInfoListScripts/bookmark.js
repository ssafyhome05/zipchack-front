import axios from "axios";
import { SERVER_URL } from "@/assets/resources/configs/config";
import { useHouseListStore } from "@/stores/houseListStore";
import { useUserInfoStore } from "@/stores/userInfoStore";
import { useHouseDetailStore } from "@/stores/houseDetailStore";
import { showWarningToast, showSuccessToast, showErrorToast, showInfoToast } from '@/assets/js/PlatformViewsScript/CommonScripts/showToast';
import { reissueAccessToken } from "@/assets/js/PlatformViewsScript/CommonScripts/reissueAccessToken";



const addHouseBookmark = async (aptSeq, access_token, times) => {
    const houseListStore = useHouseListStore();
    const userInfoStore = useUserInfoStore();
    const houseDetailStore = useHouseDetailStore();

    if (times === 0 || !access_token) {
        throw new Error("북마크 추가 실패");
    }

    try {
        axios.post(
        `${SERVER_URL}/api/bookmark/house`, null,
            {   
                params: {
                    "houseId": aptSeq,
                },
                headers: {
                    "Authorization": `${access_token}`,
                }
            }, 
        ).then(async (res) => {
            console.log(res.data);
            if (res.data.code === 401012) {
                await reissueAccessToken();
                console.log("재시도");
                await addHouseBookmark(aptSeq, userInfoStore.access_token, times - 1); // 재시도
            }

            if(res.status === 200){
                showInfoToast("북마크에 추가되었습니다.");

                houseListStore.setHouseList(
                    houseListStore.dongCode, 
                    houseListStore.keyWord, 
                    userInfoStore.user.data.userSeq
                );

                // detail에도 업데이트
                const house = houseListStore.houseList.find(h => h.aptSeq === aptSeq);

                if (house) {
                    house.bookmark = true;
                    houseDetailStore.setHouseDetail(house);
                }
            }
        }).catch((error) => {
            console.error("Bookmark failed:", error);
            showErrorToast("오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
        });

        
    } catch (err) {
        if (err.response && err.response.status === 401012) {
            await reissueAccessToken();
            return addHouseBookmark(aptSeq, userInfoStore.access_token, times - 1);
        }
        throw err;
    }
};

const removeHouseBookmark = async (aptSeq, access_token, times) => {
    if (times === 0 || !access_token) {
        showErrorToast("북마크 삭제에 실패했습니다.");
        throw new Error("북마크 삭제 실패");
    }

    try {
        // Pinia 스토어
        const houseListStore = useHouseListStore();
        const userInfoStore = useUserInfoStore();
        const houseDetailStore = useHouseDetailStore();

        const response = await axios.delete(`${SERVER_URL}/api/bookmark/house/${aptSeq}`,
            {
                headers: {
                    Authorization: `${access_token}`,
                },
                withCredentials: true,
            }
        );

        // 200 응답 처리
        if (response.status === 200) {
            showInfoToast("북마크가 삭제되었습니다.");
            await houseListStore.setHouseList(
                houseListStore.dongCode,
                houseListStore.keyWord,
                userInfoStore.user.data.userSeq
            );

            // detail에도 업데이트
            const house = houseListStore.houseList.find(h => h.aptSeq === aptSeq);
            console.log(house)
            if (house) {
                house.bookmark = false;
                houseDetailStore.setHouseDetail(house);
            }
            
            return;
        }

        // 서버에서 반환한 특정 에러 코드 처리
        if (response.data?.code === 401012) {
            console.log("토큰 만료로 재발급 시도");
            await reissueAccessToken();
            const newAccessToken = userInfoStore.access_token;
            return deleteHouseBookmark(aptSeq, newAccessToken, times - 1); // 재시도
        }
    } catch (error) {
        // 401012 오류 처리
        if (error.response?.data?.code === 401012) {
            console.log("토큰 재발급 후 재시도");
            await reissueAccessToken();
            const newAccessToken = userInfoStore.access_token;
            return deleteHouseBookmark(aptSeq, newAccessToken, times - 1); // 재시도
        }

        console.error("Bookmark deletion failed:", error);
        showErrorToast("오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
        throw error;
    }
};

export {
    addHouseBookmark,
    removeHouseBookmark
}