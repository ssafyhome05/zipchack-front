<template>
    
    <div class="section-container">
      <div class="section-title">
          {{ board.title }}
      </div>
      <div class="section-item">
          <component v-for="item in board.components" :is="item"/>
      </div>
    </div>
  </template>
  
  <script setup>


  const props = defineProps({
      board: Object
  })
  
  </script>
  
  <style scoped>
.section-container {
    padding: 20px;
    width: 100%;
    /* display: flex; */
    /* overflow: auto; */
    flex-direction: column;
}

.section-title {
    padding-top: 10px;
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 10px;   
}

.section-item {
  display: grid; /* Grid 레이아웃 활성화 */
  grid-template-columns: repeat(auto-fill, minmax(48%, 1fr)); /* 최소 300px, 최대 1열 */
  gap: 20px; /* 카드 간격 */
  margin-top: 10px;
  /* padding: 10px; */
  overflow-y: auto;
  position: relative;
}
  
  </style>