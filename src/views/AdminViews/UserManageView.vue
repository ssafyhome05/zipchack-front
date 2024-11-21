<template>
  <div class="admin-base-container">
    <SectionContainer :item="item" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SectionContainer from '@/components/adminComponents/SectionContainer.vue';
import BoardComponent from '@/components/adminComponents/AdminBoard.vue';

const item = ref({
    title: '사용자 관리',
    component: BoardComponent,
    props: {
        tableType: 'user'
    },
    pagenation: true
})
</script>