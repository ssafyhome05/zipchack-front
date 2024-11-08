<template>
    <Toaster position="top-center" z-index="1000" richColors closeButton :toastOptions="{
      style: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    }" />
</template>

<script setup>
    import { Toaster } from 'vue-sonner';
</script>