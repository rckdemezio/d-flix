import "./loading.css";

function Loading() {
    return (
        <div className="loading-container">

            {/* Spinner animado */}
            <div className="spinner"></div>

            {/* Texto */}
            <h2>Carregando filmes...</h2>

            {/* Subtexto */}
            <p>Aguarde enquanto buscamos os melhores conteúdos...</p>

        </div>
    );
}

export default Loading;

