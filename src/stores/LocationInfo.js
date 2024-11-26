import axios from "axios";
import { defineStore } from 'pinia';
import { SERVER_URL } from '@/assets/resources/configs/config';
import { useUserInfoStore }from '@/stores/userInfoStore';
import { reissueAccessToken } from '@/assets/js/PlatformViewsScript/CommonScripts/reissueAccessToken';

export const useLocationInfoStore = defineStore('locationInfo', {
    state: () => ({
        bookmarkLocationList: [],
        nearestApartmentList: [],
    }),

    actions: {

        async getNearestAptFromCustomSpot() {
            const userInfoStore = useUserInfoStore();
            try {
                // const response = await axios.get(`${SERVER_URL}/api/bookmark/status`, {
                //     headers: {
                //         'Authorization': userInfoStore.access_token,
                //     },
                // });

                // if(response.data.code === 200050){
                    // const responseData = response.data.data;
                    // dummy data
                    const responseData = data;
                
                    const populationsArray = Object.values(responseData.populations);
                    this.bookmarkLocationList = populationsArray;
                    // 커스텀 스팟과 가장 가까운 아파트 매물 정보(도보, 자동차, 대중교통 소요 시간)
                    const customSpotRankData = Object.entries(responseData.customSpotRank).map(([category, items]) => ({
                        categoryName: category,
                        houses: items.map(item => ({
                            ...item,
                            categoryName: category
                        }))
                    }));
                    this.nearestApartmentList = customSpotRankData;
                    console.log(this.nearestApartmentList);
                // }

                // if (response.data.code === 401012) {
                //     console.log("토큰 갱신이 필요합니다.");
                //     await reissueAccessToken();
                //     return this.getNearestAptFromCustomSpot();
                // }
                
                // // dummy data
                // // 인구, 사업체 현황
                // const populationsArray = Object.values(data.populations);
                // this.bookmarkLocationList = populationsArray;
                // // 커스텀 스팟과 가장 가까운 아파트 매물 정보(도보, 자동차, 대중교통 소요 시간)
                // const customSpotRankData = Object.entries(data.customSpotRank).map(([category, items]) => ({
                //     categoryName: category,
                //     houses: items.map(item => ({
                //         ...item,
                //         categoryName: category
                //     }))
                // }));
                // this.nearestApartmentList = customSpotRankData;
            

                // console.log(response.data);
            } catch (error) {
                console.error("Error fetching nearest apartments:", error);
                console.log("토큰 재발급 후 재시도");
                await reissueAccessToken();
                return this.getNearestAptFromCustomSpot();
            }
        }
        
    }
});

const data = {
    "populations": {
        "1111010100": {
            "location": {
                "dongCode": "1111010100",
                "sidoName": "서울특별시",
                "gugunName": "종로구",
                "dongName": "청운동"
            },
            "population": {
                "dongCode": "11110",
                "totalPopulation": 148402,
                "populationDensity": "6153.3",
                "corpCnt": 46683,
                "houseCnt": 44789,
                "generations": [
                    {
                        "generation": "under_20",
                        "population": 18304,
                        "ratio": "12.33"
                    },
                    {
                        "generation": "20_30",
                        "population": 48468,
                        "ratio": "32.66"
                    },
                    {
                        "generation": "40_60",
                        "population": 63780,
                        "ratio": "42.98"
                    },
                    {
                        "generation": "over_70",
                        "population": 17850,
                        "ratio": "12.03"
                    }
                ]
            }
        },
        "1117010100": {
            "location": {
                "dongCode": "1117010100",
                "sidoName": "서울특별시",
                "gugunName": "용산구",
                "dongName": "후암동"
            },
            "population": {
                "dongCode": "11170",
                "totalPopulation": 220699,
                "populationDensity": "10023.8",
                "corpCnt": 27003,
                "houseCnt": 72627,
                "generations": [
                    {
                        "generation": "under_20",
                        "population": 28170,
                        "ratio": "12.76"
                    },
                    {
                        "generation": "20_30",
                        "population": 72104,
                        "ratio": "32.67"
                    },
                    {
                        "generation": "40_60",
                        "population": 96070,
                        "ratio": "43.53"
                    },
                    {
                        "generation": "over_70",
                        "population": 24355,
                        "ratio": "11.04"
                    }
                ]
            }
        },
        "1132010500": {
            "location": {
                "dongCode": "1132010500",
                "sidoName": "서울특별시",
                "gugunName": "도봉구",
                "dongName": "쌍문동"
            },
            "population": {
                "dongCode": "11320",
                "totalPopulation": 306279,
                "populationDensity": "14700.1",
                "corpCnt": 20370,
                "houseCnt": 105230,
                "generations": [
                    {
                        "generation": "under_20",
                        "population": 39907,
                        "ratio": "13.03"
                    },
                    {
                        "generation": "20_30",
                        "population": 75991,
                        "ratio": "24.81"
                    },
                    {
                        "generation": "40_60",
                        "population": 147420,
                        "ratio": "48.13"
                    },
                    {
                        "generation": "over_70",
                        "population": 42961,
                        "ratio": "14.03"
                    }
                ]
            }
        }
    },
    "customSpotRank": {
        "내집": [
            {
                "houseSeq": "11170-208",
                "houseName": "후암",
                "address": "244-106",
                "carTime": 3501,
                "walkTime": 34238,
                "transportTime": 6942
            },
            {
                "houseSeq": "11170-274",
                "houseName": "힐튼빌리지2차",
                "address": "244-88",
                "carTime": 3500,
                "walkTime": 34233,
                "transportTime": 6947
            },
            {
                "houseSeq": "11170-2377",
                "houseName": "명남아띠팰리스",
                "address": "244-90",
                "carTime": 3521,
                "walkTime": 34220,
                "transportTime": 6997
            },
            {
                "houseSeq": "11170-204",
                "houseName": "제일",
                "address": "438-7",
                "carTime": 3404,
                "walkTime": 33980,
                "transportTime": 6999
            },
            {
                "houseSeq": "11170-275",
                "houseName": "힐튼빌리지1차",
                "address": "244-91",
                "carTime": 3519,
                "walkTime": 34277,
                "transportTime": 7016
            },
            {
                "houseSeq": "11170-205",
                "houseName": "브라운스톤남산",
                "address": "458",
                "carTime": 3488,
                "walkTime": 34304,
                "transportTime": 7017
            },
            {
                "houseSeq": "11170-155",
                "houseName": "프리마베라빌",
                "address": "55-20",
                "carTime": 3494,
                "walkTime": 34150,
                "transportTime": 7034
            },
            {
                "houseSeq": "11170-258",
                "houseName": "신주에지앙",
                "address": "302",
                "carTime": 3524,
                "walkTime": 34115,
                "transportTime": 7058
            },
            {
                "houseSeq": "11170-276",
                "houseName": "화인",
                "address": "244-99",
                "carTime": 3481,
                "walkTime": 34289,
                "transportTime": 7083
            },
            {
                "houseSeq": "11170-142",
                "houseName": "행남그랜드",
                "address": "244-5",
                "carTime": 3471,
                "walkTime": 34473,
                "transportTime": 7089
            },
            {
                "houseSeq": "11170-6",
                "houseName": "용암한신",
                "address": "47-5",
                "carTime": 3110,
                "walkTime": 33905,
                "transportTime": 7116
            },
            {
                "houseSeq": "11170-2886",
                "houseName": "몬테피오레",
                "address": "41-1",
                "carTime": 3437,
                "walkTime": 34025,
                "transportTime": 7789
            },
            {
                "houseSeq": "11170-273",
                "houseName": "삼안리치8차",
                "address": "143-23",
                "carTime": 3433,
                "walkTime": 34721,
                "transportTime": 8046
            },
            {
                "houseSeq": "11170-143",
                "houseName": "남산애지앙",
                "address": "1-10",
                "carTime": 3430,
                "walkTime": 34137,
                "transportTime": 8138
            },
            {
                "houseSeq": "11170-2",
                "houseName": "뉴후암",
                "address": "426",
                "carTime": 3480,
                "walkTime": 34328,
                "transportTime": 8420
            },
            {
                "houseSeq": "11290-3718",
                "houseName": "한양수자인",
                "address": "295-1",
                "carTime": 3092,
                "walkTime": 31874,
                "transportTime": 8636
            }
        ],
        "직장": [
            {
                "houseSeq": "11170-6",
                "houseName": "용암한신",
                "address": "47-5",
                "carTime": 1394,
                "walkTime": 6663,
                "transportTime": 2327
            },
            {
                "houseSeq": "11170-2886",
                "houseName": "몬테피오레",
                "address": "41-1",
                "carTime": 1677,
                "walkTime": 7774,
                "transportTime": 2601
            },
            {
                "houseSeq": "11170-258",
                "houseName": "신주에지앙",
                "address": "302",
                "carTime": 1753,
                "walkTime": 7581,
                "transportTime": 2692
            },
            {
                "houseSeq": "11170-155",
                "houseName": "프리마베라빌",
                "address": "55-20",
                "carTime": 1731,
                "walkTime": 7636,
                "transportTime": 2726
            },
            {
                "houseSeq": "11170-2377",
                "houseName": "명남아띠팰리스",
                "address": "244-90",
                "carTime": 1752,
                "walkTime": 7682,
                "transportTime": 2797
            },
            {
                "houseSeq": "11170-274",
                "houseName": "힐튼빌리지2차",
                "address": "244-88",
                "carTime": 1736,
                "walkTime": 7717,
                "transportTime": 2810
            },
            {
                "houseSeq": "11170-208",
                "houseName": "후암",
                "address": "244-106",
                "carTime": 1736,
                "walkTime": 7722,
                "transportTime": 2814
            },
            {
                "houseSeq": "11170-204",
                "houseName": "제일",
                "address": "438-7",
                "carTime": 1648,
                "walkTime": 7981,
                "transportTime": 2834
            },
            {
                "houseSeq": "11170-275",
                "houseName": "힐튼빌리지1차",
                "address": "244-91",
                "carTime": 1751,
                "walkTime": 7663,
                "transportTime": 2853
            },
            {
                "houseSeq": "11170-276",
                "houseName": "화인",
                "address": "244-99",
                "carTime": 1772,
                "walkTime": 7678,
                "transportTime": 2865
            },
            {
                "houseSeq": "11170-273",
                "houseName": "삼안리치8차",
                "address": "143-23",
                "carTime": 1676,
                "walkTime": 8122,
                "transportTime": 2896
            },
            {
                "houseSeq": "11170-205",
                "houseName": "브라운스톤남산",
                "address": "458",
                "carTime": 1723,
                "walkTime": 8116,
                "transportTime": 2943
            },
            {
                "houseSeq": "11170-143",
                "houseName": "남산애지앙",
                "address": "1-10",
                "carTime": 1672,
                "walkTime": 8138,
                "transportTime": 2950
            },
            {
                "houseSeq": "11170-142",
                "houseName": "행남그랜드",
                "address": "244-5",
                "carTime": 1763,
                "walkTime": 7767,
                "transportTime": 3130
            },
            {
                "houseSeq": "11170-2",
                "houseName": "뉴후암",
                "address": "426",
                "carTime": 1716,
                "walkTime": 8209,
                "transportTime": 3270
            },
            {
                "houseSeq": "11290-3718",
                "houseName": "한양수자인",
                "address": "295-1",
                "carTime": 1860,
                "walkTime": 9709,
                "transportTime": 3283
            }
        ],
        "학교": [
            {
                "houseSeq": "11290-3718",
                "houseName": "한양수자인",
                "address": "295-1",
                "carTime": 1029,
                "walkTime": 2384,
                "transportTime": 1098
            },
            {
                "houseSeq": "11170-204",
                "houseName": "제일",
                "address": "438-7",
                "carTime": 1219,
                "walkTime": 4198,
                "transportTime": 1572
            },
            {
                "houseSeq": "11170-208",
                "houseName": "후암",
                "address": "244-106",
                "carTime": 1281,
                "walkTime": 4589,
                "transportTime": 1612
            },
            {
                "houseSeq": "11170-274",
                "houseName": "힐튼빌리지2차",
                "address": "244-88",
                "carTime": 1281,
                "walkTime": 4594,
                "transportTime": 1617
            },
            {
                "houseSeq": "11170-205",
                "houseName": "브라운스톤남산",
                "address": "458",
                "carTime": 1267,
                "walkTime": 4486,
                "transportTime": 1625
            },
            {
                "houseSeq": "11170-143",
                "houseName": "남산애지앙",
                "address": "1-10",
                "carTime": 1226,
                "walkTime": 4416,
                "transportTime": 1648
            },
            {
                "houseSeq": "11170-2",
                "houseName": "뉴후암",
                "address": "426",
                "carTime": 1263,
                "walkTime": 4511,
                "transportTime": 1650
            },
            {
                "houseSeq": "11170-2377",
                "houseName": "명남아띠팰리스",
                "address": "244-90",
                "carTime": 1303,
                "walkTime": 4643,
                "transportTime": 1667
            },
            {
                "houseSeq": "11170-275",
                "houseName": "힐튼빌리지1차",
                "address": "244-91",
                "carTime": 1302,
                "walkTime": 4662,
                "transportTime": 1686
            },
            {
                "houseSeq": "11170-155",
                "houseName": "프리마베라빌",
                "address": "55-20",
                "carTime": 1278,
                "walkTime": 4367,
                "transportTime": 1704
            },
            {
                "houseSeq": "11170-276",
                "houseName": "화인",
                "address": "244-99",
                "carTime": 1322,
                "walkTime": 4507,
                "transportTime": 1753
            },
            {
                "houseSeq": "11170-142",
                "houseName": "행남그랜드",
                "address": "244-5",
                "carTime": 1314,
                "walkTime": 4655,
                "transportTime": 1759
            },
            {
                "houseSeq": "11170-258",
                "houseName": "신주에지앙",
                "address": "302",
                "carTime": 1306,
                "walkTime": 4333,
                "transportTime": 1783
            },
            {
                "houseSeq": "11170-2886",
                "houseName": "몬테피오레",
                "address": "41-1",
                "carTime": 1275,
                "walkTime": 4243,
                "transportTime": 1797
            },
            {
                "houseSeq": "11170-273",
                "houseName": "삼안리치8차",
                "address": "143-23",
                "carTime": 1171,
                "walkTime": 4903,
                "transportTime": 1836
            },
            {
                "houseSeq": "11170-6",
                "houseName": "용암한신",
                "address": "47-5",
                "carTime": 1158,
                "walkTime": 4995,
                "transportTime": 2343
            }
        ]
    }
}