<template>
    <div>
    <div class="card">
      <h3 class="closet-title">
        <span class="closet-keyword">{{ selectedName }}</span>
        와(과) 가장 가까운 아파트는?
      </h3>
      <slot>
        <div v-if="customSpot" class="custom-spot-select-box">
          <div
          v-for="(spot, index) in customSpot"
          :key="index"
          :class="['custom-spot-select-item', { 'selected': selectedSpot === index }]"
          @click="selectSpot(index)"
        >
          {{ spot.spotName }}
        </div>
          
          <!-- <div class="custom-spot-select-item">
            멀캠
          </div>
          <div class="custom-spot-select-item">
            병원
          </div>
          <div class="custom-spot-select-item">
            학교
          </div> -->
        </div>

        <div class="custom-spot-list-box">
          <div class="custom-spot-list-box-header">
            <div class="custom-spot-list-box-header-name">단지명</div>
            <div class="custom-spot-list-box-header-walk">도보</div>
            <div class="custom-spot-list-box-header-car">자동차</div>
            <div class="custom-spot-list-box-header-transport">대중교통</div>
          </div>
          <div class="custom-spot-list-box-content">
            <div class="custom-spot-list-box-content-item">
              <div class="custon-spot-list-num">
                1
              </div>
              <div class="custon-spot-list-name">
                <p class="custon-spot-name">준형마을로 가요</p>
                <p class="custon-spot-addr">서울특별시 집갈래 집갈래</p>
              </div>
              <div class="custon-spot-list-walk">1시간 3분</div>
              <div class="custon-spot-list-car">32분</div>
              <div class="custon-spot-list-transport">32분</div>
            </div>

            <div class="custom-spot-list-box-content-item">
              <div class="custon-spot-list-num">
                1
              </div>
              <div class="custon-spot-list-name">
                <p class="custon-spot-name">성민마을</p>
                <p class="custon-spot-addr">서울특별시 집갈래 집갈래</p>
              </div>
              <div class="custon-spot-list-walk">1시간 3분</div>
              <div class="custon-spot-list-car">32분</div>
              <div class="custon-spot-list-transport">32분</div>
            </div>

            <div class="custom-spot-list-box-content-item">
              <div class="custon-spot-list-num">
                1
              </div>
              <div class="custon-spot-list-name">
                <p class="custon-spot-name">해구마을</p>
                <p class="custon-spot-addr">서울특별시 집갈래 집갈래</p>
              </div>
              <div class="custon-spot-list-walk">1시간 3분</div>
              <div class="custon-spot-list-car">32분</div>
              <div class="custon-spot-list-transport">32분</div>
            </div>

            <div class="custom-spot-list-box-content-item">
              <div class="custon-spot-list-num">
                1
              </div>
              <div class="custon-spot-list-name">
                <p class="custon-spot-name">준형마을</p>
                <p class="custon-spot-addr">서울특별시 집갈래 집갈래</p>
              </div>
              <div class="custon-spot-list-walk">1시간 3분</div>
              <div class="custon-spot-list-car">32분</div>
              <div class="custon-spot-list-transport">32분</div>
            </div>

            <div class="custom-spot-list-box-content-item">
              <div class="custon-spot-list-num">
                1
              </div>
              <div class="custon-spot-list-name">
                <p class="custon-spot-name">준형마을</p>
                <p class="custon-spot-addr">서울특별시 집갈래 집갈래</p>
              </div>
              <div class="custon-spot-list-walk">1시간 3분</div>
              <div class="custon-spot-list-car">32분</div>
              <div class="custon-spot-list-transport">32분</div>
            </div>

            <div class="custom-spot-list-box-content-item">
              <div class="custon-spot-list-num">
                1
              </div>
              <div class="custon-spot-list-name">
                <p class="custon-spot-name">준형마을</p>
                <p class="custon-spot-addr">서울특별시 집갈래 집갈래</p>
              </div>
              <div class="custon-spot-list-walk">1시간 3분</div>
              <div class="custon-spot-list-car">32분</div>
              <div class="custon-spot-list-transport">32분</div>
            </div>
          </div>
        </div>
      </slot>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted, watch} from 'vue';
import { useLocationInfoStore } from '@/stores/LocationInfo';

const locationInfoStore = useLocationInfoStore();
const customSpot = ref([]);
const selectedSpot = ref(null);
const selectedName = ref(null);

onMounted(() => {
  // customSpotList가 비어있지 않은지 체크
  if (locationInfoStore.customSpotList && locationInfoStore.customSpotList.length > 0) {
    customSpot.value = locationInfoStore.customSpotList;
    console.log(customSpot.value);
    selectedSpot.value = 0;
    selectedName.value = customSpot.value[0].spotName;  // 첫 번째 스팟 이름 초기화
  }
});

// locationInfoStore.customSpotList가 변경될 때마다 실행되는 watch
watch(() => locationInfoStore.customSpotList, (newList) => {
  if (newList && newList.length > 0) {
    customSpot.value = newList;
    selectedSpot.value = 0;  // 첫 번째 항목 선택
    selectedName.value = customSpot.value[0].spotName;
    console.log('Updated customSpot:', customSpot.value);
  }
}, { immediate: true });  // 컴포넌트가 마운트되자마자 즉시 실행

const selectSpot = (index) => {
  if (index >= 0 && index < customSpot.value.length) {
    selectedSpot.value = index;
    selectedName.value = customSpot.value[index].spotName;
  }
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: bold;
}

.closet-title{
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 5px;
}

.closet-keyword{
  font-size: 25px;
  font-weight: bold;
  color: #007bff;
}

.custom-spot-select-box{
  display: flex;
  flex-direction: row;
  /* padding-left: 5px; */
  padding: 10px 10px 5px;
  overflow-x: auto;
}

.custom-spot-select-box::-webkit-scrollbar {
  height: 0.4vw;
} 

.custom-spot-select-box::-webkit-scrollbar-thumb {
  background-color: #cacaca;
  border-radius: 10px;
}

.custom-spot-select-item{
  background-color: #989898;
  padding: 8px 30px;
  color: white;
  font-weight: bold;
  min-width: 120px;
  text-align: center;
  border-radius: 20px;
  margin-right: 10px;
  cursor: pointer;
}

.custom-spot-select-item:hover {
  transform: scale(1.05);
}

.custom-spot-select-item.selected {
  background-color: #007bff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.custom-spot-list-box{
  /* border: 1px solid black; */
  /* background-color: red; */
  height: 440px;
  padding: 20px 30px;
}

.custom-spot-list-box-header{
  display: flex;
  flex-direction: row;
  width: 100%;
  color: #666666;
  font-size: 16px;
  margin-bottom: 5px;
}

.custom-spot-list-box-header-name{
  width: 55%;
  padding-left: 10%;
}

.custom-spot-list-box-header-walk{
  width: 15%;
}

.custom-spot-list-box-header-car{
  width: 15%;
}

.custom-spot-list-box-header-transport{
  width: 15%;
}

.custom-spot-list-box-content{
  overflow: auto;
  height: 350px;
}

.custom-spot-list-box-content::-webkit-scrollbar {
  width: 0.3vw;
} 

.custom-spot-list-box-content::-webkit-scrollbar-thumb {
  background-color: #cacaca;
  border-radius: 10px;
}

.custom-spot-list-box-content-item{
  /* border: 1px solid black; */
  height: 75px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  background-color: #cccccc2e;
  box-shadow: 3px 3px 3px #62626260;
  cursor: pointer;
}

.custom-spot-list-box-content-item:hover{
 border: 0.15rem solid #007bff;
}

.custon-spot-list-num{
  width: 7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.custon-spot-list-name{
  width: 43%;
  padding-left: 1%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 0.6;
  padding-top: 20px;
}

.custon-spot-name{
  font-size: 19px;
  font-weight: bold;
}

.custon-spot-addr{
  color: #444;
}

.custon-spot-list-walk
{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
}

.custon-spot-list-car
{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 17%;
}

.custon-spot-list-transport
{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
}
</style>