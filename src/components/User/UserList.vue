<script>
import axios from "axios";
export default {
    data() {
        return {
            error: {
                message: "",
                status: false,
            },
            users: [],
            querySearchInput: "",
            isLoading: false,
            selectedId: null,
            isUserFound: true,
        };
    },
    async mounted() {
        await this.getUsers();
    },
    methods: {
        async getUsers() {
            this.isLoading = true;
            const response = await axios
                .get("http://localhost:5000/user", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    this.users = response.data;
                    this.isLoading = false;
                })
                .catch((error) => {
                    this.error.message = "Failed to get user!";
                    this.error.status = true;
                    console.log(error);
                });
        },
        async handleDelete(id) {
            const response = await axios
                .delete(`http://localhost:5000/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    this.getUsers();
                })
                .catch((err) => {
                    this.error.message = "Failed to delete user";
                    this.error.status = true;
                    console.log(err);
                });
        },
        async handleSearch(q) {
            this.isLoading = true;
            const response = await axios
                .post(`http://localhost:5000/user/search?q=${q}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    this.isLoading = false;
                    this.isUserFound = response.data.isFind;
                    if (this.isUserFound) {
                        this.users = response.data.data;
                    } else {
                        this.users = [];
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.error.message = "Failed to search user";
                    this.error.status = true;
                    this.isLoading = false;
                });
        },
    },
};
</script>
<template>
    <div class="flex flex-col w-full h-full gap-7 p-8 pb-16">
        <div class="flex justify-between">
            <h1 class="text-start text-3xl font-semibold text-slate-800">User List</h1>
            <div class="createButton">
                <a href="#/add-user" class="btn btn-active bg-indigo-800 text-white"> Add a New User </a>
            </div>
        </div>
        <div class="search flex justify-end">
            <div class="form-control">
                <div class="input-group">
                    <input
                        @change="
                            (e) => {
                                this.querySearchInput = e.target.value;
                                handleSearch(this.querySearchInput);
                            }
                        "
                        type="text"
                        placeholder="Anthony, James, John..."
                        class="input input-bordered"
                    />
                    <button @click="handleSearch(this.querySearchInput)" class="btn btn-square bg-indigo-800">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="list flex w-full">
            <div class="overflow-x-auto w-full font-main">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th>Profile</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="!this.isUserFound">
                        <tr class="w-full font-semibold text-xl align-middle text-center">
                            <td colspan="7">User not found</td>
                        </tr>
                    </tbody>
                    <tbody v-else-if="!this.isLoading">
                        <tr v-for="user in users" :key="user">
                            <td>
                                <div class="flex items-center space-x-3">
                                    <div class="avatar">
                                        <div class="mask mask-squircle w-12 h-12">
                                            <img
                                                :src="user.img || `https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80`"
                                                alt="Avatar Tailwind CSS Component"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="font-bold">{{ user.fullname || "User Fullname" }}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{{ user.username }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.isAdmin ? "Admin" : "User" }}</td>
                            <td>Active</td>
                            <th>
                                <div class="flex gap-3">
                                    <a :href="`#/edit-user/${user._id || user.id}`" class="btn btn-outline btn-success btn-xs"> edit </a>
                                    <label @click="this.selectedId = user._id || user.id" for="my-modal-4" class="btn btn-outline modal-button btn-error btn-xs"> delete </label>
                                </div>
                            </th>
                            <input type="checkbox" id="my-modal-4" class="modal-toggle" />
                            <label for="my-modal-4" class="modal cursor-pointer">
                                <label class="modal-box relative" for="">
                                    <h3 class="font-bold text-xl">Are you sure want to delete this user?</h3>
                                    <p class="py-2">You won't be able to revert this!</p>
                                    <div class="modal-action">
                                        <label for="my-modal-4" class="btn btn-error hover:bg-red-400"> Nay! </label>
                                        <label @click="handleDelete(selectedId)" for="my-modal-4" class="btn bg-emerald-400 border-0 text-black hover:bg-emerald-500"> Yay! </label>
                                    </div>
                                </label>
                            </label>
                        </tr>
                    </tbody>

                    <tbody v-else>
                        <tr class="w-full font-semibold text-xl align-middle text-center">
                            <td colspan="7">Loading...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
