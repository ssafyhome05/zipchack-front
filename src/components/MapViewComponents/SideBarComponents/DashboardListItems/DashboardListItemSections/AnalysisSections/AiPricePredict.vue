<template>
  <div class="chat-component">
    <!-- 채팅 로그 -->
    <div class="chat-logs">
      <div
        v-for="(log, index) in chatLogs"
        :key="index"
        class="chat-message-container"
      >
        <!-- AI 메시지: 프로필 이미지 포함 -->
        <div
          v-if="log.sender === 'ai'"
          class="chat-message ai-message"
        >
          <img
            class="ai-profile"
            src="/src/assets/resources/images/zipchack-prompt.png"
            alt="AI Profile"
          />
          <p class="message-text" style="white-space: pre-line;" >{{ log.message }}</p>
        </div>

        <!-- 사용자 메시지 -->
        <div
          v-else
          class="chat-message user-message"
        >
          <p class="message-text">{{ log.message }}</p>
        </div>
      </div>
    </div>
    <p> 선택매물 : <span style="font-weight: bold; color: blue;">{{ nowHouse }}</span>
      </p>



    <!-- 텍스트 입력 필드 -->
    <div class="user-input">
      <textarea
        v-model="userInput"
        placeholder="텍스트를 입력하세요..."
        rows="3"
      ></textarea>
      <button class="send-button" @click="sendMessage">➤</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useAiStore } from "@/stores/aiStore";

export default {
  setup() {
    const aiStore = useAiStore();

    // 함께 보낼 데이터
    const budgets = ["5억 이내", "10억 이내"];
    const priorities = ["역세권", "학군", "무관"];
    const lifestyles = ["활기찬", "조용한"];
    const selectedBudget = ref(null);
      const selectedPriority = ref(null);
      const selectedLifestyle = ref(null);

      // 선택 메서드
      const selectBudget = (budget) => {
        selectedBudget.value = budget;
      };
      const selectPriority = (priority) => {
        selectedPriority.value = priority;
      };
      const selectLifestyle = (lifestyle) => {
        selectedLifestyle.value = lifestyle;
      };

      const userInput = computed(() => `${aiStore.house}의 내년 전망이 어때 ?`);
      const nowHouse = computed(()=>`${aiStore.house}`);


    // 대화 로그
    const chatLogs = ref([]);

    // 텍스트 입력 필드
    //const userInput = ref(aiStore.house+ " : 이 집 내년 전망이 어때 ?");
    
 
    // 초기 대화 추가
    onMounted(() => {
      chatLogs.value.push({
        sender: "ai",
        message: "안녕하세요! 맘에 드는 집을 착 찾을수 있게 도와드릴까요? 😊 ",
      });
      //chatLogs.value.push({ sender: "user", message: userInput.value });
    });

    // 메시지 전송 메서드
    const sendMessage = async () => {
      if (userInput.value.trim()) {
        chatLogs.value.push({ sender: "user", message: userInput.value });
      }

      const promptResourceDto = {
        nativePrompt: userInput.value || "내게 착 맞는 집 추천해줘",
        houseName: aiStore.house,
      };

      try {
        // AI 응답 요청
        await aiStore.setAiDealResponse(promptResourceDto);
        const aiMessage = aiStore.response || "죄송해요, 다시 물어봐주실래요? 헤헤 😋";

        // AI의 응답 추가
        chatLogs.value.push({ sender: "ai", message: aiMessage });
      } catch (error) {
        console.error("요청 에러:", error);
        chatLogs.value.push({
          sender: "ai",
          message: "요청 중 문제가 발생했습니다. 다시 시도해주세요.",
        });
      }

      // 입력 필드 초기화
      userInput.value = "";
    };

    return {
      chatLogs,
      userInput,
      sendMessage,

      budgets,
      priorities,
      lifestyles,

      selectedBudget,
      selectedPriority,
      selectedLifestyle,

      selectBudget,
      selectPriority,
      selectLifestyle,

      userInput,
      nowHouse

    };
  },
};
</script>

<style scoped>
.chat-component {
  flex-direction: column;
  width: 100%;
  margin: 10px;
  font-family: Arial, sans-serif;
  
}

.chat-logs {
  flex-grow: 1;
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
  max-height: calc(100vh - 150px); /* 화면에서 다른 요소를 가리지 않도록 높이 제한 */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
}

.chat-message-container {
  margin-bottom: 10px;
}

.chat-message {
  display: flex;
  align-items: center;
}

.ai-message {
  justify-content: flex-start;
}

.user-message {
  justify-content: flex-end;
}

.ai-profile {
  width: 40px;
  
  border-radius: 50%;
  margin-right: 10px;
}

.message-text {
  max-width: 60%;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.4;
}

.user-message .message-text {
  background-color: #007bff;
  color: #fff;
  border-radius: 10px 10px 0 10px;
}

.ai-message .message-text {
  background-color: #f1f0f0;
  color: #333;
  border-radius: 10px 10px 10px 0;
}

.user-input {
  display: flex;
  align-items: center;
}

textarea {
  flex-grow: 1;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
}

.send-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-left: 10px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #0056b3;
}



</style>
