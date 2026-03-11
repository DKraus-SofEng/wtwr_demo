import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import "./LoginModal.css";
import { useEffect, useState, useRef } from "react";

function LoginModal({ isOpen, onClose, onLogin, handleOpenRegisterModal }) {
    // Validation rules
    const validationRules = {
        email: {
            required: { message: "Email is required" },
            pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: "Please enter a valid email address",
            },
        },
        password: {
            required: { message: "Password is required" },
        },
    };

    const {
        values,
        errors,
        isValid,
        handleChange: handleChangeOriginal,
        handleBlur,
        handleReset,
        getFieldError,
    } = useFormWithValidation(
        {
            email: "",
            password: "",
        },
        validationRules
    );

    const [loginError, setLoginError] = useState("");
    const [touched, setTouched] = useState({});
    const wasSubmitted = useRef(false);
    const [isLoading, setIsLoading] = useState(false);

    // Only clear error when modal opens or closes
    useEffect(() => {
        if (!isOpen) {
            setLoginError("");
        }
    }, [isOpen]);

    const handleChange = (e) => {
        handleChangeOriginal(e);
    };

    const handleFieldBlur = (e) => {
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));
        handleBlur(e);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (isLoading) return; // Prevent double submit
        wasSubmitted.current = true;
        setIsLoading(true);
        if (isValid) {
            try {
                const result = await onLogin(values);
                if (result && result.success) {
                    handleReset();
                    setTouched({});
                    wasSubmitted.current = false;
                    setIsLoading(false);
                    setLoginError(""); // Clear error before closing modal
                    onClose();
                } else {
                    setLoginError(
                        (result && result.message) ||
                            "Login failed:  incorrect email or password."
                    );
                    setIsLoading(false);
                }
            } catch (err) {
                setLoginError("Login failed. Please try again.");
                setIsLoading(false);
                console.error("Login error:", err);
            }
        } else {
            setIsLoading(false);
        }
    };

    const handleModalClose = () => {
        handleReset();
        setLoginError(""); // Clear error when closing modal
        setTouched({});
        wasSubmitted.current = false;
        onClose();
    };

    // Only render modal content if isOpen is true
    if (!isOpen) return null;
    return (
        <ModalWithForm
            isOpen={isOpen}
            onClose={handleModalClose}
            title="Log In"
            buttonText="Log In"
            name="login-form"
            handleSubmit={handleFormSubmit}
            isValid={isValid}
            extraContent={
                <div className="modal__extra">
                    <button
                        type="button"
                        className="modal__extra-link"
                        onClick={handleOpenRegisterModal}
                    >
                        or Sign Up
                    </button>
                </div>
            }
        >
            <fieldset className="modal__fieldset">
                {/* EMAIL INPUT */}
                {isOpen && loginError && (
                    <span className="modal__error modal__error_global">
                        {loginError}
                    </span>
                )}
                <label className="modal__label">
                    Email{" "}
                    <input
                        name="email"
                        type="email"
                        className={`modal__input ${
                            getFieldError("email") &&
                            (touched.email || wasSubmitted.current)
                                ? "modal__input_type_error"
                                : ""
                        }`}
                        placeholder="Email"
                        onChange={handleChange}
                        onBlur={handleFieldBlur}
                        value={values.email}
                    />
                    {getFieldError("email") &&
                        (touched.email || wasSubmitted.current) && (
                            <span className="modal__error">
                                {getFieldError("email")}
                            </span>
                        )}
                </label>
                {/* PASSWORD INPUT */}
                <label className="modal__label">
                    Password{" "}
                    <input
                        name="password"
                        type="password"
                        className={`modal__input ${
                            getFieldError("password") &&
                            (touched.password || wasSubmitted.current)
                                ? "modal__input_type_error"
                                : ""
                        }`}
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handleFieldBlur}
                        value={values.password}
                    />
                    {getFieldError("password") &&
                        (touched.password || wasSubmitted.current) && (
                            <span className="modal__error">
                                {getFieldError("password")}
                            </span>
                        )}
                </label>
            </fieldset>
        </ModalWithForm>
    );
}

export default LoginModal;
