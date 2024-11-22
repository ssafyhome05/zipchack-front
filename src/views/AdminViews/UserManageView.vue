<template>
  <div class="admin-base-container">
    <SectionContainer :item="item" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SectionContainer from '@/components/adminComponents/SectionContainer.vue';
import AdminBoard from '@/components/adminComponents/AdminBoard.vue';

const item = ref({
    title: '사용자 관리',
    component: AdminBoard,
    props: {
        tableType: 'user'
    },
    isPaginated: true
})
</script>