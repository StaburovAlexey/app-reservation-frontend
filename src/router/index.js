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
      role: ['admin'],
    },
  },
  {
    path: '/admin',
    component: () => import('@/layout/admin/LayoutAdmin.vue'),
    name: 'admin',
    meta: {
      title: 'Главная',
      requiresAuth: true,
      parent: true,
      role: ['admin'],
    },
    children: [
      {
        path: '/admin/users-list',
        component: () => import('@/views/usersList/UsersList.vue'),
        name: 'userslist',
        meta: {
          title: 'Список пользователей',
          requiresAuth: true,
          role: ['admin'],
          icon: 'List',
        },
        children: [
          {
            path: '/admin/users-list',
            component: () => import('@/views/usersList/UsersList.vue'),
            name: 'userslist1',
            meta: {
              title: 'Список пользователей',
              requiresAuth: true,
              role: ['admin'],
              icon: 'List',
            },
          },
        ],
      },
      {
        path: '/admin/reservation-list',
        component: () =>
          import('@/views/listOfReservations/ListOfReservations.vue'),
        name: 'listofreservation',
        meta: {
          title: 'Список резервов',
          requiresAuth: true,
          role: ['admin'],
          icon: 'List',
        },
      },
      {
        path: '/admin/test',
        component: () => import('@/components/test.vue'),
        name: 'test',
        meta: {
          title: 'Тестовая',
          requiresAuth: true,
          role: ['admin'],
          icon: 'Promotion',
        },
      },
    ],
  },
  {
    path: '/jober',
    component: () => import('@/layout/jober/LayoutJober.vue'),
    name: 'main-page',
    meta: {
      title: 'Главная',
      requiresAuth: true,
      parent: true,
      role: ['jober'],
    },
    children: [
      {
        path: '/jober',
        component: () => import('@/layout/jober/LayoutJober.vue'),
        name: 'main-page1',
        meta: {
          title: 'Главная',
          requiresAuth: true,
          role: ['jober'],
        },
      },
      {
        path: '/jober',
        component: () => import('@/layout/jober/LayoutJober.vue'),
        name: 'main-page2',
        meta: {
          title: 'Главная',
          requiresAuth: true,
          role: ['jober'],
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/LoginPage.vue'),
    name: 'login',
    meta: {
      hidden: true,
    },
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
