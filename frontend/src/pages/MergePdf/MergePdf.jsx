import { useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { mergePdf } from "../../services/api";
import "./MergePdf.css";

function MergePdf() {

    const inputRef = useRef(null);

    const [files, setFiles] = useState([]);

    const [loading, setLoading] = useState(false);

    function selecionarArquivos() {

        inputRef.current.click();

    }

    function escolherArquivos(event) {

        const novosArquivos = Array.from(event.target.files);

        if (!novosArquivos.length) return;

        setFiles(novosArquivos);

    }

    async function juntar() {

        if (files.length < 2) {

            alert("Selecione pelo menos dois PDFs.");

            return;

        }

        try {

            setLoading(true);

            const blob = await mergePdf(files);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = "PDFprime-unido.pdf";

            a.click();

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error(err);

            alert("Erro ao juntar PDFs.");

        }

        finally {

            setLoading(false);

        }

    }

    function removerArquivo(index) {

        setFiles(files.filter((_, i) => i !== index));

    }

    return (

        <>

            <Header />

            <section className="tool-page">

                <h1>

                    Juntar PDF

                </h1>

                <p>

                    Selecione dois ou mais arquivos PDF.

                </p>

                <input

                    hidden

                    ref={inputRef}

                    type="file"

                    accept=".pdf"

                    multiple

                    onChange={escolherArquivos}

                />

                <button

                    className="select-btn"

                    onClick={selecionarArquivos}

                >

                    Selecionar PDFs

                </button>

                {

                    files.length > 0 && (

                        <div className="files-list">

                            {

                                files.map((file, index) => (

                                    <div
                                        key={index}
                                        className="file-item"
                                    >

                                        <span>

                                            {file.name}

                                        </span>

                                        <button

                                            onClick={() => removerArquivo(index)}

                                        >

                                            ✕

                                        </button>

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

                {

                    files.length >= 2 && (

                        <button

                            className="convert-btn"

                            onClick={juntar}

                            disabled={loading}

                        >

                            {

                                loading

                                    ? "Juntando..."

                                    : "Juntar PDFs"

                            }

                        </button>

                    )

                }

            </section>

        </>

    );

}

export default MergePdf;