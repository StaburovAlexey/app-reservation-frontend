import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router/index.js';
const pinia = createPinia();
import './style.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';

createApp(App).use(router).use(ElementPlus).use(pinia).mount('#app');
