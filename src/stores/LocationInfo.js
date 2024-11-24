import axios from "axios";
import { defineStore } from 'pinia';
import { SERVER_URL } from '@/assets/resources/configs/config';
import { useUserInfoStore }from '@/stores/userInfoStore';
import { reissueAccessToken } from '@/assets/js/PlatformViewsScript/CommonScripts/reissueAccessToken';
import { TrackOpTypes } from 'vue';

export const useLocationInfoStore = defineStore('locationInfo', {
    state: () => ({
        locationInfo: [],
        bookmarkLocationList: [],
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
        }
    }
});