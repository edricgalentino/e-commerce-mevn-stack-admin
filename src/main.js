import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "flowbite";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

// App.use(router);

createApp(App).use(router).component("fa", FontAwesomeIcon).mount("#app");
