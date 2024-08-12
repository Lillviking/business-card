// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Profile from '../views/UserProfile.vue';
import EditProfile from '../views/EditProfile.vue';
import Login from '../views/LoginUser.vue';
import Admin from '../components/AdminRegisterUser.vue';
import { useAuthStore } from '../stores/auth';
import Home from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile/:id',
    name: 'ProfileById',
    component: Profile,
    props: true
  },
  {
    path: '/edit-profile/:id',
    name: 'EditProfile',
    component: EditProfile,
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true, requiresAdmin: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const loggedIn = authStore.$state.isLoggedIn;
  const user = authStore.$state.user;

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else if (to.matched.some(record => record.meta.requiresAdmin) && (!loggedIn || user.role !== 'admin')) {
    next('/');
  } else {
    next();
  }
});

export default router;
