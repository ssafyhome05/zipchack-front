import PlatformView from '@/views/PlatformView.vue';
import HomeView from '@/views/PlatformViews/HomeView.vue';
import MapView from '@/views/PlatformViews/MapView.vue';
import NavigationComponent from '@/components/HomeViewComponents/NavigationComponent.vue';

// common


export function addComponents(app) {
  app.component('PlatformView', PlatformView);
  app.component('HomeView', HomeView);
  app.component('MapView', MapView);
  app.component('NavigationComponent', NavigationComponent);
}