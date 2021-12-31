import exportHtmlService from "../api/exportHtmlService";

export async function renderHtml(craftNodes) {
    try {
        const response = await exportHtmlService.generateHtml(craftNodes);
        return response;
    } catch (err) {
        throw err;
    }
}
