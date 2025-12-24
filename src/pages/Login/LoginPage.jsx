import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./AuthPages.css";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/swipes');
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-card__title">Login</h1>
                <form className="auth-card__form" onSubmit={handleSubmit}>
                    <div className="auth-card__field">
                        <label className="auth-card__label">Email </label>
                        <input
                            name="email"
                            type="email"
                            className="auth-card__input"
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required={true}
                        />
                    </div>
                    <div className="auth-card__field">
                        <label className="auth-card__label">Password </label>
                        <input
                            name="password"
                            type="password"
                            className="auth-card__input"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required={true}
                        />
                    </div>
                    <button type="submit" className="auth-card__button">Log in</button>
                </form>
                <p className="auth-card__footer">
                    Not registered yet?
                    <li></li>
                    <Link to="/register"
                          className="auth-card__link">
                         Create account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;