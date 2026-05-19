import {
    useEffect,
    useState,
    useCallback
} from "react";

import {
    useSearchParams
} from "react-router-dom";

import api from "../../services/api";

import SearchBar from "../../components/SearchBar";

import MovieCard from "../../components/MovieCard";

import MovieSkeleton from "../../components/MovieSkeleton";

import "./search.css";
import BackButton from "../../components/BackButton";

function SearchPage() {

    /**
     * Query params da URL
     */
    const [searchParams, setSearchParams] =
        useSearchParams();

    /**
     * Texto da busca
     */
    const [query, setQuery] = useState(
        searchParams.get("q") || ""
    );

    /**
     * Filmes encontrados
     */
    const [movies, setMovies] = useState([]);

    /**
     * Loading
     */
    const [loading, setLoading] =
        useState(false);

    /**
     * Busca automática
     */
    useEffect(() => {

        /**
         * Busca vazia
         */
        if (!query.trim()) {

            setMovies([]);

            return;
        }

        /**
         * Atualiza URL
         */
        setSearchParams({
            q: query
        });

        /**
         * Debounce
         */
        const delay =
            setTimeout(() => {

                loadMovies();

            }, 700);

        return () =>
            clearTimeout(delay);

    }, [query]);

    /**
     * Busca filmes
     */
    const loadMovies = useCallback(async () => {

        try {

            setLoading(true);

            const response =
                await api.get(
                    "search/movie",
                    {
                        params: {
                            api_key:
                                process.env.REACT_APP_API_KEY,
                            language: "pt-BR",
                            query
                        }
                    }
                );

            setMovies(
                response.data.results
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    }, [query, loadMovies, setSearchParams]);

    return (

        <main className="search-page">

            {/* HEADER */}
            <div className="search-header">
                <BackButton />

                <h1>
                    Buscar filmes
                </h1>

                <p>
                    Explore milhares de filmes
                </p>

            </div>

            {/* SEARCH */}
            <SearchBar
                value={query}
                onChange={(e) =>
                    setQuery(e.target.value)
                }
                placeholder="Digite o nome do filme..."
            />

            {/* RESULTADOS */}
            <section className="search-grid">

                {/* SKELETON */}
                {loading && (

                    [...Array(8)].map((_, index) => (

                        <MovieSkeleton
                            key={index}
                        />

                    ))

                )}

                {/* FILMES */}
                {!loading && movies.map((movie) => (

                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />

                ))}

            </section>

        </main>
    );
}

export default SearchPage;
