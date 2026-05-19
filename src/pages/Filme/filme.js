import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import Loading from "../../components/Loading";

import { formatDate } from "../../utils/formatDate";
import BackButton from "../../components/BackButton";

import "./filme.css";
import { Heart, HeartPlus, PlayCircle } from "lucide-react";

const imagePath = "https://image.tmdb.org/t/p/original";

function Filme() {

    /**
     * Recupera o ID enviado pela rota
     * Ex: /filme/123
     */
    const { id } = useParams();

    /**
     * Hook para navegação
     */
    const navigate = useNavigate();

    /**
     * State do filme
     */
    const [filme, setFilme] = useState({});

    /**
     * Controle de loading
     */
    const [loading, setLoading] = useState(true);

    function takeToYouTube() {

        const query = `${filme.title} trailer oficial`;

        const url =
            `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

        window.open(url, "_blank");
    }



    /**
     * Busca os detalhes do filme
     */
    useEffect(() => {

        async function loadFilme() {

            try {

                const response = await api.get(`movie/${id}`, {
                    params: {
                        api_key: process.env.REACT_APP_API_KEY,
                        language: "pt-BR",
                    }
                });

                setFilme(response.data);

            } catch (error) {

                console.error(error);

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


            {/* BACKDROP */}
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

                {/* INFORMAÇÕES */}
                <div className="movie-info-content">

                    <BackButton />

                    <span className="movie-category">
                        Filme em destaque
                    </span>

                    <h1>
                        {filme.title}
                    </h1>

                    <div className="movie-meta">

                        <span>
                            ⭐ {filme.vote_average?.toFixed(1)}
                        </span>

                        <span>
                            {formatDate(filme.release_date)}
                        </span>

                        <span>
                            {filme.runtime} min
                        </span>

                    </div>

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

                    {/* BOTÕES */}
                    <div className="movie-actions">

                        <button onClick={() => takeToYouTube()}>
                            <PlayCircle /> 
                        </button>

                        <button className="secondary">
                            <Heart size={18} />
                        </button>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default Filme;
