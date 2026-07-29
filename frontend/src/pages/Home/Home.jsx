import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import "./Home.css";

function Home() {

    const tools = [

        {
            title: "Imagem para PDF",
            icon: "/icons/icon_ImagemparaPDF.png",
            route: "/image-to-pdf"
        },

        {
            title: "PDF para JPG",
            icon: "/icons/icon_PDFparaJPG.png",
            route: "/pdf-to-jpg"
        },

        {
            title: "PDF para PNG",
            icon: "/icons/icon_PDFparaPNG.png",
            route: "/pdf-to-png"
        },

        {
            title: "Juntar PDF",
            icon: "/icons/icon_JuntarPDF.png",
            route: "/merge-pdf"
        },

        {
            title: "Dividir PDF",
            icon: "/icons/icon_DividirPDF.png",
            route: "/split-pdf"
        },

        {
            title: "Comprimir PDF",
            icon: "/icons/icon_ComprimirPDF.png",
            route: "/compress-pdf"
        },

        {
            title: "Rotacionar PDF",
            icon: "/icons/icon_RotacionarPDF.png",
            route: "/rotate-pdf"
        },

        {
            title: "Organizar PDF",
            icon: "/icons/icon_OrganizarPDF.png",
            route: "/reorder-pdf"
        },

        {
            title: "Proteger PDF",
            icon: "/icons/icon_ProtegerPDF.png",
            route: "/protect-pdf"
        },

        {
            title: "Desproteger PDF",
            icon: "/icons/icon_DesprotegerPDF.png",
            route: "/unlock-pdf"
        },

        {
            title: "Assinar PDF",
            icon: "/icons/icon_AssinarPDF.png",
            route: "/sign-pdf"
        },

        {
            title: "Remover páginas",
            icon: "/icons/icon_Removerpaginas.png",
            route: "/remove-pages"
        },

        {
            title: "Extrair páginas",
            icon: "/icons/icon_Extrairpaginas.png",
            route: "/extract-pages"
        },

        {
            title: "PDF para Word",
            icon: "/icons/icon_PDFparaWord.png",
            route: "/pdf-to-word"
        },

        {
            title: "PDF para Excel",
            icon: "/icons/icon_PDFparaExcel.png",
            route: "/pdf-to-excel"
        },

        {
            title: "PDF para PowerPoint",
            icon: "/icons/icon_PDFparaPowerPoint.png",
            route: "/pdf-to-powerpoint"
        },

        {
            title: "PDF para Texto",
            icon: "/icons/icon_PDFparaTexto.png",
            route: "/pdf-to-text"
        },

        {
            title: "Word para PDF",
            icon: "/icons/icon_WordparaPDF.png",
            route: "/word-to-pdf"
        },

        {
            title: "Excel para PDF",
            icon: "/icons/icon_ExcelparaPDF.png",
            route: "/excel-to-pdf"
        },

        {
            title: "PowerPoint para PDF",
            icon: "/icons/icon_PowerPointparaPDF.png",
            route: "/powerpoint-to-pdf"
        }

    ];

    return (

        <>

            <Header />

            <section className="home-hero">

                <h1>

                    Todas as ferramentas para PDF em um só lugar

                </h1>

                <p>

                    Rápido, gratuito e simples.

                </p>

            </section>

            <section className="home-tools">

                {

                    tools.map(tool => (

                        <Link
                            key={tool.route}
                            to={tool.route}
                            className="tool-home-card"
                        >

                            <div className="tool-home-icon">

                                <img
                                    src={tool.icon}
                                    alt={tool.title}
                                />

                            </div>

                            <h3>

                                {tool.title}

                            </h3>

                        </Link>

                    ))

                }

            </section>

        </>

    );

}

export default Home;