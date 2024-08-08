<template>
    <div>
      <h2>Admin Dashboard</h2>
      <form @submit.prevent="registerUser">
        <div>
          <label for="name">Name</label>
          <input type="text" v-model="name" required>
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" v-model="email" required>
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" v-model="password" required>
        </div>
        <button type="submit">Register User</button>
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
        password: ''
      };
    },
    methods: {
      ...mapActions('auth', ['register']),
      registerUser() {
        this.register({ name: this.name, email: this.email, password: this.password, role: 'user' }).then(() => {
          this.name = '';
          this.email = '';
          this.password = '';
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  }
  </script>
  