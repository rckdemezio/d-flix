import "./movieskeleton.css";

function MovieSkeleton() {

    return (

        <div className="movie-skeleton">

            <div className="skeleton-image"></div>

            <div className="skeleton-content">

                <div className="skeleton-title"></div>

                <div className="skeleton-text"></div>

                <div className="skeleton-text small"></div>

                <div className="skeleton-button"></div>

            </div>

        </div>
    );
}

export default MovieSkeleton;
