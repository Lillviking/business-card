<template>
  <div class="container mt-5" v-if="user">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center">Profile</h2>
        <div class="card">
          <div class="card-body">
            <img :src="user.avatar" alt="Avatar" class="rounded-circle mb-3" width="140" height="140">
            <h5 class="card-title">{{ user.name }}</h5>
            <p class="card-text"><strong>Email:</strong> {{ user.email }}</p>
            <p class="card-text"><strong>Phone:</strong> {{ user.phone }}</p>
            <p class="card-text"><strong>Employer:</strong> {{ user.employer }}</p>
            <p class="card-text"><strong>About:</strong> {{ user.about }}</p>
            <button v-if="isLoggedIn" @click="goToEdit" class="btn btn-primary">Edit Profile</button>
          </div>
        </div>
        <div v-if="!isLoggedIn" class="alert alert-warning mt-3">
          Please log in to edit your profile.
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import { useUserStore } from '../stores/user';
import { computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const router = useRouter();
    const route = useRoute();

    const isLoggedIn = computed(() => authStore.isLoggedIn);
    const user = computed(() => userStore.user);

    console.log("User in userprofile: ", user.value);

    const goToEdit = () => {
      if (user.value) {
        router.push(`/edit-profile/${user.value.id}`);
      }
    };

    // Load the user profile based on the route parameter
    onMounted(async () => {
      const userId = route.params.id;
      if (userId) {
        await userStore.fetchUserProfile(userId);
      } else {
        console.error('No user ID provided in route params');
      }
    });

    return {
      isLoggedIn,
      user,
      goToEdit
    };
  }
}
</script>

<style scoped>
/* Lägg till eventuell CSS här om det behövs */
</style>
