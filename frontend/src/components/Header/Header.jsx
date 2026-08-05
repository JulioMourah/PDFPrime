import "./Header.css";

function Header() {

    return (

        <header className="header">

            <div className="logo">

                PDFprime

            </div>

            <nav>

                <a href="#">Ferramentas</a>

                <a href="#">Preços</a>

                <a
                    href="https://juliomourah.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Blog
                </a>

            </nav>

        </header>

    );

}

export default Header;