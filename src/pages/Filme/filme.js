import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
    Heart,
    HeartPlus,
    PlayCircle,
    Star
} from "lucide-react";

import api from "../../services/api";

import Loading from "../../components/Loading";
import BackButton from "../../components/BackButton";

import { formatDate } from "../../utils/formatDate";

import "./filme.css";

/**
 * URL base das imagens do TMDB
 */
const imagePath = "https://image.tmdb.org/t/p/original";

function Filme() {

    /**
     * Recupera o ID enviado pela rota
     * Exemplo:
     * /filme/123
     */
    const { id } = useParams();

    /**
     * Hook de navegação
     */
    const navigate = useNavigate();

    /**
     * State responsável pelos dados do filme
     */
    const [filme, setFilme] = useState({});

    /**
     * Controle de loading da página
     */
    const [loading, setLoading] = useState(true);

    /**
     * Controle de filmes salvos
     */
    const [saved, setSaved] = useState(false);

    /**
     * Abre o trailer do filme no YouTube
     */
    function takeToYouTube() {

        const query =
            `${filme.title} trailer oficial`;

        const url =
            `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

        window.open(url, "_blank");
    }

    /**
     * Salva ou remove filme do localStorage
     */
    function handleSaveMovie() {

        /**
         * Recupera lista salva
         */
        const listSaved =
            localStorage.getItem("@dflix:movies");

        /**
         * Converte string para array
         */
        let savedMovies =
            JSON.parse(listSaved) || [];

        /**
         * Verifica se filme já existe
         */
        const hasMovie =
            savedMovies.some(
                (savedMovie) =>
                    savedMovie.id === filme.id
            );

        /**
         * Remove filme salvo
         */
        if (hasMovie) {

            const filteredMovies =
                savedMovies.filter(
                    (savedMovie) =>
                        savedMovie.id !== filme.id
                );

            localStorage.setItem(
                "@dflix:movies",
                JSON.stringify(filteredMovies)
            );

            setSaved(false);

            return;
        }

        /**
         * Adiciona novo filme
         */
        savedMovies.push({
            id: filme.id,
            title: filme.title,
            poster_path: filme.poster_path,
            backdrop_path: filme.backdrop_path,
            vote_average: filme.vote_average,
        });

        /**
         * Salva no navegador
         */
        localStorage.setItem(
            "@dflix:movies",
            JSON.stringify(savedMovies)
        );

        setSaved(true);
    }

    /**
     * Busca detalhes do filme
     */
    useEffect(() => {

        async function loadFilme() {

            try {

                const response = await api.get(
                    `movie/${id}`,
                    {
                        params: {
                            api_key:
                                process.env.REACT_APP_API_KEY,
                            language: "pt-BR",
                        }
                    }
                );

                /**
                 * Salva dados do filme
                 */
                setFilme(response.data);

                /**
                 * Recupera lista salva
                 */
                const listSaved =
                    localStorage.getItem("@dflix:movies");

                const savedMovies =
                    JSON.parse(listSaved) || [];

                /**
                 * Verifica se filme já está salvo
                 */
                const hasMovie =
                    savedMovies.some(
                        (savedMovie) =>
                            savedMovie.id === response.data.id
                    );

                setSaved(hasMovie);

            } catch (error) {

                console.error(error);

                /**
                 * Redireciona para home
                 * caso aconteça erro
                 */
                navigate("/", {
                    replace: true
                });

            } finally {

                setLoading(false);
            }
        }

        loadFilme();

    }, [id, navigate]);

    /**
     * Loading reutilizável
     */
    if (loading) {
        return <Loading />;
    }

    return (

        <main className="movie-details">

            {/* BANNER */}
            <section
                className="movie-banner"
                style={{
                    backgroundImage:
                        `url(${imagePath}${filme.backdrop_path})`
                }}
            >

                <div className="movie-overlay"></div>

            </section>

            {/* CONTEÚDO */}
            <section className="movie-content">

                {/* POSTER */}
                <div className="movie-poster">

                    <img
                        src={`${imagePath}${filme.poster_path}`}
                        alt={filme.title}
                    />

                </div>

                {/* INFO */}
                <div className="movie-info-content">

                    <BackButton />

                    <span className="movie-category">
                        🎬 Filme em destaque
                    </span>

                    <h1>
                        {filme.title}
                    </h1>

                    {/* METADADOS */}
                    <div className="movie-meta">

                        <span>
                            <Star size={14} />
                            {filme.vote_average?.toFixed(1)}
                        </span>

                        <span>
                            {formatDate(filme.release_date)}
                        </span>

                        <span>
                            ⏱ {filme.runtime} min
                        </span>

                    </div>

                    {/* DESCRIÇÃO */}
                    <p>
                        {filme.overview}
                    </p>

                    {/* GÊNEROS */}
                    <div className="genres">

                        {filme.genres?.map((genre) => (

                            <span key={genre.id}>
                                {genre.name}
                            </span>

                        ))}

                    </div>

                    {/* AÇÕES */}
                    <div className="movie-actions">

                        {/* TRAILER */}
                        <button onClick={takeToYouTube}>

                            <PlayCircle size={18} />

                            Assistir trailer

                        </button>

                        {/* SALVAR */}
                        <button
                            className={`secondary ${saved ? "saved" : ""}`}
                            onClick={handleSaveMovie}
                        >

                            {saved ? (
                                <>
                                    <HeartPlus size={18} />
                                    Salvo
                                </>
                            ) : (
                                <>
                                    <Heart size={18} />
                                    Salvar
                                </>
                            )}

                        </button>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default Filme;

