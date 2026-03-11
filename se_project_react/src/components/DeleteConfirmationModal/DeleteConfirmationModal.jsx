import "./DeleteConfirmationModal.css";
import closeIcon from "../../assets/close-icon.svg";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
    function handleOverlayClick(e) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div
            className={`delete-confirmation-modal ${
                isOpen ? "delete-confirmation-modal_is-opened" : ""
            }`}
            onClick={handleOverlayClick}
        >
            <div className="delete-confirmation-modal__container">
                <button
                    type="button"
                    className="delete-confirmation-modal__close-btn"
                    onClick={onClose}
                >
                    <img src={closeIcon} alt="close icon" />
                </button>

                <h2 className="delete-confirmation-modal__title">
                    Are you sure you want to delete this item?
                </h2>
                <p className="delete-confirmation-modal__text">
                    This action is irreversible.
                </p>
                <div className="delete-confirmation-modal__buttons">
                    <button
                        type="button"
                        className="delete-confirmation-modal__confirm-btn"
                        onClick={onConfirm}
                    >
                        Yes, delete item
                    </button>
                    <button
                        type="button"
                        className="delete-confirmation-modal__cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmationModal;
