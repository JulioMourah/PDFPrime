import { useRef, useState } from "react";

import ToolPage from "../../components/ToolPage/ToolPage";
import { signPdf } from "../../services/api";

function SignPdf() {

    const pdfRef = useRef(null);
    const signatureRef = useRef(null);

    const [pdf, setPdf] = useState(null);
    const [signature, setSignature] = useState(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function assinar() {

        if (!pdf) {

            alert("Selecione o PDF.");

            return;

        }

        if (!signature) {

            alert("Selecione a assinatura.");

            return;

        }

        try {

            setLoading(true);

            const blob = await signPdf(

                pdf,

                signature,

                page

            );

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            a.download = "PDFprime-assinado.pdf";

            a.click();

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error(err);

            alert("Erro ao assinar PDF.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <ToolPage

            title="Assinar PDF"

            description="Adicione sua assinatura ao PDF."

        >

            <input

                hidden

                ref={pdfRef}

                type="file"

                accept=".pdf"

                onChange={(e)=>setPdf(e.target.files[0])}

            />

            <button

                className="select-btn"

                onClick={()=>pdfRef.current.click()}

            >

                Selecionar PDF

            </button>

            {

                pdf && (

                    <div className="file-name">

                        {pdf.name}

                    </div>

                )

            }

            <input

                hidden

                ref={signatureRef}

                type="file"

                accept=".png,.jpg,.jpeg"

                onChange={(e)=>setSignature(e.target.files[0])}

            />

            <button

                className="select-btn"

                onClick={()=>signatureRef.current.click()}

            >

                Selecionar Assinatura

            </button>

            {

                signature && (

                    <div className="file-name">

                        {signature.name}

                    </div>

                )

            }

            <input

                className="page-input"

                type="number"

                min="1"

                value={page}

                onChange={(e)=>setPage(e.target.value)}

                placeholder="Página"

            />

            <button

                className="convert-btn"

                onClick={assinar}

                disabled={loading}

            >

                {

                    loading

                    ? "Assinando..."

                    : "Assinar PDF"

                }

            </button>

        </ToolPage>

    );

}

export default SignPdf;