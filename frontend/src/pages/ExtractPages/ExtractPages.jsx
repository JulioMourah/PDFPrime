import { useRef, useState } from "react";

import ToolPage from "../../components/ToolPage/ToolPage";
import { extractPages } from "../../services/api";

import "./ExtractPages.css";

function ExtractPages() {

    const inputRef = useRef(null);

    const [file, setFile] = useState(null);
    const [pages, setPages] = useState("");
    const [loading, setLoading] = useState(false);

    async function extrair() {

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

            const blob = await extractPages(file, pages);

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = "PDFPrime-paginas-extraidas.pdf";

            a.click();

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error(err);

            alert("Erro ao extrair páginas.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <ToolPage

            title="Extrair páginas"

            description="Crie um novo PDF apenas com as páginas desejadas."

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

                placeholder="Ex.: 2,5,8"

                value={pages}

                onChange={(e)=>setPages(e.target.value)}

            />

            <button

                className="convert-btn"

                onClick={extrair}

                disabled={loading}

            >

                {

                    loading

                    ? "Extraindo..."

                    : "Extrair páginas"

                }

            </button>

        </ToolPage>

    );

}

export default ExtractPages;