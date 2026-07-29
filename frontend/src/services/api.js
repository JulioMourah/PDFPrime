const API_URL = "http://localhost:3000/api";

async function request(endpoint, formData) {

    const response = await fetch(`${API_URL}/${endpoint}`, {

        method: "POST",
        body: formData

    });

    if (!response.ok) {

        throw new Error(await response.text());

    }

    return await response.blob();

}

export async function imageToPdf(file) {

    const formData = new FormData();
    formData.append("image", file);

    return request("imagetopdf", formData);

}

export async function pdfToJpg(file) {

    const formData = new FormData();
    formData.append("pdf", file);

    return request("pdftojpg", formData);

}

export async function pdfToPng(file) {

    const formData = new FormData();
    formData.append("pdf", file);

    return request("pdftopng", formData);

}

export async function mergePdf(files) {

    const formData = new FormData();

    files.forEach(file => {

        formData.append("pdfs", file);

    });

    return request("mergepdf", formData);

}

export async function splitPdf(file, page) {

    const formData = new FormData();

    formData.append("pdf", file);
    formData.append("page", page);

    return request("splitpdf", formData);

}

export async function compressPdf(file) {

    const formData = new FormData();

    formData.append("pdf", file);

    return request("compresspdf", formData);

}

export async function rotatePdf(file, angle) {

    const formData = new FormData();

    formData.append("pdf", file);
    formData.append("angle", angle);

    return request("rotatepdf", formData);

}

export async function reorderPdf(file, order) {

    const formData = new FormData();

    formData.append("pdf", file);
    formData.append("order", order);

    return request("reorderpdf", formData);

}

export async function protectPdf(file, password) {

    const formData = new FormData();

    formData.append("pdf", file);
    formData.append("password", password);

    return request("protectpdf", formData);

}

export async function unlockPdf(file, password) {

    const formData = new FormData();

    formData.append("pdf", file);
    formData.append("password", password);

    return request("unlockpdf", formData);

}

export async function signPdf(file, signature, page) {

    const formData = new FormData();

    formData.append("pdf", file);
    formData.append("signature", signature);
    formData.append("page", page);

    return request("signpdf", formData);

}

export async function removePages(file, pages) {

    const formData = new FormData();

    formData.append("pdf", file);
    formData.append("pages", pages);

    return request("removepages", formData);

}

export async function extractPages(file, pages) {

    const formData = new FormData();

    formData.append("pdf", file);
    formData.append("pages", pages);

    return request("extractpages", formData);

}

export async function wordToPdf(file) {

    const formData = new FormData();

    formData.append("word", file);

    return request("wordtopdf", formData);

}

export async function excelToPdf(file) {

    const formData = new FormData();

    formData.append("excel", file);

    return request("exceltopdf", formData);

}

export async function powerPointToPdf(file) {

    const formData = new FormData();

    formData.append("powerpoint", file);

    return request("powerpointtopdf", formData);

}

export async function pdfToWord(file) {

    const formData = new FormData();

    formData.append("pdf", file);

    return request("pdftoword", formData);

}

export async function pdfToExcel(file) {

    const formData = new FormData();

    formData.append("pdf", file);

    return request("pdftoexcel", formData);

}

export async function pdfToPowerPoint(file) {

    const formData = new FormData();

    formData.append("pdf", file);

    return request("pdftopowerpoint", formData);

}

export async function pdfToText(file) {

    const formData = new FormData();

    formData.append("pdf", file);

    return request("pdftotext", formData);

}