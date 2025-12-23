import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SwipesPage from './pages/SwipesPage/Swipes.jsx';
import LoginPage from "./pages/Login/LoginPage.jsx";
import RegisterPage from "./pages/Login/RegisterPage.jsx";
import "./App.css"
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/swipes" element={<SwipesPage />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Router>
    );
}

export default App;