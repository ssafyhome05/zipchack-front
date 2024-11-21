<template>
  <div class="admin-base-container">
    <SectionContainer :item="item" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SectionContainer from '@/components/adminComponents/SectionContainer.vue';
import NoticeWriteComponent from '@/components/adminComponents/NoticeEditor.vue';

const item = ref({
  title: '공지사항 작성',
  component: NoticeWriteComponent,
  props: {}
});
</script>