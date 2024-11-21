<template>
  <div class="section-container">
    <div class="section-title">
        {{ item.title }}
    </div>
    <div class="section-item">
        <component :is="item.component" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    item: Object
})

</script>

<style scoped>
.section-container {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.section-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
    border-bottom: 1px solid lightgray;
    flex-shrink: 0;
}

.section-item {
    flex: 1;
    margin-top: 10px;
    padding: 10px;
    overflow-y: auto;
}

</style>