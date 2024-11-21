<template>
  <div class="notice-write-component">
    <div class="notice-header">
      <div class="input-group">
        <label>제목</label>
        <input type="text" v-model="noticeData.title" placeholder="제목을 입력하세요" />
      </div>
      <div class="info-group">
        <div class="info-item">
          <span class="label">작성자</span>
          <span class="value">관리자</span>
        </div>
        <div class="info-item">
          <span class="label">만료일</span>
          <input type="date" v-model="noticeData.expiryDate" />
        </div>
      </div>
    </div>
    <div class="notice-content-wrapper">
      <textarea 
        v-model="noticeData.content" 
        placeholder="내용을 입력하세요"
        class="notice-content">
      </textarea>
    </div>
    <div class="button-container">
      <button class="cancel-button" @click="$router.push('/admin/notice_manage')">취소</button>
      <button class="submit-button" @click="handleSubmit">
        {{ isEdit ? '수정' : '등록' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAdminStore } from '@/stores/adminStore';

const router = useRouter();
const route = useRoute();
const adminStore = useAdminStore();

const noticeData = ref({
  title: '',
  content: '',
  expiryDate: '',
  author: '관리자',
  createdAt: new Date().toISOString().split('T')[0]
});

const isEdit = ref(false);

onMounted(() => {
  const noticeId = route.params.id;
  if (noticeId) {
    isEdit.value = true;
    const notice = adminStore.noticeData.find(notice => notice.id === parseInt(noticeId));
    if (notice) {
      noticeData.value = {
        title: notice.title,
        content: notice.content || '',
        expiryDate: notice.expiryDate,
        author: notice.author,
        createdAt: notice.createdAt
      };
    } else {
      alert('존재하지 않는 공지사항입니다.');
      router.push('/admin/notice_manage');
    }
  }
});

const handleSubmit = () => {
  try {
    if (!noticeData.value.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!noticeData.value.expiryDate) {
      alert('만료일을 선택해주세요.');
      return;
    }

    const noticeId = route.params.id;
    if (isEdit.value) {
      const index = adminStore.noticeData.findIndex(notice => notice.id === parseInt(noticeId));
      if (index !== -1) {
        adminStore.noticeData[index] = {
          ...adminStore.noticeData[index],
          title: noticeData.value.title,
          content: noticeData.value.content,
          expiryDate: noticeData.value.expiryDate
        };
      }
    } else {
      const newId = Math.max(...adminStore.noticeData.map(n => n.id)) + 1;
      adminStore.noticeData.unshift({
        id: newId,
        title: noticeData.value.title,
        content: noticeData.value.content,
        author: noticeData.value.author,
        createdAt: noticeData.value.createdAt,
        expiryDate: noticeData.value.expiryDate,
        views: 0
      });
    }

    router.push('/admin/notice_manage');
  } catch (error) {
    console.error('공지사항 저장 실패:', error);
    alert('저장에 실패했습니다.');
  }
};
</script>

<style scoped>
.notice-write-component {
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

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #666;
}

.input-group input {
  width: 100%;
  padding: 10px;
  font-size: 1.5rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.info-group {
  display: flex;
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
  position: relative;
}

.notice-content {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  width: calc(100% - 40px);
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  resize: none;
  line-height: 1.6;
}

.button-container {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #dee2e6;
}

.cancel-button, .submit-button {
  padding: 10px 30px;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-button {
  background-color: white;
  color: #666;
  border: 1px solid #dee2e6;
}

.submit-button {
  background-color: #0D6BFF;
  color: white;
  border: 1px solid #0D6BFF;
}

.cancel-button:hover {
  background-color: #f8f9fa;
}

.submit-button:hover {
  background-color: white;
  color: #0D6BFF;
}

/* 스크롤바 스타일링 */
.notice-content-wrapper::-webkit-scrollbar {
  width: 8px;
}
</style> 