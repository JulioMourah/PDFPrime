import { useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { pdfToJpg } from "../../services/api";
import "./PdfToJpg.css";

function PdfToJpg() {

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

        if (!file) return;

        try {

            setLoading(true);

            const blob = await pdfToJpg(file);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = "PDFprime.jpg";

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

                <h1>

                    PDF para JPG

                </h1>

                <p>

                    Converta rapidamente a primeira página do PDF em JPG.

                </p>

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

                            <h3>

                                {file.name}

                            </h3>

                            <button

                                className="convert-btn"

                                onClick={converter}

                                disabled={loading}

                            >

                                {

                                    loading

                                    ? "Convertendo..."

                                    : "Converter para JPG"

                                }

                            </button>

                        </>

                    )

                }

            </section>

        </>

    );

}

export default PdfToJpg;