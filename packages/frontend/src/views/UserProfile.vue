<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center">Profile</h2>
        <div class="card">
          <div class="card-body text-center">
            <img :src="user.avatar" class="rounded-circle mb-3" alt="Profile Avatar" width="140" height="140">
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
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserProfile',
  computed: {
    ...mapGetters(['getUser', 'isLoggedIn']),
    user() {
      return this.getUser;
    }
  },
  methods: {
    goToEdit() {
      this.$router.push(`/profile/${this.user.id}/edit`);
    }
  }
}
</script>

<style scoped>
/* Lägg till eventuell CSS här om det behövs */
</style>
