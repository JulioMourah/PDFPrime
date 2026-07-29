import "./UploadArea.css";
import { useRef, useState } from "react";
import FileActions from "../FileActions/FileActions";

function UploadArea({ onSelect }) {

    const inputRef = useRef(null);

    const [file, setFile] = useState(null);

    const [dragActive, setDragActive] = useState(false);

    function selecionarArquivo() {

        inputRef.current.click();

    }

    function aoSelecionarArquivo(event) {

        const arquivo = event.target.files[0];

        if (!arquivo) return;

        setFile(arquivo);

        if (onSelect) {

            onSelect(arquivo);

        }

    }

    function handleDrag(event) {

        event.preventDefault();
        event.stopPropagation();

        if (event.type === "dragenter" || event.type === "dragover") {

            setDragActive(true);

        }

        else if (event.type === "dragleave") {

            setDragActive(false);

        }

    }

    function handleDrop(event) {

        event.preventDefault();
        event.stopPropagation();

        setDragActive(false);

        const arquivo = event.dataTransfer.files[0];

        if (!arquivo) return;

        setFile(arquivo);

        if (onSelect) {

            onSelect(arquivo);

        }

    }

    return (

        <section className="upload">

            <div

                className={`upload-box ${dragActive ? "drag-active" : ""}`}

                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}

            >

                <div

                    className="upload-content"

                    onClick={!file ? selecionarArquivo : undefined}

                >

                    <div className="upload-icon">

                        📄

                    </div>

                    <h2>

                        Arraste qualquer arquivo aqui

                    </h2>

                    <p>

                        ou clique para selecionar

                    </p>

                    <input

                        type="file"

                        hidden

                        ref={inputRef}

                        onChange={aoSelecionarArquivo}

                    />

                    {

                        !file && (

                            <button

                                onClick={(e) => {

                                    e.stopPropagation();

                                    selecionarArquivo();

                                }}

                            >

                                Selecionar Arquivo

                            </button>

                        )

                    }

                </div>

                {

                    file && (

                        <div className="file-info">

                            <h3>

                                {file.name}

                            </h3>

                            <p>

                                {(file.size / 1024 / 1024).toFixed(2)} MB

                            </p>

                        </div>

                    )

                }

                <FileActions file={file} />

            </div>

        </section>

    );

}

export default UploadArea;