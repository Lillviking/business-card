// src/stores/user.js

import { defineStore } from 'pinia';
import { fetchUserById, updateUserById } from '../api/userService';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoading: false,
    error: null,
  }),
  actions: {
    async fetchUserProfile(userId) {
      this.isLoading = true;
      this.error = null;

      try {
        const user = await fetchUserById(userId);

        if (!user) {
          throw new Error('User not found');
        }
        this.user = user; // Uppdaterar den lokala användarens state

      } catch (error) {
        this.error = `Failed to fetch user profile: ${error.message}`;
        console.error('Error fetching user profile:', error);
        this.user = null;
      } finally {
        this.isLoading = false;
      }
    },

    async updateUser(updatedUser, avatarFile) {

        console.log("AVATARFILE", avatarFile)

      try {
        const updatedUserData = await updateUserById(this.user.id, updatedUser, avatarFile); // Uppdaterar användaren i backend
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
