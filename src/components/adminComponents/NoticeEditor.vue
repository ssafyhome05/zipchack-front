<template>
  <div class="notice-write-component">
    <div class="notice-header">
      <div class="input-group">
        <label>제목</label>
        <input type="text" v-model="props.item.noticeTitle" placeholder="제목을 입력하세요" />
      </div>
    </div>
    <div class="notice-content-wrapper">
      <textarea 
        v-model="props.item.noticeContent" 
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
import { ref, onMounted, defineProps } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserInfoStore } from '@/stores/userInfoStore';
import axios from 'axios';
import { SERVER_URL } from "@/assets/resources/configs/config";

const adminUserStore = useUserInfoStore();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  }
});

const router = useRouter();
const route = useRoute();

const isEdit = ref(false);

onMounted(() => {
  const noticeId = route.params.id;
  if (noticeId) {
    isEdit.value = true;
  }
});

const handleSubmit = async () => {
  try {
    if (!props.item.noticeTitle.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    const noticeId = route.params.id;
    if (isEdit.value) {
      try {
        const response = await axios.put(`${SERVER_URL}/api/notice/${noticeId}`,
          props.item,
          {
          headers: {
            'Authorization': adminUserStore.access_token
          }
        }
      );
        console.log(response);
      } catch (error) {
        if(error.response.data.code === 401012) {
          adminUserStore.reissueAccessToken().then(() => {
            handleSubmit();
          });
        }
      }
    } else {
      try {
        const response = await axios.post(`${SERVER_URL}/api/notice`,
          props.item,
        {
          headers: {
            'Authorization': adminUserStore.access_token
          }
        }
      );
        console.log(response);
      } catch (error) {
        if(error.response.data.code === 401012) {
          adminUserStore.reissueAccessToken().then(() => {
            handleSubmit();
          });
        }
      }
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