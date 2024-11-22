<template>
  <div class="admin-base-container">
    <SectionContainer :item="item" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SectionContainer from '@/components/adminComponents/SectionContainer.vue';
import NoticeEditor from '@/components/adminComponents/NoticeEditor.vue';
import axios from 'axios';
import { SERVER_URL } from "@/assets/resources/configs/config";
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
const list = ref({
  noticeTitle: '',
  noticeContent: ''
});

const item = ref({
  title: '공지사항 작성',
  component: NoticeEditor,
  props: {
    item: list
  }
});

onMounted(async () => {
  if (id) {
    const resources = await axios.get(`${SERVER_URL}/api/notice/detail?noticeSeq=${id}`);
    list.value = resources.data.data;
  }
})
</script>