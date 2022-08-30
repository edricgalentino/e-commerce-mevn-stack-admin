<script>
// import { API } from "@/api";
import { API } from "../api";
export default {
    name: "Topbar",
    components: {},
    data() {
        return {
            user: [],
            isMenuOpen: false,
        };
    },
    async mounted() {
        await this.getUser();
    },
    methods: {
        handleLogout() {
            localStorage.removeItem("token");
            this.$router.push("/login");
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        async getUser() {
            const token = localStorage.getItem("token");
            const response = await API.get(`/user/find/${token}`)
                .then((response) => {
                    this.user = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
<template>
    <div>
        <nav class="flex border-b-2 border-slate-200 fixed z-20 bg-white w-full h-14 justify-between items-center p-5 px-10">
            <div class="logo">
                <h1 class="font-bold text-2xl text-indigo-600">Shoppie Admin</h1>
            </div>
            <div class="user-nav h-full flex gap-3 items-center">
                <div class="hover:bg-slate-200 w-full p-2 items-center cursor-pointer justify-center flex transition-all hover:rounded-full">
                    <fa :icon="['fas', 'bell']" class="w-5 h-full text-indigo-800" />
                </div>
                <div class="hover:bg-slate-200 w-full p-2 items-center cursor-pointer justify-center flex transition-all hover:rounded-full">
                    <fa :icon="['fas', 'envelope']" class="w-5 h-full text-indigo-800" />
                </div>
                <div class="hover:bg-slate-200 p-2 items-center cursor-pointer justify-center flex transition-all hover:rounded-full">
                    <!-- <div :class="isMenuOpen ? 'flex mt-40 transition-all' : 'hidden mb-16 transition-all'" class="flex-col transition-all justify-center items-center absolute rounded-xl border-4 shadow-xl right-10 w-40 h-24 bg-white"></div> -->
                    <div class="dropdown dropdown-end">
                        <label tabindex="0" class="flex justify-center items-center px-2 gap-4">
                            <div class="avatar online">
                                <div class="w-7 rounded-full">
                                    <img :src="user.img?.data?.filename !== undefined ? `http://localhost:5000/user/image/${user.img.data.filename}` : 'https://placeimg.com/192/192/people'" alt="" />
                                </div>
                            </div>
                            <h1 class="text-md font-semibold">{{ user.username }}</h1>
                        </label>
                        <ul tabindex="0" class="dropdown-content menu shadow-xl mt-5 border-4 bg-base-100 rounded-box w-52">
                            <li>
                                <a class="w-full h-full flex justify-center items-center gap-3 rounded-t-box hover:bg-slate-200">
                                    <!-- <AiOutlineUser /> -->
                                    <h1 class="text-md font-semibold">Profile</h1>
                                </a>
                            </li>
                            <li>
                                <a @click="handleLogout()" class="w-full h-full flex justify-center items-center gap-3 rounded-b-box hover:bg-slate-200">
                                    <!-- <AiOutlinePoweroff /> -->
                                    <h1 class="text-md font-semibold">Logout</h1>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
