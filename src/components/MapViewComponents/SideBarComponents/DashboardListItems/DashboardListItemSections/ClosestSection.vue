<template>
    <div>
    <div class="card">
      <h3>와 가장 가까운 아파트는?</h3>
      <slot></slot>
    </div>
</div>
  </template>
  
  <script setup>

  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .card h3 {
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: bold;
  }
  </style>