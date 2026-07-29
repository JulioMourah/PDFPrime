import { useRef, useState } from "react";
import ToolPage from "../../components/ToolPage/ToolPage";
import { splitPdf } from "../../services/api";

function SplitPdf() {

    const inputRef = useRef(null);

    const [file, setFile] = useState(null);

    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);

    function selecionarArquivo() {

        inputRef.current.click();

    }

    function escolherArquivo(event) {

        const arquivo = event.target.files[0];

        if (!arquivo) return;

        setFile(arquivo);

    }

    async function dividir() {

        if (!file) {

            alert("Selecione um PDF.");

            return;

        }

        try {

            setLoading(true);

            const blob = await splitPdf(file, page);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = "PDFprime-pagina.pdf";

            a.click();

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error(err);

            alert("Erro ao dividir PDF.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <ToolPage

            title="Dividir PDF"

            description="Extraia uma página específica do seu PDF."

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

            <div className="page-input">

                <label>

                    Página

                </label>

                <input

                    type="number"

                    min="1"

                    value={page}

                    onChange={(e) => setPage(Number(e.target.value))}

                />

            </div>

            {

                file && (

                    <button

                        className="convert-btn"

                        onClick={dividir}

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Dividindo..."

                                : "Dividir PDF"

                        }

                    </button>

                )

            }

        </ToolPage>

    );

}

export default SplitPdf;