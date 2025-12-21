import React from "react";
import {motion} from "framer-motion";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <motion.div
                className="nav-logo-button"
                whileTap={{scale: 0.9}}
                onClick={() => window.location.reload()}
            >
                <img src="/swipet-logo.png" alt="Swipet Logo" className="swipet-logo-img"/>
            </motion.div>

            <motion.button
                className="nav-profile-btn"
                whileTap={{scale: 0.9}}
            >
                👤
            </motion.button>
        </nav>
    );
};

export default Navbar;