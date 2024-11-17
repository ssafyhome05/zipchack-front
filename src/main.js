import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue';
import router from './router';

// libs
import VueCookies from 'vue-cookies';
import VueSonner from 'vue-sonner';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "bootstrap"

// components
import { addComponents } from '@/assets/resources/configs/components';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// regist components
addComponents(app);

// regist libs
app.use(VueCookies); // vue-cookies
app.use(VueSonner); // vue-sonner

app.use(pinia); // regist pinia
app.use(router); // regist router

app.mount('#app');
