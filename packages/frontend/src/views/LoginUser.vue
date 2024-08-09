<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center">Login</h2>
        <form @submit.prevent="loginUser">
          <div class="form-group">
            <label for="email">Email address</label>
            <input v-model="email" type="email" class="form-control" id="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input v-model="password" type="password" class="form-control" id="password" required>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Logga In</button>
        </form>
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref(null);
    const router = useRouter();

    const authStore = useAuthStore();

    const loginUser = async () => {
      error.value = null;
      try {
        await authStore.login({ email: email.value, password: password.value });
        router.push(`/profile/${authStore.userId}`);
      } catch (err) {
        error.value = 'Invalid email or password';
      }
    };

    return {
      email,
      password,
      error,
      loginUser
    };
  }
}
</script>

<style scoped>
/* Lägg till eventuell CSS här om det behövs */
</style>
