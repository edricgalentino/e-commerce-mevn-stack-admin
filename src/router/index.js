import { createWebHistory, createRouter } from "vue-router";
import Home from "../Pages/Home.vue";
import Login from "../Pages/Login.vue";
import NotFound from "../Pages/NotFound.vue";
import Main from "../components/Main.vue";
import UserList from "../components/User/UserList.vue";
import AddUser from "../components/User/AddUser.vue";
import EditUser from "../components/User/EditUser.vue";
import ProductList from "../components/Product/ProductList.vue";
import AddProduct from "../components/Product/AddProduct.vue";
import EditProduct from "../components/Product/EditProduct.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/",
                component: Main,
            },
            {
                path: "user-list",
                component: UserList,
            },
            {
                path: "add-user",
                component: AddUser,
            },
            {
                path: "edit-user",
                component: EditUser,
            },
            {
                path: "product-list",
                component: ProductList,
            },
            {
                path: "add-product",
                component: AddProduct,
            },
            {
                path: "edit-product",
                component: EditProduct,
            },
        ],
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    // {
    //     path: "/auth",
    //     name: "auth",
    //     children: [
    //         {
    //             path: "login",
    //             component: Login,
    //         },
    //         {
    //             path: "logout",
    //         },
    //     ],
    // },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
