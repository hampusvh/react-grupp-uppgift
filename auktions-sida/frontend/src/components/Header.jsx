import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
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
                                `${styles.navLink} ${isActive ? styles.active : ""}`}>
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
                </ul>
            </nav>
        </header>
    );
};

export default Header;