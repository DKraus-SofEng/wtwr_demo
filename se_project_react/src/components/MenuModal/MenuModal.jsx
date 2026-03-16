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
            <button
                className="menu-modal__close"
                onClick={onClose}
                aria-label="close icon"
                title="Close menu"
            >
                &times;
            </button>
            {user ? (
                <>
                    {user.avatar ? (
                        <img
                            className="menu-modal__avatar"
                            src={user.avatar}
                            alt="avatar"
                            aria-label="User avatar"
                            title="User avatar"
                        />
                    ) : (
                        <div
                            className="avatar-placeholder menu-modal__avatar-placeholder"
                            aria-label="User avatar placeholder"
                            title="User avatar placeholder"
                        >
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div className="menu-modal__userName">{user.name}</div>
                    <ToggleSwitch />
                    <button
                        className="menu-modal__action"
                        onClick={onAddClothes}
                        aria-label="Add clothes"
                        title="Add clothes"
                    >
                        + Add clothes
                    </button>
                    <button
                        className="menu-modal__action"
                        onClick={onChangeProfile}
                        aria-label="Change profile data"
                        title="Change profile data"
                    >
                        Change profile data
                    </button>
                    <button
                        className="menu-modal__action"
                        onClick={onLogout}
                        aria-label="Log out"
                        title="Log out"
                    >
                        Log out
                    </button>
                </>
            ) : (
                <>
                    <ToggleSwitch />
                    <button
                        className="menu-modal__action"
                        onClick={onSignup}
                        aria-label="Sign up"
                        title="Sign up"
                    >
                        Sign up
                    </button>
                    <button
                        className="menu-modal__action"
                        onClick={onLogin}
                        aria-label="Log in"
                        title="Log in"
                    >
                        Log in
                    </button>
                </>
            )}
        </div>
    );
};

export default MenuModal;
