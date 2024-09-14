import { defineStore } from 'pinia';
import { logoutUser } from '@/api/index.js';
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    logout() {
      this.user = null;
      logoutUser();
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
