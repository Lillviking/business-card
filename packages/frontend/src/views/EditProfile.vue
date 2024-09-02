<template>
    <div class="form-container">
        <h2 class="text-center">Edit Profile</h2>
        <form @submit.prevent="saveProfile">
            <div class="form-group text-center">
                <img :src="localUser.avatar" class="profile-avatar" alt="Profile Avatar">
                <input type="file" @change="onFileChange" class="form-control-file">
            </div>
            <div class="form-group">
                <label for="name">Name</label>
                <input v-model="localUser.name" type="text" class="form-control" id="name" placeholder="Enter your name"
                    required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="localUser.email" type="email" class="form-control" id="email"
                    placeholder="Enter your email" required>
            </div>
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input v-model="localUser.phone" type="tel" class="form-control" id="phone"
                    placeholder="Enter your phone number">
            </div>
            <div class="form-group">
                <label for="employer">Employer</label>
                <input v-model="localUser.employer" type="text" class="form-control" id="employer"
                    placeholder="Enter your employer">
            </div>
            <div class="form-group">
                <label for="about">About You</label>
                <textarea v-model="localUser.about" class="form-control" id="about" rows="3"
                    placeholder="Write something about yourself"></textarea>
            </div>
            <div class="button-group">
                <button type="submit" class="btn btn-primary">Save</button>
                <button type="button" class="btn btn-secondary" @click="cancelEdit">Cancel</button>
            </div>
        </form>
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

        onMounted(() => {
            localUser.value = { ...userStore.getUser };
        });

        console.log("USER: ", user.value);
        console.log("LOCAL USER: ", localUser.value);

        const saveProfile = () => {

            const updatedUserData = { ...localUser.value };

            console.log("AvatarFile: ", localUser.value.avatarFile);
            updatedUserData.avatar = localUser.value.avatarFile;
            delete updatedUserData.avatarFile;
            
            console.log(JSON.stringify(updatedUserData));

            userStore.updateUser(updatedUserData);

            // ROUTE
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
                console.log("Selected file: ", file);
                localUser.value.avatarFile = file;
                localUser.value.avatar = URL.createObjectURL(file);
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
.form-container {
    width: 100%;
    max-width: 600px;
    /* Öka maxbredden för formuläret */
    background-color: #fafafa;
    /* Lätt transparent vit bakgrund */
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.profile-avatar {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    margin-bottom: 1rem;
}

h2 {
    margin-bottom: 2rem;
    font-size: 2rem;
    color: #333;
    text-align: center;
}

img {
    margin: 1rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.button-group {
    display: flex;
    justify-content: space-between;
}

button {
    width: 48%;
    /* Gör knapparna större */
}

input {
    font-size: 1rem;
}

label {
    color: #30363b;
    font-size: 1rem;
    font-weight: 700;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #004085;
}

.btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
}

.btn-secondary:hover {
    background-color: #5a6268;
    border-color: #545b62;
}
</style>
