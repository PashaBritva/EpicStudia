import { useState, useEffect } from "react";
import MovieCard from '../components/MovieCard.jsx';
import { getMovies } from '../services/api';

function HomePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies().then(setMovies);
    }, []);

    return (
        <div className="home-page">
            <h1>Фильмы</h1>
            <div className="movie-list">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
