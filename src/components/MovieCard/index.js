import { Link } from "react-router-dom";

import {
    Heart,
    Star
} from "lucide-react";

import "./moviecard.css";

/**
 * URL base imagens
 */
const imagePath =
    "https://image.tmdb.org/t/p/original";

function MovieCard({

    movie,
    saved = false

}) {

    return (

        <article
            className={`movie-card ${saved ? "saved-card" : ""}`}
        >

            {/* BADGE */}
            {saved && (

                <div className="saved-badge">

                    <Heart size={14} />

                    Salvo

                </div>

            )}

            {/* POSTER */}
            <img
                src={`${imagePath}${movie.poster_path}`}
                alt={movie.title}
            />

            {/* INFO */}
            <div className="movie-info">

                <div className="movie-top">

                    <strong>
                        {movie.title}
                    </strong>

                    <span>

                        <Star size={14} />

                        {movie.vote_average?.toFixed(1)}

                    </span>

                </div>

                <p>
                    {movie.overview}
                </p>

                <Link to={`/filme/${movie.id}`}>
                    Ver detalhes
                </Link>

            </div>

        </article>
    );
}

export default MovieCard;
