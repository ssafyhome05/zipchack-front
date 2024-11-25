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
  import axios from "axios";
  
  export default {
    name: "ChatComponent",
    setup() {
      // AI 답변 및 텍스트 입력
      const aiResponse = ref(
        "안녕하세요! 😊 맘에 드는 집을 착 찾을수 있게 도와드릴까요? _"
      );
      const userInput = ref("내년 동향 예측해줘");
  
      // 메시지 전송 메서드
      const sendMessage = async () => {
        const requestData = {
          nativePrompt: userInput.value || "내년 동향 예측해줘",
          promptVariables: [],
        };
  
        try {
          // API 요청 전송
          const response = await axios.post(
            "http://127.0.0.1:8080/api/ai/house",
            requestData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("응답 결과:", response.data);
          aiResponse.value = "추천 결과를 받았습니다! 🎉";
        } catch (error) {
          console.error("API 요청 실패:", error);
          aiResponse.value = "요청 중 문제가 발생했습니다. 다시 시도해주세요.";
        }
  
        // 입력 필드 초기화
        userInput.value = "";
      };
  
      return {
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