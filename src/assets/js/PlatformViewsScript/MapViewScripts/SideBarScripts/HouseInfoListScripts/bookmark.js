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
        const res = await axios.post(
            `${SERVER_URL}/api/bookmark/house`,
            null,
            {
                params: { houseId: aptSeq },
                headers: { Authorization: `${access_token}` },
            }
        );

        if (res.data.code === 401012) {
            console.log("토큰 갱신이 필요합니다.");
            await reissueAccessToken();
            const newAccessToken = userInfoStore.access_token;
            return addHouseBookmark(aptSeq, newAccessToken, times - 1);
        }

        if (res.status === 200) {
            showInfoToast("북마크에 추가되었습니다.");

            await houseListStore.setHouseList(
                houseListStore.dongCode,
                houseListStore.keyWord,
                userInfoStore.user.data.userSeq
            );

            const house = houseListStore.houseList.find(h => h.aptSeq === aptSeq);
            if (house) {
                house.bookmark = true;
                houseDetailStore.setHouseDetail(house);
            }
        }
    } catch (error) {
        console.error("Bookmark addition failed:", error);
        showErrorToast("오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
        if (error.response?.data?.code === 401012) {
            console.log("토큰 재발급 후 재시도");
            await reissueAccessToken();
            const newAccessToken = userInfoStore.access_token;
            return addHouseBookmark(aptSeq, newAccessToken, times - 1);
        }
        throw error;
    }
};

const removeHouseBookmark = async (aptSeq, access_token, times) => {
    const houseListStore = useHouseListStore();
    const userInfoStore = useUserInfoStore();
    const houseDetailStore = useHouseDetailStore();

    if (times === 0 || !access_token) {
        showErrorToast("북마크 삭제에 실패했습니다.");
        throw new Error("북마크 삭제 실패");
    }

    try {
        const res = await axios.delete(`${SERVER_URL}/api/bookmark/house/${aptSeq}`, {
            headers: { Authorization: `${access_token}` },
        });

        if (res.status === 200) {
            showInfoToast("북마크가 삭제되었습니다.");
            await houseListStore.setHouseList(
                houseListStore.dongCode,
                houseListStore.keyWord,
                userInfoStore.user.data.userSeq
            );

            const house = houseListStore.houseList.find(h => h.aptSeq === aptSeq);
            if (house) {
                house.bookmark = false;
                houseDetailStore.setHouseDetail(house);
            }
        } else if (res.data.code === 401012) {
            console.log("토큰 갱신이 필요합니다.");
            await reissueAccessToken();
            const newAccessToken = userInfoStore.access_token;
            return removeHouseBookmark(aptSeq, newAccessToken, times - 1);
        }
    } catch (error) {
        console.error("Bookmark deletion failed:", error);
        showErrorToast("오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
        if (error.response?.data?.code === 401012) {
            console.log("토큰 재발급 후 재시도");
            await reissueAccessToken();
            const newAccessToken = userInfoStore.access_token;
            return removeHouseBookmark(aptSeq, newAccessToken, times - 1);
        }
        throw error;
    }
};

const addLocationBookmark = async (dongCode, access_token, times) => {
    const userInfoStore = useUserInfoStore();

    if (times === 0 || !access_token) {
        throw new Error("북마크 추가 실패");
    }

    try {
        const res = await axios.post(
            `${SERVER_URL}/api/bookmark/location`,
            null,
            {
                params: { dongCode },
                headers: { Authorization: `${access_token}` },
            }
        );

        if (res.data.code === 401012) {
            console.log("토큰 갱신이 필요합니다.");
            await reissueAccessToken();
            const newAccessToken = userInfoStore.access_token;
            return addLocationBookmark(dongCode, newAccessToken, times - 1);
        }

        if (res.status === 200) {
            showInfoToast("북마크 지역에 추가되었습니다.");
        }
    } catch (error) {
        console.error("Location bookmark addition failed:", error);
        showErrorToast("오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
        if (error.response?.data?.code === 401012) {
            console.log("토큰 재발급 후 재시도");
            await reissueAccessToken();
            const newAccessToken = userInfoStore.access_token;
            return addLocationBookmark(dongCode, newAccessToken, times - 1);
        }
        throw error;
    }
};

const deleteLocationBookmark = async (dongCode, access_token, times) => {
    const userInfoStore = useUserInfoStore();

    if (times === 0 || !access_token) {
        throw new Error("북마크 삭제 실패");
    }

    try {
        const res = await axios.delete(`${SERVER_URL}/api/bookmark/location/${dongCode}`, {
            headers: { Authorization: `${access_token}` },
        });

        if (res.data.code === 401012) {
            console.log("토큰 갱신이 필요합니다.");
            await reissueAccessToken();
            const newAccessToken = userInfoStore.access_token;
            return deleteLocationBookmark(dongCode, newAccessToken, times - 1);
        }

        if (res.status === 200) {
            showInfoToast("북마크 지역에서 삭제되었습니다.");
        }
    } catch (error) {
        console.error("Location bookmark deletion failed:", error);
        showErrorToast("오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.");
        if (error.response?.data?.code === 401012) {
            console.log("토큰 재발급 후 재시도");
            await reissueAccessToken();
            const newAccessToken = userInfoStore.access_token;
            return deleteLocationBookmark(dongCode, newAccessToken, times - 1);
        }
        throw error;
    }
};

export {
    addHouseBookmark,
    removeHouseBookmark,
    addLocationBookmark,
    deleteLocationBookmark,
};
