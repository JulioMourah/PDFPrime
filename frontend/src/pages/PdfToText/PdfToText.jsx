import { useState } from "react";

import Header from "../../components/Header/Header";
import UploadArea from "../../components/UploadArea/UploadArea";

import { pdfToText } from "../../services/api";

import "./PdfToText.css";

function PdfToText() {

    const [file, setFile] = useState(null);

    async function handleConvert() {

        if (!file) return;

        try {

            const blob = await pdfToText(file);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = file.name.replace(".pdf", ".txt");

            a.click();

            window.URL.revokeObjectURL(url);

        }

        catch {

            alert("Erro ao converter PDF para Texto.");

        }

    }

    return (

        <>

            <Header />

            <div className="page-container">

                <h1>

                    PDF para Texto

                </h1>

                <UploadArea

                    onSelect={setFile}

                />

                <button

                    onClick={handleConvert}

                >

                    Converter para Texto

                </button>

            </div>

        </>

    );

}

export default PdfToText;