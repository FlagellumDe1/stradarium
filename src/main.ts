import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Router from "./router";
import PrimeVue from "primevue/config";

createApp(App)
    .use(Router)
    .use(PrimeVue)
    .mount('#app')
