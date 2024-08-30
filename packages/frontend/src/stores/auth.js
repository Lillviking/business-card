// stores/auth.js
import { defineStore } from 'pinia';
import { login, register, getCurrentUser } from '../api/authService';
import { useUserStore } from './user';

export const useAuthStore = defineStore('auth', {
  state: () => {
    const currentUser = getCurrentUser();
    return {
      isLoggedIn: !!currentUser.token,
      userId: currentUser.id || null,
      userRole: currentUser.role || null,
      token: currentUser.token || null,
    };
  },
  actions: {
    async login(credentials) {
      try {
        const response = await login(credentials);

        this.isLoggedIn = true;
        this.userId = response.id;
        this.userRole = response.role;
        this.token = response.token;

        // Uppdatera userStore med inloggad användare
        const userStore = useUserStore();
        await userStore.fetchUserProfile(response.id);

        return response;
      } catch (error) {
        this.isLoggedIn = false;
        this.userId = null;
        this.userRole = null;
        this.token = null;
        throw error;
      }
    },
    async register(userData) {
      const response = await register(userData);
      return response.data;
    },
    logout() {
      this.isLoggedIn = false;
      this.userId = null;
      this.userRole = null;
      this.token = null;
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      localStorage.removeItem('token');
    }
  },
  getters: {
    isAdmin: (state) => state.userRole === 'admin', // Getter för att kontrollera om användaren är admin
  },
});
