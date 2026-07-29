import { useRef, useState } from "react";
import ToolPage from "../../components/ToolPage/ToolPage";
import { compressPdf } from "../../services/api";

function CompressPdf() {

    const inputRef = useRef(null);

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    function selecionarArquivo() {

        inputRef.current.click();

    }

    function escolherArquivo(event) {

        const arquivo = event.target.files[0];

        if (!arquivo) return;

        setFile(arquivo);

    }

    async function comprimir() {

        if (!file) {

            alert("Selecione um PDF.");

            return;

        }

        try {

            setLoading(true);

            const blob = await compressPdf(file);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = "PDFprime-comprimido.pdf";

            a.click();

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error(err);

            alert("Erro ao comprimir PDF.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <ToolPage

            title="Comprimir PDF"

            description="Reduza o tamanho do seu PDF."

        >

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

                    <div className="file-name">

                        {file.name}

                    </div>

                )

            }

            {

                file && (

                    <button

                        className="convert-btn"

                        onClick={comprimir}

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Comprimindo..."

                                : "Comprimir PDF"

                        }

                    </button>

                )

            }

        </ToolPage>

    );

}

export default CompressPdf;