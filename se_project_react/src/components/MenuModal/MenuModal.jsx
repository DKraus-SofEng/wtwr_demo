import React from "react";
import "./MenuModal.css";
import ToggleSwitch from "../App/ToggleSwitch/ToggleSwitch";

const MenuModal = ({
    isOpen,
    onClose,
    user,
    onLogin,
    onSignup,
    onLogout,
    onAddClothes,
    onChangeProfile,
    menuPosition = "default", // <-- new prop
}) => {
    if (!isOpen) return null;

    // Choose style based on menuPosition
    const modalClass =
        menuPosition === "high" ? "menu-modal menu-modal_high" : "menu-modal";

    return (
        <div className={modalClass}>
            <button className="menu-modal__close" onClick={onClose}>
                &times;
            </button>
            {user ? (
                <>
                    {user.avatar ? (
                        <img
                            className="menu-modal__avatar"
                            src={user.avatar}
                            alt="avatar"
                        />
                    ) : (
                        <div className="avatar-placeholder menu-modal__avatar-placeholder">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div className="menu-modal__userName">{user.name}</div>
                    <ToggleSwitch />
                    <button className="menu-modal__btn" onClick={onAddClothes}>
                        Add clothes
                    </button>
                    <button
                        className="menu-modal__btn"
                        onClick={onChangeProfile}
                    >
                        Change profile data
                    </button>
                    <button className="menu-modal__btn" onClick={onLogout}>
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <ToggleSwitch />
                    <button className="menu-modal__btn" onClick={onSignup}>
                        Sign up
                    </button>
                    <button className="menu-modal__btn" onClick={onLogin}>
                        Log in
                    </button>
                </>
            )}
        </div>
    );
};

export default MenuModal;
