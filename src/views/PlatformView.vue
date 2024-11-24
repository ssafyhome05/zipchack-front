<template>
  <div class="wrap">
    <!-- Home Component -->
    <div class="container">
      <WelcomeView />
    </div>

    <!-- Map Component -->
    <div class="container">
      <MapView />
    </div>
  </div>
  
  <Toaster position="top-center" z-index="1000" richColors closeButton 
    :toastOptions="{
      style: { 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      },
    }" 
  />
</template>

<script>
import { Toaster } from 'vue-sonner';
export default {
  components: {
    Toaster
  },
}
</script>

<style>
@import '@/assets/css/PlatformView.css';
</style>
