<script>
import { API } from "../../api";
export default {
    data() {
        return {
            error: {
                message: "",
                status: false,
            },
            products: [],
            querySearchInput: "",
            isLoading: false,
            selectedId: null,
            isProductFound: true,
        };
    },
    async mounted() {
        await this.getProducts();
    },
    methods: {
        async getProducts() {
            this.isLoading = true;
            const response = await API.get("/product", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((response) => {
                    this.products = response.data;
                    this.isLoading = false;
                })
                .catch((error) => {
                    this.error.message = "Failed to get product!";
                    this.error.status = true;
                    console.log(error);
                });
        },
        async handleDelete(id) {
            const response = await API.delete(`/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((response) => {
                    this.getProducts();
                })
                .catch((err) => {
                    this.error.message = "Failed to delete product";
                    this.error.status = true;
                    console.log(err);
                });
        },
        async handleSearch(q) {
            this.isLoading = true;
            const response = await API.post(`/product/search?q=${q}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((response) => {
                    this.isLoading = false;
                    this.isProductFound = response.data.isFind;
                    if (this.isProductFound) {
                        this.products = response.data.data;
                    } else {
                        this.products = [];
                    }
                })
                .catch((err) => {
                    this.error.message = "Failed to search product";
                    this.error.status = true;
                    console.log(err);
                });
        },
    },
};
</script>
<template>
    <div class="flex flex-col w-full h-full gap-7 p-8 pb-16 bg-white">
        <div class="flex justify-between">
            <h1 class="text-start text-3xl font-semibold text-slate-800">Product List</h1>
            <div class="createButton">
                <a href="/add-product" class="btn btn-active bg-indigo-800 text-white"> Add a New Product </a>
            </div>
        </div>
        <div class="search flex justify-end">
            <div class="form-control">
                <div class="input-group">
                    <input
                        @keyup="
                            (e) => {
                                this.querySearchInput = e.target.value;
                                handleSearch(this.querySearchInput);
                            }
                        "
                        type="text"
                        placeholder="Jeans, Shirt, Denim..."
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
        <div class="list flex w-full bg-white">
            <div class="overflow-x-auto w-full font-main">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="!this.isProductFound">
                        <tr class="w-full font-semibold text-xl align-middle text-center">
                            <td colspan="7">Product not found</td>
                        </tr>
                    </tbody>
                    <tbody v-else-if="!this.isLoading">
                        <tr v-for="product in products" :key="product">
                            <td>
                                <div class="flex items-center space-x-3">
                                    <div class="avatar">
                                        <div class="mask mask-squircle w-12 h-12">
                                            <img :src="product?.img?.data?.filename !== undefined ? `http://localhost:5000/product/image/${product?.img?.data?.filename}` : product?.img" alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="font-bold">{{ product?.name }}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{{ product?.stock || 50 }}</td>
                            <td>{{ product?.status || "Active" }}</td>
                            <td>$ {{ product?.price }},00</td>
                            <th>
                                <div class="flex gap-3">
                                    <a :href="`/edit-product?id=${product?._id || product?.id}`" class="btn btn-outline btn-success btn-xs"> edit </a>
                                    <label @click="this.selectedId = product._id || product.id" for="my-modal-4" class="btn btn-outline modal-button btn-error btn-xs"> delete </label>
                                </div>
                            </th>
                            <input type="checkbox" id="my-modal-4" class="modal-toggle" />
                            <label for="my-modal-4" class="modal cursor-pointer">
                                <label class="modal-box relative" for="">
                                    <h3 class="font-bold text-xl">Are you sure want to delete this product?</h3>
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
