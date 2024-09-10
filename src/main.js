import { createApp, reactive } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router/index.js';
import '@/assets/normalize.css';
import 'element-plus/dist/index.css';
import './style.css';
import ElementPlus from 'element-plus';
import App from './App.vue';

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
  .use(router)
  .use(pinia)
  .use(ElementPlus, { size: state.size });

app.mount('#app');

// Используем watchEffect для динамического обновления ElementPlus при изменении размера
import { watchEffect } from 'vue';

watchEffect(() => {
  app.use(ElementPlus, { size: state.size });
});
