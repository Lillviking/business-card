// main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createBootstrap } from 'bootstrap-vue-next';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import './assets/styles/main.scss';
import { createPinia } from 'pinia';
import router from './router';

const app = createApp(App);
const pinia = createPinia();
const bootstrapVue = createBootstrap();

app.use(bootstrapVue);
app.use(pinia);
app.use(router);

app.mount('#app');
