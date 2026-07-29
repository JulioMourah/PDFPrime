import { useRef, useState } from "react";
import ToolPage from "../../components/ToolPage/ToolPage";
import { excelToPdf } from "../../services/api";

function ExcelToPdf() {

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

            alert("Selecione um arquivo Excel.");

            return;

        }

        try {

            setLoading(true);

            const blob = await excelToPdf(file);

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

            title="Excel para PDF"

            description="Converta planilhas Excel para PDF."

        >

            <input

                hidden

                ref={inputRef}

                type="file"

                accept=".xls,.xlsx"

                onChange={escolherArquivo}

            />

            <button

                className="select-btn"

                onClick={selecionarArquivo}

            >

                Selecionar Excel

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

export default ExcelToPdf;