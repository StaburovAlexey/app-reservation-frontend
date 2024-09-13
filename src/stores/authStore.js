// stores/authStore.js
import { isAuthenticated } from '@/db/index.js'; // Импортируйте функцию проверки токена
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    async checkAuth() {
      this.isAuthenticated = await isAuthenticated();
    },
    setAuthenticated(status) {
      this.isAuthenticated = status;
    },
  },
});
