import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
    Heart,
    Trash2,
    Star,
    Film
} from "lucide-react";

import "./favoritos.css";

const imagePath =
    "https://image.tmdb.org/t/p/original";

function Favoritos() {

    /**
     * State dos filmes favoritos
     */
    const [movies, setMovies] = useState([]);

    /**
     * Carrega filmes salvos
     */
    useEffect(() => {

        const moviesStorage =
            localStorage.getItem("@dflix:movies");

        setMovies(
            JSON.parse(moviesStorage) || []
        );

    }, []);

    /**
     * Remove filme da lista
     */
    function handleDeleteMovie(id) {

        const filteredMovies =
            movies.filter(
                (movie) => movie.id !== id
            );

        setMovies(filteredMovies);

        localStorage.setItem(
            "@dflix:movies",
            JSON.stringify(filteredMovies)
        );
    }

    /**
     * Lista vazia
     */
    if (movies.length === 0) {

        return (

            <main className="favorites-empty">

                <div className="empty-content">

                    <Film size={70} />

                    <h1>
                        Sua lista está vazia
                    </h1>

                    <p>
                        Salve filmes favoritos para
                        encontrá-los rapidamente depois.
                    </p>

                    <Link to="/">
                        Explorar filmes
                    </Link>

                </div>

            </main>
        );
    }

    return (

        <main className="favorites-container">

            {/* HEADER */}
            <section className="favorites-header">

                <div>

                    <span>
                        <Heart size={16} />
                        Minha coleção
                    </span>

                    <h1>
                        Filmes Favoritos
                    </h1>

                </div>

                <strong>
                    {movies.length} filmes salvos
                </strong>

            </section>

            {/* GRID */}
            <section className="favorites-grid">

                {movies.map((movie) => (

                    <article
                        key={movie.id}
                        className="favorite-card"
                    >

                        {/* IMAGEM */}
                        <img
                            src={`${imagePath}${movie.poster_path}`}
                            alt={movie.title}
                        />

                        {/* INFO */}
                        <div className="favorite-info">

                            <div className="favorite-top">

                                <strong>
                                    {movie.title}
                                </strong>

                                <span>

                                    <Star size={14} />

                                    {movie.vote_average?.toFixed(1)}

                                </span>

                            </div>

                            {/* ACTIONS */}
                            <div className="favorite-actions">

                                <Link
                                    to={`/filme/${movie.id}`}
                                >
                                    Ver detalhes
                                </Link>

                                <button
                                    onClick={() =>
                                        handleDeleteMovie(movie.id)
                                    }
                                >

                                    <Trash2 size={16} />

                                    Remover

                                </button>

                            </div>

                        </div>

                    </article>

                ))}

            </section>

        </main>
    );
}

export default Favoritos;

