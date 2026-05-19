import { Link } from "react-router-dom";

import "./notfound.css";

function NotFound() {

    return (
        <main className="notfound-container">

            {/* Glow decorativo */}
            <div className="glow glow-left"></div>
            <div className="glow glow-right"></div>

            <section className="notfound-content">

                {/* Código */}
                <span className="error-code">
                    404
                </span>

                {/* Título */}
                <h1>
                    Algo não saiu com esperado.
                </h1>

                {/* Descrição */}
                <p>
                    Parece que esse filme saiu de cartaz
                    ou a página que você tentou acessar
                    não existe.
                </p>

                {/* Botões */}
                <div className="actions">

                    <Link to="/">
                        Voltar para Home
                    </Link>

                </div>

            </section>

        </main>
    );
}

export default NotFound;
