import { createRouter, createWebHistory } from 'vue-router'
import PlatformView from '@/views/PlatformView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PlatformView,
    },
  ],
})

export default router
