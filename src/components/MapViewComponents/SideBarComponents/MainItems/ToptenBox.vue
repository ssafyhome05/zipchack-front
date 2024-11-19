<template>
  <div class="topten-box">
    <TransitionGroup 
      name="list" 
      tag="div"
      class="list-container"
    >
      <ToptenItem
        v-for="(item, index) in displayItems"
        :key="item.dongcode"
        :item="item"
        :showAll="store.isExpanded"
        :style="{ 
          top: `${index * 65}px`,
          transition: getTransitionStyle(index)
        }"
        class="list-item"
      />
      <div 
        :key="'toggle-button'"
        :style="{ 
          top: `${(store.isExpanded ? 10 : 3) * 65 + 15}px`
        }"
        class="list-item toggle-button no-transition"
        @click="handleToggle"
      >
        {{ store.isExpanded ? '접기' : '더보기' }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import ToptenItem from './ToptenItem.vue'
import { useTopTenStore } from '/stores/topTenStore'
import { onMounted, ref, computed } from 'vue'

const store = useTopTenStore()

const displayItems = computed(() => {
  return store.isExpanded 
    ? store.listData.slice(0, 10) 
    : store.listData.slice(0, 3)
})

const getTransitionStyle = (index) => {
  if (!store.isExpanded && index < 3) {
    return `all 0.5s ease ${index * 100}ms`
  }
  return 'none'
}

const handleToggle = () => {
  store.toggleExpand()
}

onMounted(() => {
  store.startTestInterval()
})
</script>

<style scoped>
.topten-box {
  overflow: hidden;
}

.list-container {
  position: relative;
  height: v-bind('(store.isExpanded ? 11 : 4) * 65 + 25 + "px"');
  transition: height 0.5s ease;
}

.list-item {
  position: absolute;
  width: 100%;
  height: 60px;
  left: 0;
  margin-bottom: 5px;
}

.no-transition {
  transition: none !important;
}

.toggle-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  height: 40px;
}

.toggle-button:hover {
  background-color: #f5f5f5;
  border-color: #ccc;
}

.list-enter-active,
.list-leave-active {
  transition: opacity 0.3s ease;
  position: absolute;
  width: 100%;
}

.list-enter-from {
  opacity: 0;
  z-index: 0;
}

.list-leave-to {
  opacity: 0;
  z-index: -1;
}

.list-move {
  transition: transform 0.3s ease;
}
</style>