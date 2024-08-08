// src/stores/user.js

import { defineStore } from 'pinia';
import { fetchUserById } from '../api/userService';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    updateUser(updatedUser) {
      this.user = { ...this.user, ...updatedUser };
    },
    async fetchUserProfile(userId) {
      try {
        const user = await fetchUserById(userId);
        this.updateUser(user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        this.user = null;
      }
    }
  },
  getters: {
    getUser: (state) => state.user
  }
});
