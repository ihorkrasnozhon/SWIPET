import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./AuthPages.css";

const RegisterPage = () => {
    const [formData, setFormData] = useState({fullName:'', email:'', password:''});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        //TODO add registration logic
        navigate('/login');
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-card__title">
                    Registration
                </h1>
                <form className="auth-card__form" onSubmit={handleSubmit}>
                    <div className="auth-card__field">
                        <label className="auth-card__label">Name </label>
                        <input
                            name="fullname"
                            type="text"
                            className="auth-card__input"
                            onChange={(e) => setFormData({...formData, fullname: e.target.value})}
                            required={true}
                        />
                    </div>
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
                    <button type="submit" className="auth-card__button">
                        Register
                    </button>
                </form>
                <p className="auth-card__footer">
                    Already registered?
                    <p></p>
                    <Link to="/login" className="auth-card__link">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;