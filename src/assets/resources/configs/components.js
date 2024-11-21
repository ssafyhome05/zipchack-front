import PlatformView from '@/views/PlatformView.vue';
import WelcomeView from '@/views/PlatformViews/WelcomeView.vue';
import MapView from '@/views/PlatformViews/MapView.vue';
import NavigationComponent from '@/components/HomeViewComponents/Navigation.vue';
import LoginModalComponent from '@/components/HomeViewComponents/NavigationComponents/LoginModal.vue';
import RegistModalComponent from '@/components/HomeViewComponents/NavigationComponents/RegistModal.vue';
import KakaoMap from '@/components/MapViewComponents/KakaoMap.vue';
import SideBar from '@/components/MapViewComponents/SideBar.vue';
import MainList from '@/components/MapViewComponents/SideBarComponents/MainList.vue';
import HouseInfoList from '@/components/MapViewComponents/SideBarComponents/HouseInfoList.vue';
import BookmarkList from '@/components/MapViewComponents/SideBarComponents/BookmarkList.vue';
import SidoModal from '@/components/common/SidoModal.vue';
import GugunModal from '@/components/common/GugunModal.vue';
import DongModal from '@/components/common/DongModal.vue';
import HouseInfoListItem from '@/components/MapViewComponents/SideBarComponents/HouseInfoListItems/HouseInfoListItem.vue';
import HouseDetail from '@/components/MapViewComponents/SideBarComponents/HouseInfoListItems/HouseDetail.vue';
import HouseGraph from '@/components/MapViewComponents/SideBarComponents/HouseInfoListItems/HouseDetailItems/HouseGraph.vue';
import HouseRoute from '@/components/MapViewComponents/SideBarComponents/HouseInfoListItems/HouseDetailItems/HouseRoute.vue';
import SearchModal from '@/components/MapViewComponents/SideBarComponents/HouseInfoListItems/HouseDetailItems/SearchModal.vue';
import TransportModal from '@/components/MapViewComponents/SideBarComponents/HouseInfoListItems/HouseDetailItems/TransportModal.vue';
import RequiredLogin from '@/components/MapViewComponents/SideBarComponents/BookmarkListItems/RequiredLogin.vue';
import BookmarkListItem from '@/components/MapViewComponents/SideBarComponents/BookmarkListItems/BookmarkListItem.vue';
import DoughnutChart from '@/components/MapViewComponents/SideBarComponents/HouseInfoListItems/DoughnutChart.vue';
import CustomLocationItem from '@/components/MapViewComponents/SideBarComponents/BookmarkListItems/CustomLocationItem.vue';
// common


export function addComponents(app) {
  app.component('PlatformView', PlatformView);
  app.component('WelcomeView', WelcomeView);
  app.component('MapView', MapView);
  app.component('NavigationComponent', NavigationComponent);
  app.component('LoginModalComponent', LoginModalComponent);
  app.component('RegistModalComponent', RegistModalComponent);
  app.component('KakaoMap', KakaoMap);
  app.component('SideBar', SideBar);
  app.component('MainList', MainList);
  app.component('HouseInfoList', HouseInfoList);
  app.component('BookmarkList', BookmarkList);
  app.component('SidoModal', SidoModal);
  app.component('GugunModal', GugunModal);
  app.component('DongModal', DongModal);
  app.component('HouseInfoListItem', HouseInfoListItem);
  app.component('HouseDetail', HouseDetail);
  app.component('HouseGraph', HouseGraph);
  app.component('HouseRoute', HouseRoute);
  app.component('SearchModal', SearchModal);
  app.component('TransportModal', TransportModal);
  app.component('RequiredLogin', RequiredLogin);
  app.component('BookmarkListItem', BookmarkListItem);
  app.component('DoughnutChart', DoughnutChart);
  app.component('CustomLocationItem', CustomLocationItem);
}
