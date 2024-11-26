<script setup>
import axios from "axios";
import { ref, onUnmounted, computed, watch } from "vue";
import { useUserInfoStore } from '@/stores/userInfoStore';

const adminUserStore = useUserInfoStore();

const progress_percent = ref(0);
const sseConnection = ref(null);
const year = ref(null);
const month = ref(null);

const sseMessageHandler = (event) => {
  const eventData = JSON.parse(event.data);
  console.log(eventData);
  if (eventData.code == 20000) {
    progress_percent.value = eventData.data.seq / eventData.data.size * 100;
  }
};

watch(progress_percent, (newVal) => {
  if (newVal == 100) {
    console.log("100% 도달");
    closeConnection();
  }
});

const closeConnection = () => {
  if (sseConnection.value) {
    if (progress_percent.value == 100) {
    //성공이벤트
    }
    else {
      //실패이벤트
    }
    console.log("연결 종료");
    sseConnection.value.close();
    sseConnection.value = null;
  }
};

const startSseConnection = async () => {
  closeConnection();

  try {
    const response = await axios.post(`http://localhost:8080/api/house/admin/house?startCd=11110&endCd=60000&dealYmd=${year.value}${month.value}`,
      null,
      // {
      //   headers: {
      //     'Authorization': adminUserStore.access_token
      //   }
      // }
    );

    console.log(response);
    console.log('서버 응답:', response.data.data);
    
    sseConnection.value = new EventSource(response.data.data, { withCredentials: true }, {
      headers: {
        'Authorization': adminUserStore.access_token
      }
    });
    console.log('SSE 연결 생성:', sseConnection.value);
    
    sseConnection.value.onmessage = sseMessageHandler;

    sseConnection.value.onopen = (event) => {
      console.log('SSE 연결 열림:', event);
    };

    sseConnection.value.onerror = (error) => {
      console.error("SSE 에러 발생:", error);
      closeConnection();
    };
  } catch (error) {
    console.error("연결 시작 실패:", error);
    closeConnection();
  }
};

const getGradientStyle = computed(() => {
  const degrees = (progress_percent.value * 3.6); // 100% = 360도
  return {
    background: `
    conic-gradient(
      from 0deg,
      #0D6BFF 0deg ${degrees}deg,
      #D9D9D9 ${degrees}deg 360deg
    )`
  };
});

onUnmounted(() => {
  closeConnection();
});
</script>

<template>
  <div class="progress-container">
    <div class="circle-container">
      <div class="circle" :style="getGradientStyle">
        <div class="inner-circle"></div>
      </div>
      <div class="progress-text">{{ Math.round(progress_percent, 2) }}%</div>
    </div>
    <div class="button-container">
      <div class="select-text">
        <img src="@/assets/imgs/admin/calendar-icon.png" alt="calendar"/>
        연월 선택
      </div>
      <div class="select-container">
        <select v-model="year" class="select-form">
          <option
            v-for="year in [2020, 2021, 2022, 2023, 2024]"
            :key="year"
            :value="year"
          >
            {{ year }}
          </option>
        </select>
        <select v-model="month" class="select-form">
          <option 
            v-for="month in 12" 
            :key="month" 
            :value="month.toString().padStart(2, '0')"
          >
            {{ month.toString().padStart(2, '0') }}
          </option>
        </select>
      </div>
      <button @click="startSseConnection" class="button">데이터 가져오기</button>
    </div>
  </div>
</template>

<style scoped>
.progress-container {
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.circle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  gap: 10px;
}

.progress-text {
  font-size: 1.5rem;
  font-weight: bold;
}

.select-text {
  display: flex;
  width: 100%;
  gap: 8px;
}

.select-text img {
  width: 1.2rem;
  height: 1.2rem;
}

.select-form {
  text-align: center;
}

.select-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: bold;
  gap: 20px;
}

.circle {
  font-size: 20px;
  width: 200px;
  height: 200px;
  display: flex;
  border-radius: 50%;
  position: relative;
  background-blend-mode: overlay;
}

.inner-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.select-container {
  display: flex;
  gap: 12px;
  align-items: center;
}

select, button {
  padding: 0 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: white;
  font-size: 14px;
  line-height: 34px;
  cursor: pointer;
  outline: none;
  height: 34px;
}

select {
  width: 100px;
  appearance: none;
}

button {
  color: white;
  background-color: #0D6BFF;
  border-color: #0D6BFF;
  transition: all 0.2s ease;
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
}

select:hover, button:hover {
  border-color: #0D6BFF;
}

button:hover {
  background-color: #FFF;
  color: #0D6BFF;
}
</style>