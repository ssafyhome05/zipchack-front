<template>
  <div class="notice-detail-component">
    <div class="notice-header">
      <h2 class="notice-title">{{ item.title }}</h2>
      <div class="notice-info">
        <div class="info-item">
          <span class="label">글 번호</span>
          <span class="value">{{ item.id }}</span>
        </div>
        <div class="info-item">
          <span class="label">작성자</span>
          <span class="value">{{ item.author }}</span>
        </div>
        <div class="info-item">
          <span class="label">작성일</span>
          <span class="value">{{ item.createdAt }}</span>
        </div>
        <div class="info-item">
          <span class="label">만료일</span>
          <span class="value">{{ item.expiryDate }}</span>
        </div>
      </div>
    </div>
    <div class="notice-content-wrapper">
      <div class="notice-content">
        {{ item.content }}
      </div>
    </div>
    <div class="button-container">
      <button class="list-button" @click="$router.push('/admin/notice_manage')">목록으로</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.notice-detail-component {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.notice-header {
  flex-shrink: 0;
  border-bottom: 2px solid #dee2e6;
  padding: 20px;
}

.notice-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.notice-info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.label {
  color: #666;
  font-weight: 500;
}

.value {
  color: #333;
}

.notice-content-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 0 20px;
}

.notice-content {
  padding: 20px 0;
  line-height: 1.6;
  color: #333;
  white-space: pre-line;
}

.button-container {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  padding: 20px;
  border-top: 1px solid #dee2e6;
}

.list-button {
  padding: 10px 30px;
  background-color: #0D6BFF;
  color: white;
  border: 1px solid #0D6BFF;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.list-button:hover {
  background-color: white;
  color: #0D6BFF;
}

/* 스크롤바 스타일링 */
.notice-content-wrapper::-webkit-scrollbar {
  width: 8px;
}

.notice-content-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.notice-content-wrapper::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.notice-content-wrapper::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>