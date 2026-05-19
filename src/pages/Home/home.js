import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import "./home.css";

import Loading from "../../components/Loading";

const imagePath = "https://image.tmdb.org/t/p/original";

function Home() {

    const [filmes, setFilmes] = useState([]);

    const [loading, setLoading] = useState(true);

    // Página atual
    const [page, setPage] = useState(1);

    // Loading do botão
    const [loadingMore, setLoadingMore] = useState(false);

    /**
     * Busca filmes na API
     */
    async function loadFilmes(pageNumber) {

        try {

            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: process.env.REACT_APP_API_KEY,
                    language: "pt-BR",
                    page: pageNumber,
                }
            });

            /**
             * Se for primeira página:
             * substitui os filmes
             */
            if (pageNumber === 1) {

                setFilmes(response.data.results);

            } else {

                /**
                 * Adiciona os novos filmes
                 * sem remover os anteriores
                 */
                setFilmes((prevFilmes) => [
                    ...prevFilmes,
                    ...response.data.results
                ]);
            }

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
            setLoadingMore(false);
        }
    }

    /**
     * Carrega inicialmente
     */
    useEffect(() => {

        loadFilmes(1);

    }, []);

    /**
     * Função do botão
     */
    function handleLoadMore() {

        const nextPage = page + 1;

        setPage(nextPage);

        setLoadingMore(true);

        loadFilmes(nextPage);
    }

    if (loading) {
        return <Loading />;
    }

    const destaque = filmes[0];

    return (
        <main className="home-container">

            {/* HERO */}
            <section
                className="hero"
                style={{
                    backgroundImage:
                        `url(${imagePath}${destaque.backdrop_path})`
                }}
            >

                <div className="overlay"></div>

                <div className="hero-content">

                    <span className="categoria">
                        Em Cartaz
                    </span>

                    <h1>
                        {destaque.title}
                    </h1>

                    <p>
                        {destaque.overview}
                    </p>

                    <div className="hero-buttons">

                        <Link to={`/filme/${destaque.id}`}>
                            ▶ Assistir agora
                        </Link>

                    </div>

                </div>

            </section>

            {/* FILMES */}
            <section className="movies-section">

                <h2>
                    Filmes populares
                </h2>

                <div className="movies-grid">

                    {filmes.map((filme) => {

                        return (

                            <article
                                key={filme.id}
                                className="movie-card"
                            >

                                <img
                                    src={`${imagePath}${filme.poster_path}`}
                                    alt={filme.title}
                                />

                                <div className="movie-info">

                                    <div className="movie-top">

                                        <strong>
                                            {filme.title}
                                        </strong>

                                        <span>
                                            ⭐ {filme.vote_average.toFixed(1)}
                                        </span>

                                    </div>

                                    <p>
                                        {filme.overview}
                                    </p>

                                    <Link to={`/filme/${filme.id}`}>
                                        Ver detalhes
                                    </Link>

                                </div>

                            </article>
                        );
                    })}

                </div>

                {/* BOTÃO */}
                <div className="load-more-container">

                    <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                    >

                        {loadingMore
                            ? "Carregando..."
                            : "Ver mais filmes"}

                    </button>

                </div>

            </section>

        </main>
    );
}

export default Home;

