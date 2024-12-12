// Используем watchEffect для динамического обновления ElementPlus при изменении размера
import { createApp, reactive } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router/index.js';
import '@/assets/normalize.css';
import './style.css';
import 'element-plus/dist/index.css';

import ElementPlus from 'element-plus';
import App from './App.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
console.log('~~Запускается сборка:', import.meta.env.MODE);
console.log('~~Сервер базы данных~~', import.meta.env.VITE_APP_BASE_URL);

const pinia = createPinia();

// Создаем реактивный объект для глобального размера
const state = reactive({
  size: 'default',
});

// Функция для обновления размера
const updateSize = () => {
  if (window.innerWidth <= 768) {
    state.size = 'small';
  } else if (window.innerWidth >= 1440) {
    state.size = 'large';
  } else {
    state.size = 'default';
  }
};

// Подписка на изменение размера окна
window.addEventListener('resize', updateSize);
updateSize();

// Создаем приложение и передаем глобальный размер ElementPlus
const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(ElementPlus, { size: state.size });
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// Инициализация проверки токена при загрузке приложения
app.config.globalProperties.notify = ElNotification;
app.mount('#app');
