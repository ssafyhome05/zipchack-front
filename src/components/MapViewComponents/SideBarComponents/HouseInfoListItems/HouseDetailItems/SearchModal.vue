<template>
    <!-- Modal -->
    <div class="modal fade" id="search-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="search-modal-title" id="exampleModalLabel">기타 편의시설 검색</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="addr-search-box">
                        <div class="addr-search-name">
                            <p>별명</p>
                            <input type="text" id="place" v-model="customName" placeholder="장소명">
                        </div>
                        <div class="addr-search-input">                   
                            <p>
                                주소 
                                <span>
                                    <button class="search-addr-button" @click="openSearchPost">검색</button>
                                </span>
                            </p>
                            <input type="text" id="roadAddress" v-model="roadAddress" placeholder="도로명주소" disabled>
                            <input type="text" id="jibunAddress" v-model="jibunAddress" placeholder="지번주소" disabled>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="cancle" data-bs-dismiss="modal">취소</button>
                    <span class="line"></span>
                    <button type="button" class="search" @click="searchCustomSpot">거리 확인하기</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SearchModal from '@/assets/js/PlatformViewsScript/MapViewScripts/SideBarScripts/HouseInfoListScripts/HouseDetailScripts/SearchModal';
export default SearchModal;
</script>
<style>
@import '@/assets/css/PlatformViewsStyle/MapViewStyles/SideBarStyles/HouseInfoListItems/SearchModal.css';
</style>