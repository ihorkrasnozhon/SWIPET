import React from "react";
import {motion} from "framer-motion";
import "./Navbar.css";

const Navbar = ({ setUser, onAddPet, navigate }) => {
    const handleLogout = async () => {
        try {
            const responce = await fetch('http://localhost:3001/api/logout', {
                method: 'POST',
                credentials: 'include'
            });

            if (responce.ok) {
                setUser(null);
                navigate('/login');
            }
        } catch (error) {
            alert("Some error ocused", error);
            console.error(error);
        }
    };

    return (
        <nav className="navbar">
            <motion.div
                className="nav-logo-button"
                whileTap={{scale: 0.9}}
                onClick={() => navigate('/swipes')}
            >
                <img src="/swipet-logo.png" alt="Swipet Logo" className="swipet-logo-img"/>
            </motion.div>

            <div className='nav-actions'>
                <motion.button
                    className='nav-add-btn'
                    whileTap={{scale: 0.95}}
                    onClick={onAddPet}
                    title="Add Pet"
                >
                    ➕ Post
                </motion.button>

                <motion.button
                    className="nav-profile-btn"
                    whileTap={{scale: 0.9}}
                    onClick={() => navigate('/profile')}
                >
                    👤 Profile
                </motion.button>

                {/*TODO dont use this button as logout*/}
                <motion.button
                    className="nav-profile-btn"
                    whileTap={{scale: 0.9}}
                    onClick={handleLogout}
                >
                    🚪(LOGOUT)
                </motion.button>
            </div>

        </nav>
    );
};

export default Navbar;
