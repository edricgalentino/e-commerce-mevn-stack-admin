<script>
import HomeVue from "./Pages/Home.vue";
import LoginVue from "./Pages/Login.vue";

const routes = {
    "/": HomeVue,
    "/login": LoginVue,
};

export default {
    data() {
        return {
            currentPath: window.location.hash,
            token: localStorage.getItem("token"),
        };
    },
    computed: {
        currentView() {
            return routes[this.currentPath.slice(1) || "/"] || HomeVue;
        },
    },
    mounted() {
        window.addEventListener("hashchange", () => {
            // check if the route is valid
            if (this.currentPath.slice(1) || "/") {
                this.currentPath = window.location.hash;
            } else {
                alert("Route is invalid");
                // redirect to home page
                window.location.hash = "#/";
            }
        });
    },
    updated() {
        if ((this.currentPath.slice(1) !== "/login" || this.currentPath.slice(1) === "/") && !this.token) {
            window.location.hash = "/login";
        }
        if (this.currentPath.slice(1) === "/login" && this.token) {
            window.location.hash = "/";
        }
    },
};
</script>

<template>
    <div id="app" class="bg-white">
        <component :is="currentView" />
    </div>
</template>
