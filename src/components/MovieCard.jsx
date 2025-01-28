// import React from 'react';
import { Link } from 'react-router-dom';
import 'video.js/dist/video-js.css';
import '../styles/MovieCard.css';
import PropTypes from 'prop-types';

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        posterUrl: PropTypes.string,
        hashtags: PropTypes.string.isRequired,
    }).isRequired,
};

function MovieCard({ movie }) {
    return (
        <div className="movie-card">
            <img src={movie.posterUrl} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <div className="hashtags">
                {movie.hashtags.split(',').map((hashtag, index) => (
                    <Link to={`/search/${hashtag.split('#')}`} key={index}>
                        {hashtag}
                    </Link>
                ))}
            </div>

            <Link to={`/movie/${movie.id}`}>Смотреть</Link>
        </div>
    );
}

export default MovieCard;