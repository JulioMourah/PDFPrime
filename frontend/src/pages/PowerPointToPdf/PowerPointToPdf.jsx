import { useRef, useState } from "react";
import ToolPage from "../../components/ToolPage/ToolPage";
import { powerPointToPdf } from "../../services/api";

function PowerPointToPdf() {

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

    async function converter() {

        if (!file) {

            alert("Selecione um arquivo PowerPoint.");

            return;

        }

        try {

            setLoading(true);

            const blob = await powerPointToPdf(file);

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

        <ToolPage

            title="PowerPoint para PDF"

            description="Converta apresentações PowerPoint para PDF."

        >

            <input

                hidden

                ref={inputRef}

                type="file"

                accept=".ppt,.pptx"

                onChange={escolherArquivo}

            />

            <button

                className="select-btn"

                onClick={selecionarArquivo}

            >

                Selecionar PowerPoint

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

                        onClick={converter}

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Convertendo..."

                                : "Converter para PDF"

                        }

                    </button>

                )

            }

        </ToolPage>

    );

}

export default PowerPointToPdf;