<template>
  <div class="centered-container">
      <div class="col-md-6">
        <div class="card shadow-sm">
            <h2 class="text-center mb-4">Login</h2>
            <form @submit.prevent="loginUser">
              <div class="form-group mb-3">
                <label for="email" class="form-label">Email address</label>
                <input v-model="email" type="email" class="form-control" id="email" required>
              </div>
              <div class="form-group mb-4">
                <label for="password" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" id="password" required>
              </div>
              <button type="submit" class="btn btn-primary w-100">Logga In</button>
            </form>
            <div v-if="error" class="alert alert-danger mt-3 text-center">{{ error }}</div>
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
.col-md-6 {
  max-width: 400px;
  width: 100%; /* Se till att den är responsiv */
}

.card {
  padding: 2rem;
  border-radius: 8px;
  max-width: 100%;
}

h2 {
  color: #343a40;
}

.form-label {
  font-weight: bold;
  color: #495057;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}

input[type="email"], input[type="password"] {
  padding: 0.75rem;
  border-radius: 5px;
  font-size: 1rem;
}

input[type="email"]:focus, input[type="password"]:focus {
  box-shadow: none;
  border-color: #007bff;
}

</style>
