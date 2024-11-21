<template>
  <div class="task-basic-container">
    <div class="task-info">
      <table>
        <tr class="info-row">
          <td class="label">마지막 업데이트</td>
          <td class="divider">:</td>
          <td class="value">2024년 11월 21일</td>
        </tr>
        <tr class="info-row">
          <td class="label">수정한 관리자</td>
          <td class="divider">:</td>
          <td class="value">ADMIN_03</td>
        </tr>
        <tr class="info-row">
          <td class="label">접속 IP</td>
          <td class="divider">:</td>
          <td class="value">192.168.0.1</td>
        </tr>
      </table>
    </div>
    <div class="button-container">
      <button class="button">데이터 업데이트</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.task-basic-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.task-info {
  padding: 25px 30px;
  background-color: #f8f9fa;
  border-radius: 8px;
  min-width: 400px;
}

table {
  width: 100%;
  border-spacing: 0;
}

.info-row td {
  padding: 10px 0;
  font-size: 1.1rem;
}

.label {
  color: #666;
  width: 140px;
  font-weight: 500;
}

.divider {
  color: #666;
  width: 30px;
  text-align: center;
}

.value {
  color: #333;
  padding-left: 15px;
}

button {
  padding: 8px 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: white;
  font-size: 1.3rem;
  cursor: pointer;
  outline: none;
  height: auto;
  color: white;
  background-color: #0d6bff;
  border-color: #0d6bff;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

button:hover {
  border-color: #0d6bff;
}

button:hover {
  background-color: #fff;
  color: #0d6bff;
}
</style>
