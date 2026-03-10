import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import { useState } from "react";
import MenuModal from "../../MenuModal/MenuModal";

function Header({
    handleOpenAddGarmentModal,
    weatherData,
    handleOpenRegisterModal,
    handleOpenLoginModal,
    handleLogout,
    handleOpenEditProfileModal,
    isAnyModalOpen, // <-- pass this from App.jsx
}) {
    const { user } = useAuth();
    const now = new Date();
    const dateStr = now.toLocaleString("default", {
        month: "long",
        day: "numeric",
    });
    const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
    const toggleMobileMenu = () => setIsMobileMenuOpened((prev) => !prev);

    const handleLoginAndCloseMenu = () => {
        handleOpenLoginModal();
        setIsMobileMenuOpened(false);
    };

    const handleSignupAndCloseMenu = () => {
        handleOpenRegisterModal();
        setIsMobileMenuOpened(false);
    };

    const handleAddGarmentAndCloseMenu = () => {
        handleOpenAddGarmentModal();
        setIsMobileMenuOpened(false);
    };

    const handleEditProfileAndCloseMenu = () => {
        handleOpenEditProfileModal();
        setIsMobileMenuOpened(false);
    };

    return (
        <>
            <header className="header">
                {/* Left side: logo and location */}
                <div className="header__side">
                    <Link
                        to="/"
                        aria-label="Go to home page"
                        title="Go to home page"
                    >
                        <img
                            className="header__logo"
                            src={logo}
                            alt="wtwr logo"
                            aria-label="WTWR: Click to return to home page"
                            title="WTWR: Click to return to home page"
                        />
                    </Link>
                    <p
                        className="header__location"
                        aria-label={`Current location and date: ${dateStr}`}
                        title={`Current location and date: ${dateStr}`}
                    >
                        <time className="header__dateTime" dateTime={now}>
                            {dateStr}
                        </time>
                        , {weatherData.location}
                    </p>
                </div>
                {/* Mobile layout: stacked rows for logo/date/location and user info */}
                <div className="header__mobile-wrapper">
                    <div className="header__mobile-top">
                        <Link
                            to="/"
                            aria-label="Go to home page"
                            title="Go to home page"
                        >
                            <img
                                className="header__logo"
                                src={logo}
                                alt="wtwr logo"
                                aria-label="WTWR: Click to return to home page"
                                title="WTWR: Click to return to home page"
                            />
                        </Link>
                        <p className="header__location">
                            <time className="header__dateTime" dateTime={now}>
                                {dateStr}
                            </time>
                            , {weatherData.location}
                        </p>
                    </div>
                    {user && (
                        <div className="header__mobile-user">
                            <span className="header__userName">
                                {user.name}
                            </span>
                            {user.avatar ? (
                                <img
                                    className="header__avatar"
                                    src={user.avatar}
                                    alt={`${user.name}'s avatar`}
                                />
                            ) : (
                                <div className="avatar-placeholder">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {/* Hamburger menu/close button - opens/closes the MenuModal in mobile view */}
                {!isMobileMenuOpened && !isAnyModalOpen ? (
                    <button
                        className="header__menu-btn"
                        onClick={toggleMobileMenu}
                        aria-label="Open menu"
                    >
                        <span className="header__menu-icon"></span>
                    </button>
                ) : null}
                {/* Desktop layout: left and right sides */}
                <div className="header__side header__side--desktop">
                    <ToggleSwitch />
                    {user ? (
                        // Render this if user is logged in
                        <>
                            {/* Add clothes button only for desktop */}
                            <button
                                onClick={handleOpenAddGarmentModal}
                                className="header__add-clothes-btn"
                                aria-label="Add new clothes"
                                title="Add new clothes"
                            >
                                + Add clothes
                            </button>
                            <Link
                                className="header__profile-link"
                                to="/profile"
                            >
                                <p className="header__userName">{user.name}</p>
                                {user.avatar ? (
                                    <img
                                        className="header__avatar"
                                        src={user.avatar}
                                        alt={`${user.name}'s avatar`}
                                    />
                                ) : (
                                    <div className="avatar-placeholder">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </Link>
                        </>
                    ) : (
                        // Render this if user is not logged in
                        <>
                            <button
                                className="header__auth-btn"
                                onClick={handleOpenRegisterModal}
                                aria-label="Sign up for an account"
                                title="Sign up for an account"
                            >
                                Sign Up
                            </button>
                            <button
                                className="header__auth-btn"
                                onClick={handleOpenLoginModal}
                                aria-label="Log in to your account"
                                title="Log in to your account"
                            >
                                Log In
                            </button>
                        </>
                    )}
                </div>
                <MenuModal
                    isOpen={isMobileMenuOpened}
                    onClose={toggleMobileMenu}
                    user={user}
                    onLogin={handleLoginAndCloseMenu}
                    onSignup={handleSignupAndCloseMenu}
                    onLogout={handleLogout}
                    onAddClothes={handleAddGarmentAndCloseMenu}
                    onChangeProfile={handleEditProfileAndCloseMenu}
                    menuPosition={user ? "default" : "high"} // <-- pass prop for placement
                />
            </header>
        </>
    );
}

export default Header;
