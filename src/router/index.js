import { createRouter, createWebHistory } from 'vue-router'
import PlatformView from '@/views/PlatformView.vue';
import WelcomeView from '@/views/PlatformViews/WelcomeView.vue';
import MapView from '@/views/PlatformViews/MapView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'platform',
      component: PlatformView,
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView,
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
    },
  ],
})

export default router
