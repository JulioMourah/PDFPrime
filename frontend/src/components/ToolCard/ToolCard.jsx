import "./ToolCard.css";

function ToolCard({ tool, onClick }) {

    return (

        <button
            className="tool-card"
            onClick={() => onClick(tool)}
        >

            <div className="tool-icon">

                {tool.icon}

            </div>

            <div className="tool-title">

                {tool.title}

            </div>

        </button>

    );

}

export default ToolCard;