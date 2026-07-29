import { useRef, useState } from "react";

import ToolPage from "../../components/ToolPage/ToolPage";
import { unlockPdf } from "../../services/api";

function UnlockPdf() {

    const inputRef = useRef(null);

    const [file, setFile] = useState(null);

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    function selecionarArquivo() {

        inputRef.current.click();

    }

    function escolherArquivo(e) {

        if (!e.target.files[0]) return;

        setFile(e.target.files[0]);

    }

    async function removerSenha() {

        if (!file) {

            alert("Selecione um PDF.");

            return;

        }

        if (!password) {

            alert("Digite a senha.");

            return;

        }

        try {

            setLoading(true);

            const blob = await unlockPdf(

                file,

                password

            );

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = "PDFprime-sem-senha.pdf";

            a.click();

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error(err);

            alert("Erro ao remover senha.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <ToolPage

            title="Desproteger PDF"

            description="Remova a senha do PDF."

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

                            placeholder="Senha do PDF"

                            value={password}

                            onChange={(e)=>setPassword(e.target.value)}

                        />

                        <button

                            className="convert-btn"

                            onClick={removerSenha}

                            disabled={loading}

                        >

                            {

                                loading

                                ? "Removendo..."

                                : "Desproteger PDF"

                            }

                        </button>

                    </>

                )

            }

        </ToolPage>

    );

}

export default UnlockPdf;