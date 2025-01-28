import { useState, useEffect } from 'react';
import 'video.js/dist/video-js.css';
import { useParams } from 'react-router-dom';
import { getMovieById, addComment, getCommentByMovieId } from '../services/api';
import '../styles/MoviePage.css';

function MoviePage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const MAX_COMMENT_LENGTH = 70;

    useEffect(() => {
        getMovieById(id)
            .then(setMovie)
            .catch(() => setMovie(null));
    }, [id]);

    const fetchComments = async () => {
        try {
            const data = await getCommentByMovieId(id);
            setComments(Array.isArray(data) ? data : []);
        } catch (error) {
            setComments([]);
        }
    };

    useEffect(() => {
        fetchComments();
        const interval = setInterval(fetchComments, 20000);

        return () => clearInterval(interval);
    }, [id]);

    const handleCommentSubmit = async () => {
        if (comment.trim() === '' || comment.length > MAX_COMMENT_LENGTH) return;
        await addComment(id, comment);
        setComment('');
        fetchComments();
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
    }

    if (!movie) return <p>Загрузка...</p>;

    return (
        <div className="movie-page">
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
            <video
                className="video-js vjs-default-skin"
                controls
                data-setup='{}'
                onContextMenu={handleContextMenu}
                controlsList="nodownload"
            >
                <source src={`http://localhost:5000/api/v1/movies/${id}/stream`} />
            </video>
            <h2>Комментарии</h2>
            {comments.length > 0 ? (
                comments.map((c, index) => (
                    <div key={index} className="comment">
                        <p><strong>{c.user}</strong>: {c.text}</p>
                    </div>
                ))
            ) : (
                <p>Комментариев пока нет</p>
            )}
            <input
                type="text"
                value={comment}
                maxLength={MAX_COMMENT_LENGTH}
                onChange={(e) => setComment(e.target.value)}
                placeholder={`Оставьте комментарий (макс. ${MAX_COMMENT_LENGTH} символов)`}
            />
            <button onClick={handleCommentSubmit} disabled={comment.length > MAX_COMMENT_LENGTH || comment.length < 1}>
                Добавить комментарий
            </button>
        </div>
    );
}

export default MoviePage;
