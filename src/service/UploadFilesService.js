import { API } from "../api";
class UploadFilesService {
    upload(file) {
        let formData = new FormData();
        formData.append("file", file);
        return API.post("/user/profile-pict", formData, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
            },
        });
    }
}
export default new UploadFilesService();
