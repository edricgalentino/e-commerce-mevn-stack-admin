<script>
export default {
    data() {
        return {
            error: "",
            products: [],
            querySearchInput: "",
            isLoading: false,
            selectedId: null,
            isProductFound: true,

            fruits: ["Mangoo", "Apple", "Orange", "Melon", "Pineapple", "Lecy", "Blueberry"],
        };
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
                    <input type="text" placeholder="Airpods Pro v2" maxlength="60" class="input input-bordered w-full" required />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text text-lg font-semibold">Stock</span>
                    </label>
                    <input type="tel" placeholder="50" maxlength="5" class="input input-bordered w-full" required />
                </div>
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text text-lg font-semibold">Price (in USD)</span>
                    </label>
                    <input type="tel" placeholder="200" maxlength="12" class="input input-bordered w-full" required />
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text text-lg font-semibold"> Category <span class="text-xs ml-1 font-thin">(Choose or create a new one)</span> </span>
                    </label>
                    <v-select multiple :options="fruits" taggable placeholder="Select or write new category"></v-select>
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text text-lg font-semibold"> Color <span class="text-xs ml-1 font-thin">(Choose or create a new one)</span> </span>
                    </label>
                    <v-select multiple :options="fruits" taggable placeholder="Select or write new color"></v-select>
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text text-lg font-semibold"> Size <span class="text-xs ml-1 font-thin">(Choose or create a new one)</span> </span>
                    </label>
                    <v-select multiple :options="fruits" taggable placeholder="Select or write new size"></v-select>
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
                    <textarea class="textarea textarea-bordered h-24" placeholder="The description of the product..." required></textarea>
                </div>
            </div>
            <div class="image-input bg-white border-2 rounded-lg basis-1/2 flex p-5 w-full h-40 justify-around items-center gap-5">
                <h1 class="font-semibold text-xl">Upload your images :</h1>
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
        </form>
        <div v-if="error" class="alert alert-error shadow-lg">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ error }}</span>
            </div>
        </div>
        <button type="button" class="btn bg-indigo-800 hover:bg-indigo-900 text-white -mt-3">Create product</button>
    </div>
</template>
