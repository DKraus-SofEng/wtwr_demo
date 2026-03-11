import "./ClothesSection.css";
import ItemCard from "../../App/Main/ItemCard/ItemCard";
import { useAuth } from "../../../contexts/AuthContext.jsx";

function ClothesSection({
    clothingItems,
    handleOpenItemModal,
    handleOpenAddGarmentModal,
    onCardLike,
}) {
    const { user } = useAuth();

    const userItems = clothingItems.filter(
        (item) =>
            item.owner &&
            (typeof item.owner === "string" ? item.owner : item.owner._id) ===
                user._id
    );

    return (
        <section className="clothes-section">
            <div className="clothes-section__row">
                <p className="clothes-section__text">Your Items</p>
                <button
                    onClick={handleOpenAddGarmentModal}
                    className="clothes-section__btn"
                >
                    + Add new
                </button>
            </div>
            <ul className="clothes-section__card-list">
                {userItems.map((item) => (
                    <ItemCard
                        key={item._id}
                        clothingItem={item}
                        isLiked={
                            item.likes && user && item.likes.includes(user._id)
                        }
                        onCardLike={onCardLike}
                        onCardClick={handleOpenItemModal}
                    />
                ))}
            </ul>
        </section>
    );
}

export default ClothesSection;
