import { useState } from "react";

import Header from "../../components/Header/Header";
import { pdfToPowerPoint } from "../../services/api";

import "./PdfToPowerPoint.css";

function PdfToPowerPoint() {

    const [file, setFile] = useState(null);

    async function handleConvert() {

        if (!file) {

            alert("Selecione um PDF.");

            return;

        }

        try {

            const blob = await pdfToPowerPoint(file);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = file.name.replace(".pdf", ".pptx");

            a.click();

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error(err);

            alert("Erro ao converter PDF para PowerPoint.");

        }

    }

    return (

        <>

            <Header />

            <div className="page-container">

                <h1>PDF para PowerPoint</h1>

                <p>Converta PDF em apresentação PowerPoint (.pptx).</p>

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

                    Converter para PowerPoint

                </button>

            </div>

        </>

    );

}

export default PdfToPowerPoint;