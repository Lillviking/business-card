// services/authService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

export function login(user) {
  return axios.post(API_URL + 'login', {
    email: user.email,
    password: user.password
  }).then(response => {
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('userRole', response.data.role);
    }
    return response.data;
  });
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('userRole');
}

export function register(user) {
  return axios.post(API_URL + 'register', {
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role
  });
}

export function getCurrentUser() {
  return {
    id: localStorage.getItem('userId'),
    role: localStorage.getItem('userRole'),
    token: localStorage.getItem('token')
  };
}

export function getToken() {
  return localStorage.getItem('token');
}
