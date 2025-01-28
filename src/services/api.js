const API_URL = 'http://localhost:5000/api/v1';

export const getMovies = async () => {
    const response = await fetch(`${API_URL}/movies`);
    return response.json();
};

export const getMovieById = async (id) => {
    const response = await fetch(`${API_URL}/movies/${id}`);
    return response.json();
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

