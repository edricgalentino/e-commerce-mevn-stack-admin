<script>
import { API } from "../../api";
import UploadService from "../../service/UploadFilesService";
export default {
    data() {
        return {
            user: [],
            form: {
                fullname: "",
                username: "",
                password: "",
                email: "",
                phone: "",
                address: "",
                img: "https://placeimg.com/192/192/people",
                isAdmin: true,
            },
            error: "",
            // img uploader data
            currentImage: null,
            previewImage: null,
            progress: 0,
            isEnableToUpdate: true,
            message: "",
        };
    },
    async mounted() {
        await this.fetchDetailDataUser();
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
            await UploadService.upload(this.currentImage)
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
        getIdFromUrl() {
            const params = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
            });
            return params.id;
        },
        // get user id from url
        async fetchDetailDataUser() {
            const res = await API.get(`/user/find-user/${this.getIdFromUrl()}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    this.user = response.data;
                    this.form = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async handleUpdateUser() {
            await this.upload();
            const res = await API.put(`/user/${this.getIdFromUrl()}`, this.form, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
            })
                .then((res) => {
                    console.log("success update user");
                    this.$router.push("/user-list");
                })
                .catch((err) => {
                    console.log(err, "error update user");
                    this.error = err.response.data.message;
                });
        },
    },
};
</script>
<template>
    <div class="flex flex-col w-full h-full gap-7 p-8 pb-16 bg-white">
        <div class="flex justify-between">
            <h1 class="text-start text-3xl font-semibold text-slate-800">Edit User</h1>
            <div class="createButton">
                <a href="/user-list" class="btn btn-active bg-indigo-800 text-white"> See User List </a>
            </div>
        </div>
        <form class="form-add flex gap-5">
            <div class="form flex flex-col gap-3 w-full basis-1/2 bg-white rounded-lg p-6 border-2">
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text text-lg font-semibold">Full Name</span>
                    </label>
                    <input
                        type="text"
                        :placeholder="this.form?.fullname || 'Harry Maguire'"
                        :value="this.form.fullname"
                        @keyup="
                            (e) => {
                                this.form.fullname = e.target.value;
                            }
                        "
                        maxlength="60"
                        class="input input-bordered w-full"
                    />
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text text-lg font-semibold">Username</span>
                    </label>
                    <input
                        type="text"
                        :placeholder="this.form?.username"
                        :value="this.form.username"
                        @keyup="
                            (e) => {
                                this.form.username = e.target.value;
                            }
                        "
                        maxlength="20"
                        class="input input-bordered w-full"
                    />
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text text-lg font-semibold">Email</span>
                    </label>
                    <input
                        type="email"
                        :placeholder="this.form?.email"
                        :value="this.form.email"
                        @keyup="
                            (e) => {
                                this.form.email = e.target.value;
                            }
                        "
                        maxlength="20"
                        class="input input-bordered w-full"
                    />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text text-lg font-semibold">Phone</span>
                    </label>
                    <input
                        type="tel"
                        :placeholder="this.form?.phone || '+12 637287315'"
                        :value="this.form.phone"
                        @keyup="
                            (e) => {
                                this.form.phone = e.target.value;
                            }
                        "
                        maxlength="14"
                        class="input input-bordered w-full"
                    />
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text text-lg font-semibold">Address</span>
                    </label>
                    <input
                        type="text"
                        :placeholder="this.form?.address || 'Roma, Italy.'"
                        :value="this.form.address"
                        @keyup="
                            (e) => {
                                this.form.address = e.target.value;
                            }
                        "
                        maxlength="60"
                        class="input input-bordered w-full"
                    />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text text-lg font-semibold">Active</span>
                    </label>
                    <select class="select select-bordered">
                        <option value="Active" disabled selected>Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div class="form-control w-full max-w-xs mt-4 cursor-not-allowed">
                    <label class="label pointer-events-none">
                        <span class="label-text text-lg font-semibold">Admin</span>
                        <input type="checkbox" class="toggle toggle-secondary pointer-events-none" :checked="this.user?.isAdmin || false" />
                    </label>
                </div>
            </div>

            <div class="right-side flex w-full basis-1/2 flex-col gap-5">
                <div class="detail-user border-2 rounded-lg flex flex-col p-5 w-full justify-start items-start gap-5">
                    <h1 class="font-semibold text-xl">User Detail</h1>
                    <div class="grid grid-cols-2 w-full">
                        <div class="w-full flex flex-col justify-start items-start p-3 gap-4">
                            <div class="flex gap-2 justify-center items-center">
                                <!-- <BiPencil /> -->
                                <h1 class="font-semibold text-lg">: {{ this.user?.fullname || "User's Fullname" }}</h1>
                            </div>
                            <div class="flex gap-2 justify-center items-center">
                                <!-- <AiOutlineUser /> -->
                                <h1 class="font-semibold text-lg">: {{ this.user?.username }}</h1>
                            </div>
                            <div class="flex gap-2 justify-center items-center">
                                <!-- <FiMail /> -->
                                <h1 class="font-semibold text-lg">: {{ this.user?.email }}</h1>
                            </div>
                        </div>
                        <div class="w-full flex flex-col justify-start items-start p-3 gap-4">
                            <div class="flex gap-2 justify-center items-center">
                                <!-- <IoPhonePortraitOutline /> -->
                                <h1 class="font-semibold text-lg">: {{ this.user?.phone || "User's Phone" }}</h1>
                            </div>
                            <div class="flex gap-2 justify-center items-center">
                                <!-- <GrHomeRounded /> -->
                                <h1 class="font-semibold text-lg">: {{ this.user?.address || "User's Address" }}</h1>
                            </div>
                            <div class="flex gap-2 justify-center items-center">
                                <!-- <FaUserCheck /> -->
                                <h1 class="font-semibold text-lg">: {{ `${this.user?.isAdmin ? "Admin" : "User"}` || "User Role" }}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="image-input bg-white border-2 rounded-lg flex w-full h-40 justify-around items-center gap-5">
                    <div class="info flex flex-col text-center">
                        <h1 class="font-semibold text-xl">Upload your new images :</h1>
                        <h1 class="font-semibold text-slate-400 text-sm mx-4">If you don't have it, relax, we keep your previous images.</h1>
                    </div>
                    <div class="container-input">
                        <div class="flex justify-center items-center w-full my-3">
                            <label for="dropzone-file" class="flex flex-col justify-center items-center w-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                                <div v-if="user.img?.data?.filename ? `http://localhost:5000/user/image/${user.img?.data?.filename}` : previewImage" class="h-40 max-h-40 w-full flex justify-center items-center">
                                    <img class="preview my-3 w-full h-full max-h-40 object-cover rounded-lg" :src="user.img?.data?.filename ? `http://localhost:5000/user/image/${user.img?.data?.filename}` : previewImage" alt="" />
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
                <div v-if="message" class="alert alert-secondary" role="alert">
                    {{ message }}
                </div>
            </div>
        </form>
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
        <div v-bind="isEnableToUpdate" :class="`${!isEnableToUpdate ? 'cursor-not-allowed' : ''} w-full h-full`">
            <button @click="handleUpdateUser()" type="button" v-bind="isEnableToUpdate" :class="`${!isEnableToUpdate ? 'pointer-events-none' : ''} btn bg-indigo-800 w-full h-full hover:bg-indigo-900 text-white`">Update user</button>
        </div>
    </div>
</template>
