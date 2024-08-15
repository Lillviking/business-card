<template>
	<div id="home" class="home-container">
<!-- 		<img src="/logo.png" alt="Logo" class="footer-logo"> -->
		<h1>Polardag Business Card</h1>
		<p>Personliga visitkort gjort av aluminium</p>
		<div class="mb-4">
			<img src="/businesscard.jpg" alt="Business Card" class="custom-img img-fluid rounded shadow-sm">
		</div>
		<div>
			<router-link v-if="!isLoggedIn" to="/login" class="btn btn-primary btn-lg">Logga In</router-link>
			<button v-if="isLoggedIn" class="btn btn-secondary btn-lg" @click="logoutUser">Logga Ut</button>
		</div>
	</div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import { computed } from 'vue';

export default {
	setup() {
		const authStore = useAuthStore();

		const isLoggedIn = computed(() => authStore.isLoggedIn);

		const logoutUser = () => {
			authStore.logout();
		};

		return {
			isLoggedIn,
			logoutUser,
		};
	},
	mounted() {
		const authStore = useAuthStore();
		console.log('isLoggedIn:', authStore.isLoggedIn);
	},
}
</script>

<style scoped>
.home-container {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100vh;
	text-align: center;
}

.custom-img {
	max-width: 300px;
	height: auto;
	margin: 0 auto;
	box-shadow: 2px 2px 8px 4px rgba(255, 255, 255, 0.6) !important;
	margin-bottom: 4rem;
}

h1 {
	margin-bottom: 0.5rem;
	font-size: 4rem;
}

p {
	font-style: italic;
	font-size: 1.8rem;
	margin-bottom: 4rem;
}

.footer-logo {
  height: 10rem; /* Justera storleken på logotypen */
  width: 10rem; /* Behåll proportionerna */
  margin-bottom: 5rem;
}
</style>
