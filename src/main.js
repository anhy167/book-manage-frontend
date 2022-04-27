import { createApp } from 'vue';
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/sweetalert2/dist/sweetalert2.all";
import router from "./router";

createApp(App).use(router).mount("#app");