import "./header.css";

import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <div className="container">
                <Link className="logo" to="/">
                    D<span>Flix</span>
                </Link>

                <nav className="nav">
                    <Link className="favoritos" to="/favoritos">
                        Salvos
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;