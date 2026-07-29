import "./ToolPage.css";
import Header from "../Header/Header";

function ToolPage({

    title,

    description,

    children

}) {

    return (

        <>

            <Header />

            <section className="tool-page">

                <h1>

                    {title}

                </h1>

                <p>

                    {description}

                </p>

                {children}

            </section>

        </>

    );

}

export default ToolPage;