import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SwipesPage from './pages/SwipesPage/Swipes.jsx';
import "./App.css"
function App() {
    return (
        <Router>
            <Routes>
                {/* Страница входа */}
                {/*<Route path="/login" element={<AuthPage />} />*/}

                {/* Страница со свайпами */}
                <Route path="/swipes" element={<SwipesPage />} />

                {/* Редирект: если зашли на главную, кидаем на логин */}
                {/*<Route path="/" element={<Navigate to="/login" />} />*/}
            </Routes>
        </Router>
    );
}

export default App;