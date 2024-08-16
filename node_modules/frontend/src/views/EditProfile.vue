<template>
  <div class="centered-container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center">Edit Profile</h2>
        <form @submit.prevent="saveProfile">
          <div class="form-group mb-3 text-center">
            <img :src="localUser.avatar" class="rounded-circle mb-3" alt="Profile Avatar" width="140" height="140">
            <input type="file" @change="onFileChange" class="form-control-file">
          </div>
          <div class="form-group mb-3">
            <label for="name">Name</label>
            <input v-model="localUser.name" type="text" class="form-control" id="name" placeholder="Enter your name" required>
          </div>
          <div class="form-group mb-3">
            <label for="email">Email</label>
            <input v-model="localUser.email" type="email" class="form-control" id="email" placeholder="Enter your email" required>
          </div>
          <div class="form-group mb-3">
            <label for="phone">Phone Number</label>
            <input v-model="localUser.phone" type="tel" class="form-control" id="phone" placeholder="Enter your phone number">
          </div>
          <div class="form-group mb-3">
            <label for="employer">Employer</label>
            <input v-model="localUser.employer" type="text" class="form-control" id="employer" placeholder="Enter your employer">
          </div>
          <div class="form-group mb-3">
            <label for="about">About You</label>
            <textarea v-model="localUser.about" class="form-control" id="about" rows="3" placeholder="Write something about yourself"></textarea>
          </div>
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="button" class="btn btn-secondary" @click="cancelEdit">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';

export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const localUser = ref({});

    const user = computed(() => userStore.user);
    console.log("inside edit user: ", user)

    onMounted(() => {
      localUser.value = { ...userStore.getUser };
    });

    const saveProfile = () => {
      userStore.updateUser(localUser.value);
      if (user.value && user.value.id) {
        router.push(`/profile/${user.value.id}`);
      } else {
        console.error('User ID is null or undefined');
      }
    };

    const cancelEdit = () => {
      if (user.value && user.value.id) {
        router.push(`/profile/${user.value.id}`);
      } else {
        console.error('User ID is null or undefined');
      }
    };

    const onFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          localUser.value.avatar = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    return {
      localUser,
      saveProfile,
      cancelEdit,
      onFileChange
    };
  }
}
</script>

<style scoped>
/* Lägg till eventuell CSS här om det behövs */
</style>
