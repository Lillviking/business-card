<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <div class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav">
              <li class="nav-item" v-if="!isLoggedIn">
                <router-link to="/login" class="btn btn-primary">Logga In</router-link>
              </li>
              <li class="nav-item" v-if="isLoggedIn">
                <button class="btn btn-secondary" @click="logout">Logga Ut</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
import { useAuthStore } from './stores/auth';

export default {
  setup() {
    const authStore = useAuthStore();
    return {
      isLoggedIn: authStore.$state.isLoggedIn,
      logout: authStore.logout,
    };
  },
  mounted() {
    const authStore = useAuthStore();
    console.log('isLoggedIn:', authStore.$state.isLoggedIn);
    console.log('user:', authStore.$state.user);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
