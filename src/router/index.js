import {
  createMemoryHistory,
  createWebHashHistory,
  createRouter,
} from 'vue-router';
import { useUserStore } from '@/stores/userStore.js';
import { jwtDecode } from 'jwt-decode';

// Проверка авторизации
const isAuthenticated = (userStore) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      // Декодирование токена
      const decodedToken = jwtDecode(token);
      console.log(decodedToken); // Печатает декодированную информацию из токена

      // Пример доступа к данным о пользователе
      const user = {
        login: decodedToken.login,
        role: decodedToken.role,
        _id: decodedToken._id,
      };
      userStore.setUser(user);
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  }
  return !!token; // Проверка наличия токена
};

const routes = [
  {
    path: '/',
    component: () => import('@/layout/admin/LayoutAdmin.vue'),
    name: '/',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin',
    component: () => import('@/layout/admin/LayoutAdmin.vue'),
    name: 'admin',
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/admin/test',
        component: () => import('@/components/test.vue'),
        name: 'test',
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/jober',
    component: () => import('@/layout/jober/LayoutJober.vue'),
    name: 'main-page',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    component: () => import('@/views/login/LoginPage.vue'),
    name: 'login',
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Глобальный охранник навигации
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  isAuthenticated(userStore);
  if (to.meta.requiresAuth && !isAuthenticated(userStore)) {
    // Если маршрут требует авторизации, но пользователь не авторизован
    next('/login'); // Перенаправляем на страницу входа
  } else {
    next(); // Продолжаем навигацию
  }
});
