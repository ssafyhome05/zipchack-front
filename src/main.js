import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// libs
import VueCookies from 'vue-cookies';
import VueSonner from 'vue-sonner';

// components
import { addComponents } from '@/assets/resources/configs/components';

const app = createApp(App);

// regist components
addComponents(app);

// regist libs
app.use(VueCookies); // vue-cookies
app.use(VueSonner); // vue-sonner

app.use(createPinia()); // regist pinia
app.use(router); // regist router

app.mount('#app');
