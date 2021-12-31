import axios from "./axios";
class ExportHtmlService {
    generateHtml = jsx =>
        new Promise((resolve, reject) => {
            //check if url is present in env.
            let url = window.location.origin + "/api/html";
            if (process.env.REACT_APP_SSR_EXPORT_HTML_URL) {
                url = process.env.REACT_APP_SSR_EXPORT_HTML_URL;
            }
            console.log(url);
            axios
                .post(url, { app: jsx }, { headers: { "Content-Type": "application/json" } })
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
}

const exportHtmlService = new ExportHtmlService();

export default exportHtmlService;
