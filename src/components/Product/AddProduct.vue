<script>
import { API } from "../../api";
import UploadService from "../../service/UploadFilesService";
export default {
    data() {
        return {
            error: "",
            form: {
                name: "",
                price: 0,
                stock: 0,
                description: "",
                img: "https://placeimg.com/192/192/people",
                category: [],
                size: [],
                color: [],
            },
            querySearchInput: "",
            isLoading: false,
            selectedId: null,
            isProductFound: true,
            colorOptions: [
                { value: "white", label: "White" },
                { value: "black", label: "Black" },
                { value: "green", label: "Green" },
                { value: "red", label: "Red" },
                { value: "blue", label: "Blue" },
                { value: "yellow", label: "Yellow" },
            ],
            sizeOptions: [
                { value: "XS", label: "XS" },
                { value: "S", label: "S" },
                { value: "M", label: "M" },
                { value: "L", label: "L" },
                { value: "XL", label: "XL" },
                { value: "XXL", label: "XXL" },
            ],
            categoryOptions: [
                { value: "men", label: "men" },
                { value: "women", label: "women" },
                { value: "bag", label: "bag" },
                { value: "shoes", label: "shoes" },
                { value: "casual", label: "casual" },
                { value: "formal", label: "formal" },
            ],
            // img uploader data
            currentImage: null,
            previewImage: null,
            progress: 0,
            isEnableToUpdate: true,
            message: "",
        };
    },
    methods: {
        selectImage() {
            this.currentImage = this.$refs.file.files.item(0);
            // this.form.img = this.currentImage;
            this.previewImage = URL.createObjectURL(this.currentImage);
            this.message = "";
        },
        async upload() {
            this.message = "Uploading, please wait...";
            this.isEnableToUpdate = false;
            await UploadService.uploadProduct(this.currentImage)
                .then((response) => {
                    this.form.img = response.data;
                    this.message = response.data.message;
                    this.isEnableToUpdate = true;
                })
                .catch((err) => {
                    this.progress = 0;
                    this.message = "Could not upload the image! " + err;
                    this.currentImage = undefined;
                });
        },
        async createProduct() {
            if (this.form.name === "") {
                return (this.error = "Name is required");
            } else if (this.form.stock === 0) {
                return (this.error = "Stock must be greater than 0");
            } else if (!+this.form.stock) {
                return (this.error = "Stock must be a number");
            } else if (this.form.price === 0) {
                return (this.error = "Price must be greater than 0");
            } else if (!+this.form.price) {
                return (this.error = "Price must be a number");
            } else if (this.form.description === "") {
                return (this.error = "Description is required");
            }
            this.error = "";
            await this.upload();
            const response = await API.post("/product/", this.form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    this.$router.push("/product-list");
                    console.log("success");
                })
                .catch((err) => {
                    console.log(err);
                    this.error = "Failed to create product";
                });
        },
    },
};
</script>
<template>
    <div class="flex flex-col w-full h-full gap-7 p-8 pb-16 bg-white">
        <div class="flex justify-between">
            <h1 class="text-start text-3xl font-semibold text-slate-800">Add a New Product</h1>
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
                        placeholder="Airpods Pro v2"
                        @change="
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
                        placeholder="50"
                        @change="
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
                        placeholder="200"
                        @change="
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
                    <v-select multiple :options="categoryOptions" taggable placeholder="Select or write new category"></v-select>
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text text-lg font-semibold"> Color <span class="text-xs ml-1 font-thin">(Choose or create a new one)</span> </span>
                    </label>
                    <v-select multiple :options="colorOptions" taggable placeholder="Select or write new color"></v-select>
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text text-lg font-semibold"> Size <span class="text-xs ml-1 font-thin">(Choose or create a new one)</span> </span>
                    </label>
                    <v-select multiple :options="sizeOptions" taggable placeholder="Select or write new size"></v-select>
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text text-lg font-semibold">Active</span>
                    </label>
                    <select class="select select-bordered">
                        <option selected>Active</option>
                        <option>Inactive</option>
                    </select>
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text text-lg font-semibold">Description</span>
                    </label>
                    <textarea
                        @change="
                            (e) => {
                                this.form.description = e.target.value;
                            }
                        "
                        class="textarea textarea-bordered h-24"
                        placeholder="The description of the product..."
                        required
                    ></textarea>
                </div>
            </div>
            <div class="right-side flex w-full basis-1/2 flex-col gap-5">
                <div class="image-input bg-white border-2 rounded-lg flex w-full h-40 justify-around items-center gap-5">
                    <div class="info flex flex-col text-center">
                        <h1 class="font-semibold text-xl">Upload your new images :</h1>
                        <h1 class="font-semibold text-slate-400 text-sm mx-4">If you don't have it, relax, we keep your previous images.</h1>
                    </div>
                    <div class="container-input">
                        <div class="flex justify-center items-center w-full">
                            <label for="dropzone-file" class="flex flex-col justify-center items-center w-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                                <div v-if="previewImage" class="h-40 max-h-40 w-full flex justify-center items-center">
                                    <img class="preview my-3 w-full h-full max-h-40 object-cover rounded-lg" :src="previewImage" alt="" />
                                </div>
                                <div v-else class="flex flex-col justify-center items-center pt-5 pb-6 w-full px-12">
                                    <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                    <p class="mb-2 text-sm text-center text-gray-500 dark:text-gray-400">
                                        <span class="font-semibold">Click to upload</span>
                                    </p>
                                    <p class="text-xs text-gray-500 text-center dark:text-gray-400">PNG, JPG or JPEG (MAX. 2 mb)</p>
                                </div>
                                <input
                                    id="dropzone-file"
                                    accept="image/*"
                                    ref="file"
                                    @change="
                                        () => {
                                            selectImage();
                                        }
                                    "
                                    type="file"
                                    class="hidden"
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div v-if="message" class="alert" role="alert">
                    {{ message }}
                </div>
            </div>
        </form>
        <div v-if="error" class="alert alert-error shadow-lg">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ error }}</span>
            </div>
        </div>
        <button @click="createProduct()" type="button" class="btn bg-indigo-800 hover:bg-indigo-900 text-white -mt-3">Create product</button>
    </div>
</template>
