import {
  createMemoryHistory,
  createWebHashHistory,
  createRouter,
} from 'vue-router';

const routes = [
  {
    path: '/admin',
    component: () => import('@/layout/admin/LayoutAdmin.vue'),
    name: 'admin',
    children: [
      {
        path: '/admin/login',
        component: () => import('@/views/login/LoginPage.vue'),
        name: 'loginINADMIN',
      },
    ],
  },
  {
    path: '/jober',
    component: () => import('@/layout/jober/LayoutJober.vue'),
    name: 'main-page',
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

router.beforeEach((to, from, next) => {
  if (true) {
    next(); // Разрешить переход
  } else {
    next('/login'); // Перенаправление на другую страницу
  }
});
