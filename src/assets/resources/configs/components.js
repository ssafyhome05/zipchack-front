import PlatformView from '@/views/PlatformView.vue';
import WelcomeView from '@/views/PlatformViews/WelcomeView.vue';
import MapView from '@/views/PlatformViews/MapView.vue';
import NavigationComponent from '@/components/HomeViewComponents/Navigation.vue';
import LoginModalComponent from '@/components/HomeViewComponents/NavigationComponents/LoginModal.vue';
import RegistModalComponent from '@/components/HomeViewComponents/NavigationComponents/RegistModal.vue';
import KakaoMap from '@/components/MapViewComponents/KakaoMap.vue';
// common


export function addComponents(app) {
  app.component('PlatformView', PlatformView);
  app.component('WelcomeView', WelcomeView);
  app.component('MapView', MapView);
  app.component('NavigationComponent', NavigationComponent);
  app.component('LoginModalComponent', LoginModalComponent);
  app.component('RegistModalComponent', RegistModalComponent);
  app.component('KakaoMap', KakaoMap);
}
