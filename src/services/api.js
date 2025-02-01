export const API_URL = 'http://192.168.0.16:5000/api/v1';

export const getMovies = async () => {
    const response = await fetch(`${API_URL}/movies`);
    return response.json();
};

export const getMovieById = async (id) => {
    const response = await fetch(`${API_URL}/movies/${id}`);
    return response.json();
};

export const streamMovieById = async (id) => {
    const response = await fetch(`${API_URL}/movies/${id}/stream`);
    return response.arrayBuffer();
};

export const addComment = async (movieId, text) => {
    await fetch(`${API_URL}/movies/${movieId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: 'guest', text }),
    });
};

export const getCommentByMovieId = async (movieId) => {
    const response = await fetch(`${API_URL}/movies/${movieId}/comments`);
    return response.json();
};

export async function getMoviesByHashtags(hashtags) {
    const response = await fetch(`http://${API_URL}/movies/search?hashtags=${encodeURIComponent(hashtags)}`);
    if (!response.ok) {
        throw new Error('Ошибка при поиске фильмов');
    }
    return await response.json();
}
