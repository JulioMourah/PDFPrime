import { useState } from "react";

import Header from "../../components/Header/Header";
import { pdfToExcel } from "../../services/api";

import "./PdfToExcel.css";

function PdfToExcel() {

    const [file, setFile] = useState(null);

    async function handleConvert() {

        if (!file) {

            alert("Selecione um PDF.");

            return;

        }

        try {

            const blob = await pdfToExcel(file);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = file.name.replace(".pdf", ".xlsx");

            a.click();

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error(err);

            alert("Erro ao converter PDF para Excel.");

        }

    }

    return (

        <>

            <Header />

            <div className="page-container">

                <h1>PDF para Excel</h1>

                <p>Converta PDF para XLSX.</p>

                <input

                    type="file"

                    accept=".pdf"

                    onChange={(e) => setFile(e.target.files[0])}

                />

                <br />
                <br />

                {

                    file && (

                        <p>

                            <strong>Arquivo:</strong> {file.name}

                        </p>

                    )

                }

                <button onClick={handleConvert}>

                    Converter para Excel

                </button>

            </div>

        </>

    );

}

export default PdfToExcel;