import { useRef, useState } from "react";

import ToolPage from "../../components/ToolPage/ToolPage";
import { removePages } from "../../services/api";

import "./RemovePages.css";

function RemovePages() {

    const inputRef = useRef(null);

    const [file, setFile] = useState(null);
    const [pages, setPages] = useState("");
    const [loading, setLoading] = useState(false);

    async function remover() {

        if (!file) {

            alert("Selecione um PDF.");

            return;

        }

        if (!pages.trim()) {

            alert("Informe as páginas.");

            return;

        }

        try {

            setLoading(true);

            const blob = await removePages(file, pages);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = "PDFPrime-sem-paginas.pdf";

            a.click();

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error(err);

            alert("Erro ao remover páginas.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <ToolPage

            title="Remover páginas"

            description="Remova páginas específicas do PDF."

        >

            <input

                hidden

                ref={inputRef}

                type="file"

                accept=".pdf"

                onChange={(e)=>setFile(e.target.files[0])}

            />

            <button

                className="select-btn"

                onClick={()=>inputRef.current.click()}

            >

                Selecionar PDF

            </button>

            {

                file &&

                <div className="file-name">

                    {file.name}

                </div>

            }

            <input

                className="pages-input"

                placeholder="Ex.: 2,4,6"

                value={pages}

                onChange={(e)=>setPages(e.target.value)}

            />

            <button

                className="convert-btn"

                onClick={remover}

                disabled={loading}

            >

                {

                    loading

                    ? "Removendo..."

                    : "Remover páginas"

                }

            </button>

        </ToolPage>

    );

}

export default RemovePages;