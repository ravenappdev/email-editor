import axios from "./axios";
class ExportImageUrl {
    generateUrl = formData => {
        formData.append("upload_preset", "kuspnbei");
        return new Promise((resolve, reject) => {
            axios
                .post("https://api.cloudinary.com/v1_1/ravenapp/image/upload/", formData)
                .then(response => {
                    if (response) {
                        resolve(response.data);
                    } else {
                        reject(response);
                    }
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    };
}

const exportImageUrl = new ExportImageUrl();

export default exportImageUrl;
