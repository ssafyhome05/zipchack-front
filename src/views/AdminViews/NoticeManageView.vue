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
    title: '공지사항',
    component: AdminBoard,
    props: {
        tableType: 'notice'
    },
    isPaginated: true
})
</script>