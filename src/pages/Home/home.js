import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
    Play,
} from "lucide-react";

import api from "../../services/api";

import Loading from "../../components/Loading";

import "./home.css";
import SearchBar from "../../components/SearchBar";
import MovieCard from "../../components/MovieCard";

/**
 * URL base das imagens do TMDB
 */
const imagePath =
    "https://image.tmdb.org/t/p/original";

function Home() {

    /**
     * Lista de filmes
     */
    const [filmes, setFilmes] = useState([]);

    /**
     * Controle de loading inicial
     */
    const [loading, setLoading] = useState(true);

    /**
     * Controle de loading do botão
     */
    const [loadingMore, setLoadingMore] = useState(false);

    /**
     * Página atual da API
     */
    const [page, setPage] = useState(1);

    /**
     * Filmes salvos no localStorage
     */
    const [savedMovies, setSavedMovies] = useState([]);

    /** 
     * Texto da busca 
     */
    const [query, setQuery] = useState("");

    /** 
     * Hero 
     */
    const [currentHero, setCurrentHero] = useState(0);

    /**
     * Busca filmes na API
     */
    async function loadFilmes(pageNumber) {

        try {

            const response = await api.get(
                "movie/now_playing",
                {
                    params: {
                        api_key:
                            process.env.REACT_APP_API_KEY,
                        language: "pt-BR",
                        page: pageNumber,
                    }
                }
            );

            /**
             * Primeira página
             */
            if (pageNumber === 1) {

                setFilmes(response.data.results);

            } else {

                /**
                 * Adiciona novos filmes
                 */
                setFilmes((prevFilmes) => [
                    ...prevFilmes,
                    ...response.data.results
                ]);
            }

        } catch (error) {

            console.error(
                "Erro ao carregar filmes:",
                error
            );

        } finally {

            setLoading(false);
            setLoadingMore(false);
        }
    }

    /**
     * Busca filmes salvos
     */
    function loadSavedMovies() {

        const movies =
            localStorage.getItem("@dflix:movies");

        setSavedMovies(
            JSON.parse(movies) || []
        );
    }

    /**
     * Carregamento inicial
     */
    useEffect(() => {

        loadFilmes(1);

        loadSavedMovies();

    }, []);

    useEffect(() => {

        if (filmes.length === 0) return;

        const interval = setInterval(() => {

            setCurrentHero((prev) =>

                prev === filmes.length - 1
                    ? 0
                    : prev + 1
            );

        }, 6000);

        return () => clearInterval(interval);

    }, [filmes]);



    /**
     * Carrega mais filmes
     */
    function handleLoadMore() {

        const nextPage = page + 1;

        setPage(nextPage);

        setLoadingMore(true);

        loadFilmes(nextPage);
    }

    /**
     * Verifica se filme está salvo
     */
    function isMovieSaved(movieId) {

        return savedMovies.some(
            (movie) => movie.id === movieId
        );
    }

    /**
     * Loading reutilizável
     */
    if (loading) {
        return <Loading />;
    }

    /**
     * Filme destaque
     */
    const destaque = filmes[currentHero];


    if (!destaque) {
        return <Loading />;
    }

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
                        Em cartaz
                    </span>

                    <h1>
                        {destaque.title}
                    </h1>

                    <p>
                        {destaque.overview}
                    </p>

                    <div className="hero-buttons">

                        <Link
                            to={`/filme/${destaque.id}`}
                        >
                            <Play />Assistir agora
                        </Link>

                    </div>

                </div>

                <div className="hero-indicators">

                    {filmes.slice(0, 5).map((_, index) => (

                        <button
                            key={index}
                            className={
                                currentHero === index
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setCurrentHero(index)
                            }
                        />

                    ))}

                </div>
                


            </section>


            {/* FILMES */}
            <section className="movies-section">
                <SearchBar
                    value={query}
                    onChange={(e) =>
                        setQuery(e.target.value)
                    }
                    placeholder="Buscar filmes..."
                />

                <div className="section-header">

                    <h2>
                        Filmes populares
                    </h2>

                    <span>
                        {filmes.length} filmes
                    </span>

                </div>

                <div className="movies-grid">
                    {filmes.map((filme) => (

                        <MovieCard
                            key={filme.id}
                            movie={filme}
                            saved={isMovieSaved(filme.id)}
                        />

                    ))}
                </div>

                {/* VER MAIS */}
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
