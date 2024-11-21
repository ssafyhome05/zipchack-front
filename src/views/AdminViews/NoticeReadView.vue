<template>
  <div class="admin-base-container">
    <SectionContainer :item="item" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SectionContainer from '@/components/adminComponents/SectionContainer.vue';
import NoticeDetailComponent from '@/components/adminComponents/NoticeDetail.vue';
import { useRoute } from 'vue-router';
import { useAdminStore } from '@/stores/adminStore';

const adminStore = useAdminStore();


const route = useRoute();
const id = route.params.id;
const list = adminStore.noticeData.filter(item => item.id == id);
console.log(list);

const item = ref({
  title: '공지사항 상세',
  component: NoticeDetailComponent,
  props: {
    item: list[0]
  }
});
</script>