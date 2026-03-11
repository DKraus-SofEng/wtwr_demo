import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useEffect } from "react";

function EditProfileModal({ isOpen, onClose, onEditProfile }) {
    const { user } = useAuth();
    // Validation rules
    const validationRules = {
        name: {
            required: { message: "Name is required" },
            minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
            },
            maxLength: {
                value: 30,
                message: "Name must be no more than 30 characters",
            },
        },
        avatar: {
            required: { message: "An image URL is required" },
            pattern: {
                value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$/i,
                message:
                    "Please enter a valid image URL (jpg, jpeg, png, gif, bmp, webp)",
            },
        },
    };

    const {
        values,
        errors,
        isValid,
        handleChange,
        handleBlur,
        handleReset,
        getFieldError,
        setValues,
    } = useFormWithValidation(
        {
            name: user?.name || "",
            avatar: user?.avatar || "",
        },
        validationRules
    );

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(
            "[EditProfileModal] Submit clicked. isValid:",
            isValid,
            "values:",
            values
        );
        if (isValid) {
            onEditProfile(values);
            handleReset();
            onClose();
        } else {
            console.log(
                "[EditProfileModal] Form is not valid. Errors:",
                errors
            );
        }
    };

    const handleModalClose = () => {
        handleReset();
        onClose();
    };
    // Pre-fill form when modal opens
    useEffect(() => {
        if (isOpen && user) {
            setValues({
                name: user.name || "",
                avatar: user.avatar || "",
            });
        }
    }, [isOpen, user, setValues]);

    if (!isOpen) return null;
    return (
        <ModalWithForm
            isOpen={isOpen}
            onClose={handleModalClose}
            title="Change profile data"
            buttonText="Save changes"
            name="edit-profile-form"
            handleSubmit={handleFormSubmit}
            isValid={isValid}
        >
            <fieldset className="modal__fieldset">
                {/* NAME INPUT */}
                <label htmlFor="name-input" className="modal__label">
                    Name*{" "}
                    <input
                        id="name-input-2"
                        name="name"
                        type="text"
                        className={`modal__input ${
                            getFieldError("name")
                                ? "modal__input_type_error"
                                : ""
                        }`}
                        placeholder="Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                    />
                    {getFieldError("name") && (
                        <span className="modal__error">
                            {getFieldError("name")}
                        </span>
                    )}
                </label>
                {/* AVATAR INPUT */}
                <label htmlFor="avatar-input" className="modal__label">
                    Avatar URL*{" "}
                    <input
                        id="avatar-input-2"
                        name="avatar"
                        type="url"
                        className={`modal__input ${
                            getFieldError("avatar")
                                ? "modal__input_type_error"
                                : ""
                        }`}
                        placeholder="Avatar URL"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.avatar}
                    />
                    {getFieldError("avatar") && (
                        <span className="modal__error">
                            {getFieldError("avatar")}
                        </span>
                    )}
                </label>
            </fieldset>
        </ModalWithForm>
    );
}

export default EditProfileModal;
