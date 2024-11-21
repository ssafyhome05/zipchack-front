<template>
    <div v-if="dongCode !== ''" class="toggle-box">
        <img 
      v-for="(button, index) in buttons" 
      :key="index" 
      :src="button.isActive ? button.activeImg : button.inactiveImg" 
      @click="toggleButton(index)"
    />
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useHouseListStore } from '@/stores/houseListStore';

const houseListStore = useHouseListStore();
const dongCode = ref(houseListStore.dongCode);
const buttons = ref([
  {
    name: "train",
    isActive: false,
    activeImg: "src/assets/imgs/button/train-button-fill.png",
    inactiveImg: "src/assets/imgs/button/train-button-empty.png",
  },
  {
    name: "cafe",
    isActive: false,
    activeImg: "src/assets/imgs/button/cafe-button-fill.png",
    inactiveImg: "src/assets/imgs/button/cafe-button-empty.png",
  },
  {
    name: "mart",
    isActive: false,
    activeImg: "src/assets/imgs/button/mart-button-fill.png",
    inactiveImg: "src/assets/imgs/button/mart-button-empty.png",
  },
  {
    name: "school",
    isActive: false,
    activeImg: "src/assets/imgs/button/school-button-fill.png",
    inactiveImg: "src/assets/imgs/button/school-button-empty.png",
  },
  {
    name: "hospital",
    isActive: false,
    activeImg: "src/assets/imgs/button/hospital-button-fill.png",
    inactiveImg: "src/assets/imgs/button/hospital-button-empty.png",
  },
]);

watch(() => houseListStore.dongCode, (newVal) => {
    dongCode.value = newVal;
    console.log(dongCode.value)
});
// 버튼 토글 함수
const toggleButton = (index) => {
  buttons.value[index].isActive = !buttons.value[index].isActive;
};
</script>
<style scoped>
.toggle-box{
    height: fit-content;
    width: fit-content;
    position: absolute;
    top: 140%;
    right: 1%;
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

img {
  width: 110px;
  margin-bottom: 5px;
  cursor: pointer;
  transition: transform 0.2s;
}

img:hover {
  transform: scale(1.1);
}
</style>