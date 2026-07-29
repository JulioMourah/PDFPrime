import { useRef, useState } from "react";

import ToolPage from "../../components/ToolPage/ToolPage";
import { rotatePdf } from "../../services/api";

function RotatePdf() {

    const inputRef = useRef(null);

    const [file, setFile] = useState(null);

    const [angle, setAngle] = useState(90);

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

            alert("Selecione um PDF.");

            return;

        }

        try {

            setLoading(true);

            const blob = await rotatePdf(

                file,

                angle

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

            alert("Erro ao rotacionar PDF.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <ToolPage

            title="Rotacionar PDF"

            description="Rotacione todas as páginas do PDF."

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

                        <select

                            value={angle}

                            onChange={(e) =>

                                setAngle(Number(e.target.value))

                            }

                        >

                            <option value={90}>

                                90°

                            </option>

                            <option value={180}>

                                180°

                            </option>

                            <option value={270}>

                                270°

                            </option>

                        </select>

                        <button

                            className="convert-btn"

                            onClick={converter}

                            disabled={loading}

                        >

                            {

                                loading

                                    ? "Rotacionando..."

                                    : "Rotacionar PDF"

                            }

                        </button>

                    </>

                )

            }

        </ToolPage>

    );

}

export default RotatePdf;