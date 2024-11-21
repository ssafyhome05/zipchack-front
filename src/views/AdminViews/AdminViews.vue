<template>
  <header></header>
  <div class="admin-wrap">
    <AdminSidebarComponent />
    <router-view />
  </div>
</template>

<script setup>
import AdminSidebarComponent from '@/components/adminComponents/AdminSidebarComponent.vue';
</script>

<style scoped>
header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 84px;
  background-color: #fff;
  z-index: 2;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.admin-wrap {
  background-color: #fff;
  display: flex;
}

.admin-wrap > :nth-child(2) {
  margin-left: 20vw;
  margin-top: 84px;
  flex: 1;
}

.admin-wrap * {
  z-index: 2;
}
</style>