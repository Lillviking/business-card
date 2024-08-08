<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div>
          <label for="name">Name</label>
          <input type="text" v-model="name" required>
        </div>
        <div>
          <label for="email">Email</label>
          <input type="text" v-model="email" required>
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" v-model="password" required>
        </div>
        <div>
          <label for="role">Role</label>
          <select v-model="role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        role: 'user'
      };
    },
    methods: {
      ...mapActions('auth', ['register']),
      register() {
        this.register({ name: this.name, email: this.email, password: this.password, role: this.role }).then(() => {
          this.$router.push('/login');
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  }
  </script>
  