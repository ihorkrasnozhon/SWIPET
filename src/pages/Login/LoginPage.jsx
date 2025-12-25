import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./AuthPages.css";

const LoginPage = ({ setUser }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const responce = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await responce.json();

            if (responce.ok) {

                if(typeof setUser === 'function') {
                    setUser(data.user);
                    navigate('/swipes');
                }

            } else {
                alert(data.message || "Login error");
            }
        } catch (error) {
            console.error(error);
            alert("Internal server error")
        }
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
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <div className="auth-card__field">
                        <label className="auth-card__label">Password </label>
                        <input
                            name="password"
                            type="password"
                            className="auth-card__input"
                            onChange={handleChange}
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