<script>
import { API } from "../../api";
export default {
    data() {
        return {
            product: [],

            form: {
                name: "",
                price: 0,
                stock: 0,
                description: "",
                img: "",
                category: [],
                size: [],
                color: [],
            },
            error: "",
            fruits: ["Mangoo", "Apple", "Orange", "Melon", "Pineapple", "Lecy", "Blueberry"],
        };
    },
    async mounted() {
        await this.fetchDetailDataProduct();
    },
    methods: {
        getIdFromUrl() {
            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
            });
            return params.id;
        },
        // get product id from url
        async fetchDetailDataProduct() {
            const res = await API.get(`/product/find/${this.getIdFromUrl()}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    this.product = response.data;
                    this.form = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async handleUpdateProduct() {
            const res = await API.put(`/product/${this.getIdFromUrl()}`, this.form, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
            })
                .then((res) => {
                    console.log("success update product");
                    this.$router.push("/product-list");
                })
                .catch((err) => {
                    console.log(err, "error update product");
                    this.error = "Failed to update product";
                });
        },
    },
};
</script>
<template>
    <div class="flex flex-col w-full h-full gap-7 p-8 pb-16 bg-white">
        <div class="flex justify-between">
            <h1 class="text-start text-3xl font-semibold text-slate-800">Edit Product</h1>
            <div class="createButton">
                <a href="/product-list" class="btn btn-active bg-indigo-800 text-white"> See Product List </a>
            </div>
        </div>
        <form class="form-add flex gap-5">
            <div class="form flex flex-col gap-3 w-full basis-1/2 bg-white rounded-lg p-6 border-2">
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text text-lg font-semibold">Title / Name</span>
                    </label>
                    <input
                        type="text"
                        :placeholder="product?.name"
                        :value="form.name"
                        @keyup="
                            (e) => {
                                this.form.name = e.target.value;
                            }
                        "
                        maxlength="60"
                        class="input input-bordered w-full"
                        required
                    />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text text-lg font-semibold">Stock</span>
                    </label>
                    <input
                        type="tel"
                        :placeholder="product?.stock"
                        :value="form.stock"
                        @keyup="
                            (e) => {
                                this.form.stock = e.target.value;
                            }
                        "
                        maxlength="5"
                        class="input input-bordered w-full"
                        required
                    />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text text-lg font-semibold">Price (in USD)</span>
                    </label>
                    <input
                        type="tel"
                        :placeholder="product?.price"
                        :value="form.price"
                        @keyup="
                            (e) => {
                                this.form.price = e.target.value;
                            }
                        "
                        maxlength="12"
                        class="input input-bordered w-full"
                        required
                    />
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text text-lg font-semibold"> Category <span class="text-xs ml-1 font-thin">(Choose or create a new one)</span> </span>
                    </label>
                    <v-select :options="fruits" taggable multiple></v-select>
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text text-lg font-semibold"> Color <span class="text-xs ml-1 font-thin">(Choose or create a new one)</span> </span>
                    </label>
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text text-lg font-semibold"> Size <span class="text-xs ml-1 font-thin">(Choose or create a new one)</span> </span>
                    </label>
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text text-lg font-semibold">Active</span>
                    </label>
                    <select class="select select-bordered">
                        <option value="Active" selected>Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text text-lg font-semibold">Description</span>
                    </label>
                    <textarea class="textarea textarea-bordered h-24" :placeholder="product?.description" :value="form.description" @keyup="(e) => (this.form.description = e.target.value)" required></textarea>
                </div>
            </div>
            <div class="right-side flex w-full basis-1/2 flex-col gap-5">
                <div class="detail-Product border-2 rounded-lg flex flex-col p-5 w-full justify-start items-start gap-5">
                    <h1 class="font-semibold text-xl">Product Detail</h1>
                    <div class="grid grid-cols-2 w-full">
                        <div class="w-full flex flex-col justify-start items-start p-3 gap-4">
                            <div class="flex gap-2 justify-center items-center">
                                <!-- <BiPencil /> -->
                                <h1 class="font-semibold text-lg">: {{ product?.name }}</h1>
                            </div>
                            <div class="flex gap-2 justify-center items-center">
                                <!-- <BsBoxSeam /> -->
                                <h1 class="font-semibold text-lg">: {{ product?.stock || 50 }}</h1>
                            </div>
                            <div class="flex gap-2 justify-center items-center">
                                <!-- <BiDollar /> -->
                                <h1 class="font-semibold text-lg">: {{ product?.price }}</h1>
                            </div>
                        </div>
                        <div class="w-full flex flex-col justify-start items-start p-3 gap-4">
                            <div class="flex gap-2 justify-center items-center">
                                <!-- <BiCategory /> -->
                                <h1 class="font-semibold text-lg">
                                    :
                                    <template v-for="c in product?.category" :key="c"> {{ c }}{{ c === product?.category[product?.category.length - 1] ? "" : ", " }} </template>
                                </h1>
                            </div>
                            <div class="flex gap-2 justify-center items-center">
                                <!-- <IoMdColorPalette /> -->
                                <h1 class="font-semibold text-lg">
                                    :
                                    <template v-for="c in product?.color" :key="c"> {{ c }}{{ c === product?.color[product?.color.length - 1] ? "" : ", " }} </template>
                                </h1>
                            </div>
                            <div class="flex gap-2 justify-center items-center">
                                <!-- <TbArrowBigUpLine /> -->
                                <h1 class="font-semibold text-lg">
                                    :
                                    <template v-for="c in product?.size" :key="c"> {{ c }}{{ c === product?.size[product?.size.length - 1] ? "" : ", " }} </template>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="image-input bg-white border-2 rounded-lg flex w-full h-40 justify-around items-center gap-5">
                    <div class="info flex flex-col">
                        <h1 class="font-semibold text-xl">Upload your new images :</h1>
                        <h1 class="font-semibold text-slate-400 text-sm mx-4">If you don't have it, relax, we keep your previous images.</h1>
                    </div>
                    <div class="container-input">
                        <div class="flex justify-center items-center w-full">
                            <label for="dropzone-file" class="flex flex-col justify-center items-center w-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                                <div class="flex flex-col justify-center items-center pt-5 pb-6 w-full px-12">
                                    <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span class="font-semibold">Click to upload</span>
                                    </p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG (MAX. 2 mb)</p>
                                </div>
                                <input id="dropzone-file" type="file" class="hidden" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <button type="button" class="btn bg-indigo-800 hover:bg-indigo-900 text-white -mt-3">Update product</button>
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
    </div>
</template>
