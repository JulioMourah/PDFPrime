import { useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { imageToPdf } from "../../services/api";
import "./ImageToPdf.css";

function ImageToPdf() {

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

            const blob = await imageToPdf(file);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = "PDFprime.pdf";

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

                    Imagem para PDF

                </h1>

                <p>

                    Converta imagens JPG ou PNG para PDF.

                </p>

                <input

                    hidden

                    ref={inputRef}

                    type="file"

                    accept="image/png,image/jpeg"

                    onChange={escolherArquivo}

                />

                <button

                    className="select-btn"

                    onClick={selecionarArquivo}

                >

                    Selecionar imagem

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

                                    : "Converter para PDF"

                                }

                            </button>

                        </>

                    )

                }

            </section>

        </>

    );

}

export default ImageToPdf;