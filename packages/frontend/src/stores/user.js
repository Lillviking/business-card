// src/stores/user.js

import { defineStore } from 'pinia';
import { fetchUserById, updateUserById } from '../api/userService';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    async fetchUserProfile(userId) {
      try {
        const user = await fetchUserById(userId);
        if (!user) {
          throw new Error('User not found');
        }
        this.user = user; // Uppdaterar den lokala användarens state
      } catch (error) {
        console.error('Error fetching user profile:', error);
        this.user = null;
      }
    },
    async updateUser(updatedUser) {
      try {
        const updatedUserData = await updateUserById(this.user.id, updatedUser); // Uppdaterar användaren i backend
        this.user = { ...this.user, ...updatedUserData }; // Uppdaterar den lokala staten med svar från backend
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  },
  getters: {
    getUser: (state) => state.user
  }
});
