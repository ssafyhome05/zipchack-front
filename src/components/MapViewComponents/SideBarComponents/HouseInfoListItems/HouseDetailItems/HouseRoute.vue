<template>
    <p class="route-description">
        <i class="bi bi-info-circle-fill"></i>
        시간을 클릭하면 경로를 확인할 수 있습니다.
    </p>
    <table class="house-detail-distance-info">
        <thead>
            <tr>
                <th class="house-detail-distance-info-title">소요 거리</th>
                <th class="house-detail-distance-info-icon"><i class="bi bi-car-front-fill"></i></th>
                <td class="table-line"></td>
                <th class="house-detail-distance-info-icon"><i class="bi bi-person-walking"></i></th>
                <td class="table-line"></td>
                <th class="house-detail-distance-info-icon"><i class="bi bi-bus-front"></i></th>
            </tr>
        </thead>
        <tbody v-if="isLogin">
            <tr>
               <td colspan="8" v-if="isLoading" class="route-loading">
                    <VueSpinner size="40" color="#007bff" class="route-spinner"/>
               </td> 
            </tr>
            <tr v-for="(route, index) in routeList" :key="index">
                <td class="house-detail-distance-info-location">{{ route.customName  }}</td>
                <td class="house-detail-distance-info-time">
                    <a class="exist-time" v-if="route.car.length != 0" @click.stop="drawPolyline('car', route.car[0].routeInfos)">
                        {{ formatTime(route.car[0].totalTime) }}
                        <!-- {{ Math.floor(route.car[0].totalTime / 3600) + "시간 " + Math.ceil((route.car[0].totalTime % 3600) / 60) + "분" }} -->
                    </a>
                    <a class="none-exist-time" v-else>없음</a>
                </td>
                <td class="table-line"></td>
                <td class="house-detail-distance-info-time">
                    <a class="exist-time" v-if="route.walk.length != 0" @click.stop="drawPolyline('walk', route.walk[0].routeInfos)">
                        {{ formatTime(route.walk[0].totalTime) }}
                        <!-- {{ Math.floor(route.walk[0].totalTime / 3600) + "시간 " + Math.ceil((route.walk[0].totalTime % 3600) / 60) + "분" }} -->

                    </a>
                    <a class="none-exist-time" v-else>없음</a>
                </td>
                <td class="table-line"></td>
                <td class="house-detail-distance-info-time">
                    <a class="exist-time" v-if="route.transport.length !== 0" @click="showTransportRoutesModal">
                        {{ formatTime(Math.min(...route.transport.map(t => t.totalTime))) }}
                        <!-- {{ Math.floor(Math.min(...route.transport.map(t => t.totalTime)) / 3600) + "시간 " +  Math.ceil((Math.min(...route.transport.map(t => t.totalTime)) / 3600) / 60) + "분"}} -->
                    </a>
                    <a class="none-exist-time" v-else>없음</a>
                </td>
                <TransportModal :route="route.transport" :isClicked="isClicked" v-show="isClicked"/>
            </tr>
            <tr>
                <td :colspan="6">
                    <button class="search-addr-btn" @click="openSearchModal">장소 검색하기</button>
                </td>
            </tr>
        </tbody>
        <tbody v-else>
            <tr>
                <td :colspan="7" class="house-detail-distance-dologin">
                    <a id="simple-kakao-login" class="button" :href="`${serverUrl}/oauth2/authorization/kakao`">
                        <img src="@/assets/resources/images/kakao_icon.png">
                        <span>카카오톡으로 3초만에 로그인</span>
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import HouseRoute from '@/assets/js/PlatformViewsScript/MapViewScripts/SideBarScripts/HouseInfoListScripts/HouseDetailScripts/HouseRoute';
export default HouseRoute;
</script>
<style>
</style>