<template>
    <div class="col-md-8" v-if="user">
      <div class="profile-content d-flex align-items-center justify-content-between">
        <div class="profile-text">
          <div class="profile-image">
          <img :src="user.avatar" alt="Avatar" class="rounded-circle" width="140" height="140">
        </div>
          <h1 class="card-title">{{ user.name }}</h1>
          <p class="card-text"><strong>Email:</strong> {{ user.email }}</p>
          <p class="card-text"><strong>Phone:</strong> {{ user.phone }}</p>
          <p class="card-text"><strong>Employer:</strong> {{ user.employer }}</p>
          <p class="card-text"><strong>About:</strong> {{ user.about }}</p>
          <button v-if="isLoggedIn" @click="goToEdit" class="btn btn-primary mt-4">Edit Profile</button>
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
    const user = computed(() => userStore.getUser);

    const goToEdit = () => {
      if (user.value) {
        router.push(`/edit-profile/${user.value.id}`);
      }
    };

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
      goToEdit,
    };
  }
}
</script>

<style scoped>

.profile-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%; /* Gör att innehållet tar upp hela kolumnens bredd */
  text-align: center;
}

.profile-image {
  margin-bottom: 4rem;
}

h1 {
  margin-bottom: 1.5rem; /* Justera detta värde för att lägga till eller minska avståndet */
  font-size: 2.5rem;
}

button {
  margin-top: 1.5rem;
}
</style>
