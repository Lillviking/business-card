import { createRouter, createWebHistory } from 'vue-router';
import UserProfile from '@/views/UserProfile.vue'; // Ändra importen här
import EditProfile from '@/views/EditProfile.vue';
import store from '@/store'; // Assuming you have a Vuex store that handles authentication

const routes = [
  {
    path: '/',
    redirect: '/profile/default'
  },
  {
    path: '/profile/:profile_id',
    name: 'profile',
    component: UserProfile, // Använd nya komponentnamnet här
    props: route => ({ loggedIn: store.getters.isLoggedIn, profile_id: route.params.profile_id })
  },
  {
    path: '/profile/:profile_id/edit',
    name: 'edit',
    component: EditProfile,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // This route requires auth, check if logged in
    // If not, redirect to login page.
    if (!store.getters.isLoggedIn) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // always call next()!
  }
});

export default router;
