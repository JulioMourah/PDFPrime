import "./FileActions.css";
import ToolCard from "../ToolCard/ToolCard";
import { tools } from "../../data/tools";
import { imageToPdf, pdfToJpg } from "../../services/api";

function FileActions({ file }) {

    if (!file) return null;

    let availableTools = [];

    if (file.type.startsWith("image/")) {

        availableTools = tools.image;

    } else if (file.type === "application/pdf") {

        availableTools = tools.pdf;

    } else if (
        file.name.endsWith(".doc") ||
        file.name.endsWith(".docx") ||
        file.name.endsWith(".ppt") ||
        file.name.endsWith(".pptx") ||
        file.name.endsWith(".xls") ||
        file.name.endsWith(".xlsx")
    ) {

        availableTools = tools.office;

    }

    async function executarFerramenta(tool) {

        console.log("Ferramenta clicada:", tool);

        try {

            let blob = null;

            switch (tool.id) {

                case "image-to-pdf":

                    console.log("Executando Image → PDF");

                    blob = await imageToPdf(file);

                    break;

                case "pdf-to-jpg":

                    console.log("Executando PDF → JPG");

                    blob = await pdfToJpg(file);

                    break;

                default:

                    console.log("Entrou no DEFAULT:", tool.id);

                    alert(`${tool.title} será implementado nas próximas etapas.`);
                    return;

            }

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");

            a.href = url;

            if (tool.id === "image-to-pdf") {

                a.download = "PDFprime.pdf";

            } else if (tool.id === "pdf-to-jpg") {

                a.download = "PDFprime.jpg";

            }

            a.click();

            window.URL.revokeObjectURL(url);

        }

        catch (err) {

            console.error("ERRO:", err);

            alert("Erro ao executar a ferramenta.");

        }

    }

    return (

        <div className="actions">

            <h2>

                Ferramentas disponíveis

            </h2>

            <div className="actions-grid">

                {

                    availableTools.map(tool => (

                        <ToolCard

                            key={tool.id}

                            tool={tool}

                            onClick={executarFerramenta}

                        />

                    ))

                }

            </div>

        </div>

    );

}

export default FileActions;