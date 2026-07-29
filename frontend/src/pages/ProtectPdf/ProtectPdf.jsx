import { useRef, useState } from "react";

import ToolPage from "../../components/ToolPage/ToolPage";
import { protectPdf } from "../../services/api";

function ProtectPdf() {

    const inputRef = useRef(null);

    const [file, setFile] = useState(null);

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    function selecionarArquivo() {

        inputRef.current.click();

    }

    function escolherArquivo(event) {

        const arquivo = event.target.files[0];

        if (!arquivo) return;

        setFile(arquivo);

    }

    async function proteger() {

        if (!file) {

            alert("Selecione um PDF.");

            return;

        }

        if (!password) {

            alert("Informe uma senha.");

            return;

        }

        try {

            setLoading(true);

            const blob = await protectPdf(file, password);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = "PDFprime-protegido.pdf";

            a.click();

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error(err);

            alert("Erro ao proteger PDF.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <ToolPage

            title="Proteger PDF"

            description="Proteja seu PDF com uma senha."

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

                            className="password-input"

                            type="password"

                            placeholder="Digite a senha"

                            value={password}

                            onChange={(e) =>

                                setPassword(e.target.value)

                            }

                        />

                        <button

                            className="convert-btn"

                            onClick={proteger}

                            disabled={loading}

                        >

                            {

                                loading

                                    ? "Protegendo..."

                                    : "Proteger PDF"

                            }

                        </button>

                    </>

                )

            }

        </ToolPage>

    );

}

export default ProtectPdf;