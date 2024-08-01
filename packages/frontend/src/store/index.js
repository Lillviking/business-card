// store/index.js
import { createStore } from 'vuex';

const defaultUser = {
  id: null,
  name: 'Guest',
  email: 'guest@example.com',
  phone: 'N/A',
  employer: 'N/A',
  about: 'N/A',
  avatar: 'https://via.placeholder.com/140' // Placeholder avatar URL
};

export default createStore({
  state: {
    isLoggedIn: false,
    user: { ...defaultUser }
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    getUser: state => state.user
  },
  mutations: {
    login(state, updatedUser) {
      state.isLoggedIn = true;
      state.user = updatedUser;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = { ...defaultUser };
    },
    updateUser(state, updatedUser) {
      state.user = { ...state.user, ...updatedUser };
    }
  },
  actions: {
    login({ commit }, updatedUser) {
      commit('login', updatedUser);
    },
    logout({ commit }) {
      commit('logout');
      this.$router.push('/profile/default');
    },
    updateUser({ commit }, updatedUser) {
      commit('updateUser', updatedUser);
    }
  }
});
