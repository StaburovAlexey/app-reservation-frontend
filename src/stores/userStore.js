import { defineStore } from 'pinia';

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
      localStorage.removeItem('token'); // Очистка токена
      localStorage.removeItem('refreshToken'); // Очистка токена
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
