<script>
import { API } from "../api";

export default {
    data() {
        return {
            username: "",
            password: "",
            error: "",
        };
    },
    methods: {
        // handle login method
        async handleLogin() {
            if (this.username === "") {
                return (this.error = "Username is required");
            } else if (this.password === "") {
                return (this.error = "Password is required");
            } else if (this.username.length > 20) {
                return (this.error = "Username is too long");
            } else if (this.password.length < 8) {
                return (this.error = "Password must be at least 8 characters");
            }
            this.error = "";

            await API.post("/auth/login", {
                username: this.username,
                password: this.password,
            })
                .then((response) => {
                    // save token to local storage
                    localStorage.setItem("token", response.data.accessToken);
                    // redirect to home page
                    this.$router.push("/");
                })
                .catch((error) => {
                    this.error = error.response.data?.message;
                    console.log(error);
                    return error;
                });
        },
    },
};
</script>
<template>
    <div class="flex w-full h-screen justify-center items-center bg-indigo-100">
        <div class="flex flex-col items-center gap-7 w-1/3 p-5 border-4 bg-white shadow-xl rounded-xl">
            <h1 class="text-3xl font-semibold">Login</h1>
            <form class="form flex flex-col gap-5 w-full">
                <div class="form-control w-full">
                    <input type="email" placeholder="Username" v-model="username" class="input input-bordered w-full" />
                </div>
                <div class="form-control w-full">
                    <input @change="handleLogin()" type="password" placeholder="Password" v-model="password" class="input input-bordered w-full" />
                </div>
                <button type="button" @click="handleLogin()" class="btn bg-indigo-800 hover:bg-indigo-900 text-white">Login</button>
                <div v-if="error">
                    <div class="alert alert-error shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{{ error }}</span>
                        </div>
                    </div>
                </div>
                <!-- <div class="flex flex-col items-start gap-3">
                    <a href="/" class="text-lg underline"> Forgot your password? </a>
                </div> -->
            </form>
        </div>
    </div>
</template>
