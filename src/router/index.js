import {
  createMemoryHistory,
  createWebHashHistory,
  createRouter,
} from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

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
        path: '/admin/login',
        component: () => import('@/views/login/LoginPage.vue'),
        name: 'loginINADMIN',
        meta: {
          requiresAuth: true,
        },
      },
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

// router.beforeEach(async (to, from, next) => {
//   const authStore = useAuthStore();
//   console.log(authStore.isAuthenticated);
//   // Если маршрут требует авторизации
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     // Проверяем состояние авторизации
//     if (authStore.isAuthenticated) {
//       next(); // Пользователь авторизован, разрешаем доступ
//     } else {
//       next('/login'); // Пользователь не авторизован, перенаправляем на /login
//     }
//   } else {
//     next(); // Маршрут не требует авторизации, разрешаем доступ
//   }
// });
