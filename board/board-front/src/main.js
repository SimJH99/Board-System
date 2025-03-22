import { createApp } from 'vue'
import { createPinia } from 'pinia';
import router from './router';
import piniaPersistedState from 'pinia-plugin-persistedstate';
import './style.css'
import App from './App.vue'

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersistedState);
app.use(pinia);
app.use(router);