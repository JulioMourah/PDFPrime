import { useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { pdfToPng } from "../../services/api";
import "./PdfToPng.css";

function PdfToPng() {

    const inputRef = useRef(null);

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    function selecionarArquivo() {

        inputRef.current.click();

    }

    function escolherArquivo(e) {

        const arquivo = e.target.files[0];

        if (!arquivo) return;

        setFile(arquivo);

    }

    async function converter() {

        try {

            setLoading(true);

            const blob = await pdfToPng(file);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = "PDFprime.png";

            a.click();

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error(err);

            alert("Erro ao converter.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <>

            <Header />

            <section className="tool-page">

                <h1>PDF para PNG</h1>

                <p>Converta rapidamente a primeira página do PDF em PNG.</p>

                <input

                    hidden

                    ref={inputRef}

                    type="file"

                    accept=".pdf"

                    onChange={escolherArquivo}

                />

                <button

                    className="select-btn"

                    onClick={selecionarArquivo}

                >

                    Selecionar PDF

                </button>

                {

                    file && (

                        <>

                            <h3>{file.name}</h3>

                            <button

                                className="convert-btn"

                                onClick={converter}

                                disabled={loading}

                            >

                                {

                                    loading

                                    ? "Convertendo..."

                                    : "Converter para PNG"

                                }

                            </button>

                        </>

                    )

                }

            </section>

        </>

    );

}

export default PdfToPng;