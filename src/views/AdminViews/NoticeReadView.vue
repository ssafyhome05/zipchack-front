<template>
  <div class="admin-base-container">
    <SectionContainer :item="item" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SectionContainer from '@/components/adminComponents/SectionContainer.vue';
import NoticeDetail from '@/components/adminComponents/NoticeDetail.vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { SERVER_URL } from "@/assets/resources/configs/config";

const route = useRoute();
const id = route.params.id;
const list = ref({
  noticeTitle: '',
  noticeContent: ''
});

const item = ref({
  title: '공지사항 상세',
  component: NoticeDetail,
  props: {
    item: list
  }
});

onMounted(async () => {
  const resources = await axios.get(`${SERVER_URL}/api/notice/detail?noticeSeq=${id}`);
  console.log(resources.data.data);
  list.value = resources.data.data;
  console.log(list.value);
})
</script>