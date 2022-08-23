<script>
import Topbar from "../components/Topbar.vue";
import Sidebar from "../components/Sidebar.vue";
import MainVue from "../components/Main.vue";
import AddUserVue from "../components/User/AddUser.vue";
import EditUserVue from "../components/User/EditUser.vue";
import UserListVue from "../components/User/UserList.vue";
import AddProductVue from "../components/Product/AddProduct.vue";
import EditProductVue from "../components/Product/EditProduct.vue";
import ProductListVue from "../components/Product/ProductList.vue";
import NotFoundVue from "../Pages/NotFound.vue";

const routes = {
    "/": MainVue,
    "/user-list": UserListVue,
    "/add-user": AddUserVue,
    "/edit-user/:id": EditUserVue,
    "/add-product": AddProductVue,
    "/edit-product/:id": EditProductVue,
    "/product-list": ProductListVue,
};

export default {
    components: {
        Topbar,
        Sidebar,
    },
    data() {
        return {
            isRouterValid: true,
            currentPath: window.location.hash,
            content: [
                {
                    title: "dashboard",
                    contents: [
                        {
                            title: "home",
                            icon: "box",
                            link: "#/",
                        },
                        {
                            title: "analytics",
                            icon: "arrow-trend-up",
                            link: "#/analytics",
                        },
                        {
                            title: "sales",
                            icon: "chart-line",
                            link: "#/sales",
                        },
                    ],
                },
                {
                    title: "menu",
                    contents: [
                        {
                            title: "users",
                            icon: "user",
                            link: "#/user-list",
                        },
                        {
                            title: "products",
                            icon: "store",
                            link: "#/product-list",
                        },
                        {
                            title: "transactions",
                            icon: "usd",
                            link: "#/transactions",
                        },
                        {
                            title: "reports",
                            icon: "chart-simple",
                            link: "#/reports",
                        },
                    ],
                },
                {
                    title: "notifications",
                    contents: [
                        {
                            title: "mail",
                            icon: "envelope",
                            link: "#/mail",
                        },
                        {
                            title: "feedback",
                            icon: "layer-group",
                            link: "#/feedback",
                        },
                        {
                            title: "messages",
                            icon: "message",
                            link: "#/messages",
                        },
                    ],
                },
                {
                    title: "staff",
                    contents: [
                        {
                            title: "manage",
                            icon: "briefcase",
                            link: "#/manage",
                        },
                        {
                            title: "analytics",
                            icon: "arrow-trend-up",
                            link: "#/analytics",
                        },
                        {
                            title: "reports",
                            icon: "circle-exclamation",
                            link: "#/reports",
                        },
                    ],
                },
            ],
        };
    },
    async updated() {
        const checkRouter = () => {
            for (let key in routes) {
                if (this.currentPath.slice(1) === key) {
                    return (this.isRouterValid = true);
                }
            }
            return (this.isRouterValid = false);
        };
        checkRouter();
    },
    computed: {
        currentView() {
            return routes[this.currentPath.slice(1) || "/"] || NotFoundVue;
        },
    },
    mounted() {
        window.addEventListener("hashchange", () => {
            this.currentPath = window.location.hash;
        });
        const checkRouter = () => {
            for (let key in routes) {
                if (this.currentPath.slice(1) === key) {
                    return (this.isRouterValid = true);
                }
            }
            return (this.isRouterValid = false);
        };
        checkRouter();
    },
};
</script>

<template>
    <div v-if="this.isRouterValid">
        <Topbar />
        <div class="bg-lime-100 h-full fixed z-10">
            <div class="flex flex-col justify-start text-start capitalize gap-2 border-r-2 bg-white border-slate-200 h-screen pt-16 w-1/5 fixed p-5">
                <div v-for="c in content" :key="c" class="flex flex-col justify-start text-start capitalize gap-2">
                    <h1 class="text-slate-400 font-semibold mt-2 text-md">{{ c.title }}</h1>
                    <ul v-for="a in c.contents" :key="a" class="flex flex-col gap-1">
                        <a :href="a.link" class="text-slate-800 ml-2 px-1 pl-2 rounded-full text-lg flex justify-start gap-2 items-center hover:bg-indigo-100 capitalize">
                            <fa :icon="['fas', a.icon]" class="text-indigo-700" /> {{ a.title }}
                        </a>
                    </ul>
                </div>
            </div>
        </div>
        <div class="flex w-full h-full pt-[56px] justify-end">
            <div class="w-4/5 min-h-screen items-center relative flex justify-center">
                <component :is="currentView" />
            </div>
        </div>
    </div>
    <div v-else>
        <div class="w-full h-full bg-white">
            <component :is="currentView" />
        </div>
    </div>
</template>
