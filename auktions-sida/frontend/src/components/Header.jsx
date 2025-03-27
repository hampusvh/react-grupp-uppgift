import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("darkMode") === "true";
        setDarkMode(saved);
        if (saved) document.body.classList.add("dark");
    }, []);

    const toggleDarkMode = () => {
        const next = !darkMode;
        setDarkMode(next);
        localStorage.setItem("darkMode", next);
        document.body.classList.toggle("dark");
    };

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                <h1>Auktionshuset</h1>
            </Link>

            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li>
                        <NavLink 
                            to="/closed-auctions" 
                            className={({ isActive }) => 
                                `${styles.buttonLink} ${isActive ? styles.active : ""}`}>
                            Avslutade auktioner
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/add-auction" 
                            className={({ isActive }) =>
                                `${styles.addAuction} ${isActive ? styles.active : ""}`}>
                            Sälj
                        </NavLink>
                    </li>
                    <li>
                        <button 
                            onClick={toggleDarkMode} 
                            className={styles.darkModeBtn}
                        >
                            {darkMode ? "☀️ Ljust läge" : "🌙 Mörkt läge"}
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};


export default Header;