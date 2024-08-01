<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    async login() {
      try {
        // Här kan du lägga till din inloggningslogik (ex. API-anrop)
        const user = { email: this.email }; // Anta att du får användardata från API-anropet
        this.login(user);
        this.$router.push(this.$route.query.redirect || '/');
      } catch (error) {
        console.error("Login failed", error);
      }
    }
  }
};
</script>
