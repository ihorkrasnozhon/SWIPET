import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SwipesPage from './pages/SwipesPage/Swipes.jsx';
import LoginPage from "./pages/Login/LoginPage.jsx";
import RegisterPage from "./pages/Login/RegisterPage.jsx";
import "./App.css"
function App() {
    const [user, setUser] = useState(null);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/api/islogged', {credentials: 'include'})
            .then(res => res.json())
            .then(data => {
                if (data.loggedIn) {
                    setUser(data.user);
                }
                setIsChecking(false);
            })
            .catch(() => setIsChecking(false));
    }, []);

    if (isChecking) return <div>Loading...</div>;

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={user ? <Navigate to="/swipes" replace /> : <LoginPage setUser={setUser} />}
                />
                <Route
                    path="/swipes"
                    element={user ? <SwipesPage setUser={setUser} /> : <Navigate to="/login" replace />}
                />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Router>
    );
}

export default App;