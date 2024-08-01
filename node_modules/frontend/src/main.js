// main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createBootstrap } from 'bootstrap-vue-next';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import './assets/styles/main.scss';
import store from './store'; // Importera din uppdaterade Vuex store
import router from './router'; // Importera router

const app = createApp(App);

const bootstrapVue = createBootstrap();

app.use(bootstrapVue);
app.use(store); // Lägg till Vuex store
app.use(router); // Lägg till router

// Förse Vuex store med tillgång till Vue-router
store.$router = router;

app.mount('#app');
