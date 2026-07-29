import "./ToolsGrid.css";

import ToolCard from "../ToolCard/ToolCard";

import { tools } from "../../data/tools";

function ToolsGrid({ onSelectTool }) {

    const allTools = [

        ...tools.image,

        ...tools.pdf,

        ...tools.office

    ];

    return (

        <section className="tools-grid-section">

            <div className="tools-grid-header">

                <h2>

                    Todas as Ferramentas

                </h2>

                <p>

                    Escolha uma ferramenta para começar.

                </p>

            </div>

            <div className="tools-grid">

                {

                    allTools.map(tool => (

                        <ToolCard

                            key={tool.id}

                            tool={tool}

                            onClick={onSelectTool}

                        />

                    ))

                }

            </div>

        </section>

    );

}

export default ToolsGrid;