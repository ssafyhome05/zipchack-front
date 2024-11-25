import axios from "axios";
import { defineStore } from 'pinia';
import { SERVER_URL } from '@/assets/resources/configs/config';
import { useUserInfoStore }from '@/stores/userInfoStore';
import { reissueAccessToken } from '@/assets/js/PlatformViewsScript/CommonScripts/reissueAccessToken';

export const useLocationInfoStore = defineStore('locationInfo', {
    state: () => ({
        locationInfo: [],
        bookmarkLocationList: [],
        customSpotList: [],
        nearestApt: [],
    }),

    actions: {
        async getUserBookmarkLocation(){
            const userInfoStore = useUserInfoStore();

            try{
                const response = await axios.get(`${SERVER_URL}/api/bookmark/location`,
                    {
                        headers: {
                            'Authorization': `${userInfoStore.access_token}`,
                        }
                    }
                );

                this.bookmarkLocationList = response.data;

                if (this.bookmarkLocationList.length > 0) {
                    this.locationInfo = await Promise.all(
                      this.bookmarkLocationList.map(async (data) => {
                        var test = await this.setLocationInfo(data.dongCode);
                        return test;
                      })
                    );
                }
            }catch(error){
                console.log(error);
            }
        },

        async setLocationInfo(dongCode){
            var popData = null;
            try{
                await axios.get(`${SERVER_URL}/api/house/population`, {
                    params: {
                        dongCode: dongCode,
                    }
                }).then(response => {
                    const data = response.data;
                    if(data.code === 200050){
                        // console.log(data.data)
                        popData =  data.data;
                    }
                })
            }catch(error){
                console.log(error);
            }

            return popData;
        },

        async getCustomSpot() {
            const userInfoStore = useUserInfoStore();

            try{
                const response = await axios.get(`${SERVER_URL}/api/bookmark/custom`, {
                    headers: {
                        'Authorization': userInfoStore.access_token,
                    },
                });
                this.customSpotList = response.data;
                console.log(response.data);
            }catch(error){
                console.log(error);
            }
        },

        // private String aptSeq;
        // private String jibun;
        // private String road_name;
        // private String latitude;
        // private String longitude;

        // const spotSearchDto = {
        //     aptSeq: houseDetailStore.houseDetail.aptSeq,
        //     jibun: jibunAddress.value,
        //     road_name: roadAddress.value,
        //     latitude: lat,
        //     longitude: lng
        // };

    
        async getNearestAptFromCustomSpot() {
            const userInfoStore = useUserInfoStore();
        
            if (this.customSpotList && this.customSpotList.length > 0) {
                try {
                    // 모든 요청을 Promise 배열로 생성
                    const requests = this.customSpotList.map((spot) => {
                        console.log(spot)
                        return axios.get(`${SERVER_URL}/api/navigate/custom`, {
                            headers: {
                                'Authorization': userInfoStore.access_token,
                            },
                            params: {
                                "houseSeq": spot.spotSeq, // customSpotList의 개별 데이터 활용
                            },
                        });
                    });
        
                    // 모든 요청을 병렬로 처리
                    const responses = await Promise.all(requests);
        
                    // 응답 데이터를 nearestApt 배열에 추가
                    this.nearestApt = responses.map((response) => response.data.data);
        
                    console.log(this.nearestApt); // 결과 확인
                } catch (error) {
                    console.error("Error fetching nearest apartments:", error);
                }
            } else {
                console.log("No custom spots available.");
            }
        }
        
    }
});