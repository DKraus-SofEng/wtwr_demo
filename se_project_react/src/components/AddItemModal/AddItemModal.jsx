import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import "./AddItemModal.css";

function AddItemModal({ isOpen, onClose, onAddItem }) {
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
        imageUrl: {
            required: { message: "Image URL is required" },
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
    } = useFormWithValidation(
        {
            name: "",
            imageUrl: "",
            weather: "hot",
        },
        validationRules
    );

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (isValid) {
            onAddItem(values);
            handleReset();
            onClose();
        }
    };

    const handleModalClose = () => {
        handleReset();
        onClose();
    };
    if (!isOpen) return null;
    return (
        <ModalWithForm
            isOpen={isOpen}
            onClose={handleModalClose}
            title="New Garment"
            buttonText="Add Garment"
            name="add-garment-form"
            handleSubmit={handleFormSubmit}
            isValid={isValid}
        >
            <fieldset className="modal__fieldset">
                <label htmlFor="add-name-input" className="modal__label">
                    Name{" "}
                    <input
                        id="add-name-input"
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
                <label
                    htmlFor="add-garment-image-input"
                    className="modal__label"
                >
                    Image
                    <input
                        id="add-garment-image-input"
                        name="imageUrl"
                        type="url"
                        className={`modal__input ${
                            getFieldError("imageUrl")
                                ? "modal__input_type_error"
                                : ""
                        }`}
                        placeholder="Image URL"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.imageUrl}
                    />
                    {getFieldError("imageUrl") && (
                        <span className="modal__error">
                            {getFieldError("imageUrl")}
                        </span>
                    )}
                </label>
            </fieldset>
            <fieldset className="modal__fieldset modal__fieldset_type_radio">
                <legend className="modal__legend">
                    Select the weather type:
                </legend>

                <div>
                    <input
                        className="modal__radio-btn"
                        type="radio"
                        id="hot"
                        name="weather"
                        value="hot"
                        onChange={handleChange}
                        checked={values.weather === "hot"}
                    />
                    <label className="modal__label" htmlFor="hot">
                        Hot
                    </label>
                </div>

                <div>
                    <input
                        className="modal__radio-btn"
                        type="radio"
                        id="warm"
                        name="weather"
                        value="warm"
                        checked={values.weather === "warm"}
                        onChange={handleChange}
                    />
                    <label className="modal__label" htmlFor="warm">
                        Warm
                    </label>
                </div>

                <div>
                    <input
                        className="modal__radio-btn"
                        type="radio"
                        id="cold"
                        name="weather"
                        value="cold"
                        checked={values.weather === "cold"}
                        onChange={handleChange}
                    />
                    <label className="modal__label" htmlFor="cold">
                        Cold
                    </label>
                </div>
            </fieldset>
        </ModalWithForm>
    );
}

export default AddItemModal;
