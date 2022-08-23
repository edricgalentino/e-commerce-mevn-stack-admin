import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "flowbite";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

// import { faBell, faEnvelope, faBox, faArrowTrendUp, faChartLine, faUser, faStore, faUsd, faDollarSign, faChartSimple, faLayerGroup, faMessage, faBriefcase, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
// import { faGithub } from "@fortawesome/free-brands-svg-icons";

library.add(fas);
// library.add(faBell, faEnvelope, faGithub, faBox, faArrowTrendUp, faChartLine, faUser, faStore, faUsd, faDollarSign, faChartSimple, faLayerGroup, faMessage, faBriefcase, faCircleExclamation);

createApp(App).component("fa", FontAwesomeIcon).mount("#app");
