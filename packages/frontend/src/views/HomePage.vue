<template>
	<div id="home" class="container text-center mt-5">
		<h1 class="display-4 mb-4">Business Card</h1>
		<div class="mb-4">
			<img src="/businesscard.jpg" alt="Business Card" class="custom-img img-fluid rounded shadow-sm">
		</div>
		<div>
			<router-link v-if="!isLoggedIn" to="/login" class="btn btn-primary btn-lg">Logga In</router-link>
			<button v-if="isLoggedIn" class="btn btn-secondary btn-lg" @click="logout">Logga Ut</button>
		</div>
	</div>
</template>

<script>
import { useAuthStore } from '../stores/auth';

export default {
	setup() {
		const authStore = useAuthStore();
		return {
			isLoggedIn: authStore.$state.isLoggedIn,
			logout: authStore.logout,
		};
	},
	mounted() {
		const authStore = useAuthStore();
		console.log('isLoggedIn:', authStore.$state.isLoggedIn);
		console.log('user:', authStore.$state.user);
	}
}
</script>

<style scoped>
#home {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	color: #2c3e50;
	margin-top: 60px;
}

.custom-img {
	max-width: 300px;
	/* Mindre bildstorlek */
	height: auto;
	margin: 0 auto;
	/* Centrerar bilden */
}
</style>