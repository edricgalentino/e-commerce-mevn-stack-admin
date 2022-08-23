<script>
export default {
    name: "Topbar",
    components: {},
    data() {
        return {
            user: {
                username: "",
            },
            isMenuOpen: false,
        };
    },
    methods: {
        handleLogout() {
            localStorage.removeItem("token");
            window.location.hash = "/login";
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
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
                    <div class="flex justify-center items-center gap-4" @click="toggleMenu">
                        <div class="avatar online">
                            <div class="w-9 rounded-full">
                                <img src="https://placeimg.com/192/192/people" alt="" />
                            </div>
                        </div>
                        <!-- {/* <h1 class="text-lg font-semibold">{user.user.username}</h1> */} -->
                        <!-- <RiArrowDropDownLine /> -->
                    </div>
                    <div :class="isMenuOpen ? 'flex mt-40 transition-all' : 'hidden mb-16 transition-all'" class="flex-col transition-all justify-center items-center absolute rounded-xl border-4 shadow-xl right-10 w-40 h-24 bg-white">
                        <div class="w-full h-full flex justify-center items-center gap-3 rounded-t-lg hover:bg-slate-200">
                            <!-- <AiOutlineUser /> -->
                            <h1 class="text-md font-semibold">Profile</h1>
                        </div>
                        <div @click="handleLogout()" class="w-full h-full flex justify-center items-center gap-3 rounded-b-lg hover:bg-slate-200">
                            <!-- <AiOutlinePoweroff /> -->
                            <h1 class="text-md font-semibold">Logout</h1>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
