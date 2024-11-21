<template>
    <div class="search-custom-spot-container">
        <div class="search-custom-spot-header">
            <div class="search-custom-spot-title">
                사용자 지역 설정하기
            </div>
            <div class="search-custom-spot-close" @click="closeModel">
                <i class="bi bi-x"></i>
            </div>
        </div>
        <div class="search-custom-spot-body">
            <div class="custom-spot-name">
                <p>별명</p>
                <input type="text" v-model="customName" placeholder="사용자 지역"/>
            </div>

            <div class="custom-spot-addr">
                <p>주소</p>
                <input type="text" v-model="roadAddress" placeholder="도로명주소" @click="openSearchPost" readonly>
                <input type="text" v-model="jibunAddress" placeholder="지번주소" @click="openSearchPost" readonly>
            </div>
        </div>
        <div class="search-custom-spot-footer">
            <span class="footer-cancel">취소</span>
            <span class="footer-line">|</span>
            <span class="save" @click="saveCustomSpot">저장</span>
        </div>

    </div>
</template>
<script setup>
import axios from 'axios';
import { SERVER_URL } from '@/assets/resources/configs/config';
import { ref } from 'vue';
import { showWarningToast } from '@/assets/js/PlatformViewsScript/CommonScripts/showToast';
import { useUserInfoStore } from '@/stores/userInfoStore';
import { test } from '@/assets/js/PlatformViewsScript/CommonScripts/reissueAccessToken';

const emit = defineEmits(['close-model', 'refresh-list']);

const closeModel = () => {
    emit('close-model'); // 부모에게 'close-model' 이벤트 전달
};

const userInfoStore = useUserInfoStore();
const customName = ref(null);
const roadAddress = ref(null);
const jibunAddress = ref(null);
const customSpotLat = ref(null);
const customSpotLng = ref(null);

const openSearchPost = () => {
    new window.daum.Postcode({
        oncomplete: (data) => {
            roadAddress.value = data.roadAddress;
            jibunAddress.value = data.jibunAddress;
        },
    }).open();
};

const saveCustomSpot = () => {
    if(!customName.value && (!roadAddress.value || !jibunAddress.value)){
        showWarningToast("별명과 주소를 모두 입력해주세요.");
        return;
    }

    getCustomSpotCoodinate(roadAddress.value, (lat, lng) => {
        customSpotLat.value = lat;
        customSpotLng.value = lng;

        const customSpotDto = {
            spotName: customName.value,
            jibun: jibunAddress.value,
            roadNm: roadAddress.value,
            latitude: lat,
            longitude: lng
        };

        console.log(customSpotDto)
        const access_token = userInfoStore.access_token;
        axios.post(`${SERVER_URL}/api/bookmark/custom`,customSpotDto, {
                headers: {
                    'Authorization': access_token,
                }
            })
            .then(async(response) => {
                if (res.data.code === 401012 || res.data.code === 401011) {
                    console.log("토큰 갱신이 필요합니다.");
                    await test();
                    const newAccessToken = userInfoStore.access_token;
                    return saveCustomSpot();
                }

                if(res.status === 200){
                    // console.log("사용자 북마크 매물 불러오기 완료", res.status);
                    bookmarkHouseList.value = res.data;
                    // console.log(bookmarkHouseList.value);
                }
                if(response.status === 200){
                    const data = response.data;
                    customName.value = null;
                    roadAddress.value = null;
                    jibunAddress.value = null;
                    customSpotLat.value = null;
                    customSpotLng.value = null;
                    emit('refresh-list');
                    closeModel();
                }
            })
            .catch(error => {
                console.error("에러 발생:", error);
                showWarningToast("요청에 실패했습니다.");
            });
    });
}

const getCustomSpotCoodinate = (roadAddress, callback) => {
    var geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(roadAddress, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
            const lat = result[0].y;
            const lng = result[0].x;
            callback(lat, lng);
        } else {
            showWarningToast("주소 검색에 실패했습니다.");
        }
    });
};

</script>
<style scoped>
    .search-custom-spot-container{
        position: absolute;
        left: 450px;
        top: 30px;
        width: 400px;
        height: 330px;
        background-color: white;
        border-radius: 7px;
        box-shadow: 3px 3px 3px rgba(122, 122, 122, 0.3);
    }

    .search-custom-spot-header{
        /* height: 45px; */
        font-weight: bold;
        font-size: 15px;
        text-align: center;
        padding: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccccccb3;
    }

    .search-custom-spot-close{
        font-size: 30px;
        position: absolute;
        right: 0;
        top: 0;
        padding-right: 5px;
        cursor: pointer;
    }

    .search-custom-spot-body{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 30px 0;
        /* height: 70%; */
    }

    .custom-spot-name, .custom-spot-addr{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
        width: 90%;
    }

    .custom-spot-name p{
        font-size: 18px;
        font-weight: bold;
        position: relative;
        text-align: start;
        line-height: 0.5;
        padding-left: 0px;
        width: 100%;
    }

    .custom-spot-name input{
        padding-left: 10px;
        width: 100%;
        height: 35px;
        border-radius: 5px;
        border: 1px solid #666666;
    }

    .custom-spot-addr p{
        font-size: 18px;
        font-weight: bold;
        position: relative;
        text-align: start;
        padding-top: 20px;
        line-height: 0.5;
        width: 100%;
    }

    .custom-spot-addr input{
        padding-left: 10px;
        width: 100%;
        height: 35px;
        margin-bottom: 5px;
        border-radius: 5px;
        border: 1px solid #666666;
    }

    input{
        font-size: 16px;
    }
    
    input::placeholder{
        font-size: 15px;
    }

    .search-custom-spot-footer{
        width: 100%;
        text-align: center;
    }

    .footer-line{
        color: #ccc;
        padding-right: 10px;
        padding-left: 10px;
    }

    .footer-cancel{
        cursor: pointer;
    }

    .footer-cancel:hover{
        font-weight: bold;
    }

    .save{
        color: #007bff;
        cursor: pointer;
    }
    .save:hover{
        font-weight: bold;
    }

</style>
