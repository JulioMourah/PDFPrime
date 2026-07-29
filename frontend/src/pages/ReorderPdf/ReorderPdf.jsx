import { useRef, useState } from "react";

import ToolPage from "../../components/ToolPage/ToolPage";
import { reorderPdf } from "../../services/api";

function ReorderPdf() {

    const inputRef = useRef(null);

    const [file, setFile] = useState(null);

    const [order, setOrder] = useState("");

    const [loading, setLoading] = useState(false);

    function selecionarArquivo() {

        inputRef.current.click();

    }

    function escolherArquivo(event) {

        const arquivo = event.target.files[0];

        if (!arquivo) return;

        setFile(arquivo);

    }

    async function organizar() {

        if (!file) {

            alert("Selecione um PDF.");

            return;

        }

        if (!order) {

            alert("Informe a nova ordem das páginas.");

            return;

        }

        try {

            setLoading(true);

            const blob = await reorderPdf(

                file,

                order

            );

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = "PDFprime.pdf";

            a.click();

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error(err);

            alert("Erro ao organizar PDF.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <ToolPage

            title="Organizar PDF"

            description="Informe a nova ordem das páginas."

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

                    <>

                        <div className="file-name">

                            {file.name}

                        </div>

                        <input

                            className="page-input"

                            placeholder="Ex.: 5,4,3,2,1"

                            value={order}

                            onChange={(e) =>

                                setOrder(e.target.value)

                            }

                        />

                        <button

                            className="convert-btn"

                            onClick={organizar}

                            disabled={loading}

                        >

                            {

                                loading

                                    ? "Organizando..."

                                    : "Organizar PDF"

                            }

                        </button>

                    </>

                )

            }

        </ToolPage>

    );

}

export default ReorderPdf;