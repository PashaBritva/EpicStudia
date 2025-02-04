import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import MoviePage from './pages/MoviePage.jsx';
import UserPage from './pages/UserPage.jsx';
import Header from './components/Header';
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import darkTheme from "./theme/theme.jsx";
import CreateMoviePage from "./pages/CreatMoviePage.jsx";

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
                    <Router>
                        <Header />
                        <Box sx={{ marginTop: '64px' }}>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/movie/:id" element={<MoviePage />} />
                                <Route path="/user" element={<UserPage />} />
                                <Route path="/user/upload" element={<CreateMoviePage />} />
                            </Routes>
                        </Box>
                    </Router>
            <CssBaseline />
        </ThemeProvider>
    );
}

export default App;
