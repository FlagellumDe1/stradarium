import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Router from "./router";
import PrimeVue from "primevue/config";
import Aura from '@primeuix/themes/aura';
import { ToastService } from "primevue";

createApp(App)
    .use(Router)
    .use(PrimeVue, {
        theme: {
            preset: Aura,
        }
    })
    .use(ToastService)
    .mount('#app')
