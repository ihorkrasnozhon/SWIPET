import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./AuthPages.css";

const RegisterPage = () => {
    const [formData, setFormData] = useState({fullName:'', email:'', password:''});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responce = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password
            }),
            });
            const data = await responce.json();

            if (responce.ok) {
                alert("Your account succesfully created! \n Log in please.");
                navigate('/login');
            }
            else {
                alert(data.message || "Registration error, try again later.")
            }
        } catch (error) {
            console.error("Server error", error);
        }
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
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
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
                    <li></li>
                    <Link to="/login" className="auth-card__link">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;