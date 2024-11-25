<template>
    <div class="chat-component">
      <!-- AI 답변 -->
      <div class="ai-reply">
        <img
          class="ai-profile"
          src="/src/assets/resources/images/zipchack-prompt.png"
          alt="AI Profile"
        />
        <p class="ai-text">{{ aiResponse }}</p>
      </div>


      <!-- 옵션 선택 -->
      <div class="options">
        <div class="option-group">
          <p class="option-title">예산</p>
          <div class="option-buttons">
            <button
              v-for="(budget, index) in budgets"
              :key="index"
              :class="['option-button', { selected: selectedBudget === budget }]"
              @click="selectBudget(budget)"
            >
              {{ budget }}
            </button>
          </div>
        </div>
  
        <div class="option-group">
          <p class="option-title">우선순위</p>
          <div class="option-buttons">
            <button
              v-for="(priority, index) in priorities"
              :key="index"
              :class="['option-button', { selected: selectedPriority === priority }]"
              @click="selectPriority(priority)"
            >
              {{ priority }}
            </button>
          </div>
        </div>
  
        <div class="option-group">
          <p class="option-title">라이프스타일</p>
          <div class="option-buttons">
            <button
              v-for="(lifestyle, index) in lifestyles"
              :key="index"
              :class="['option-button', { selected: selectedLifestyle === lifestyle }]"
              @click="selectLifestyle(lifestyle)"
            >
              {{ lifestyle }}
            </button>
          </div>
        </div>
      </div>
  

  
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
  import { ref } from "vue";
  export default {
    name: "ChatComponent",
    setup() {
      // 옵션 데이터
      const budgets = ["5억 이내", "10억 이내"];
      const priorities = ["역세권", "학군", "무관"];
      const lifestyles = ["활기찬", "조용한"];
  
      // 선택된 값
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
  
      // AI 답변 및 텍스트 입력
      const aiResponse = ref("안녕하세요! 😊 맘에 드는 집을 착 찾을수 있게 도와드릴까요? _");
      const userInput = ref("내게 착 맞는 집 추천해줘");
  
      const sendMessage = () => {
        console.log("전송된 메시지:", userInput.value);
        userInput.value = ""; // 전송 후 입력 필드 초기화
      };
  
      return {
        budgets,
        priorities,
        lifestyles,
        selectedBudget,
        selectedPriority,
        selectedLifestyle,
        selectBudget,
        selectPriority,
        selectLifestyle,
        aiResponse,
        userInput,
        sendMessage,
      };
    },
  };
  </script>
  
  <style scoped>
  .chat-component {
    display: flex;
    flex-direction: column;
    width: 100%; /* 가로로 꽉 차게 설정 */
    margin: 10px;
    font-family: Arial, sans-serif;
  }
  
  .options {
    margin-bottom: 20px;
  }
  
  .option-group {
    margin-bottom: 15px;
  }
  
  .option-title {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 14px;
    color: #333;
  }
  
  .option-buttons {
    display: flex;
    gap: 10px;
  }
  
  .option-button {
    padding: 8px 15px;
    border-radius: 20px;
    border: 1px solid #ccc;
    background-color: #f5f5f5;
    color: #333;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .option-button:hover {
    background-color: #ddd;
  }
  
  .option-button.selected {
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
  }
  
  .ai-reply {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
  }
  
  .ai-profile {
    width: 40px;
    height: 60px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .ai-text {
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 10px;
    font-size: 14px;
    color: #333;
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
  