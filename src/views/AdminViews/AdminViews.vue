<template>
  <header class="admin-header"></header>
  <div class="admin-wrap">
    <AdminSidebarComponent />
    <router-view />
  </div>
</template>

<script setup>
import AdminSidebarComponent from '@/components/adminComponents/AdminSidebar.vue';
import './AdminViews.css';
</script>