import { useRef, useState } from "react";

import ToolPage from "../../components/ToolPage/ToolPage";
import { pdfToWord } from "../../services/api";

import "./PdfToWord.css";

function PdfToWord() {

    const inputRef = useRef(null);

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    async function converter() {

        if (!file) {

            alert("Selecione um PDF.");

            return;

        }

        try {

            setLoading(true);

            const blob = await pdfToWord(file);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;
            a.download = "PDFPrime.docx";

            a.click();

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error(err);

            alert("Erro ao converter PDF para Word.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <ToolPage

            title="PDF para Word"

            description="Converta PDF para DOCX."

        >

            <input

                hidden

                ref={inputRef}

                type="file"

                accept=".pdf"

                onChange={(e)=>setFile(e.target.files[0])}

            />

            <button

                className="select-btn"

                onClick={()=>inputRef.current.click()}

            >

                Selecionar PDF

            </button>

            {

                file &&

                <div className="file-name">

                    {file.name}

                </div>

            }

            <button

                className="convert-btn"

                onClick={converter}

                disabled={loading}

            >

                {

                    loading

                    ? "Convertendo..."

                    : "Converter para Word"

                }

            </button>

        </ToolPage>

    );

}

export default PdfToWord;