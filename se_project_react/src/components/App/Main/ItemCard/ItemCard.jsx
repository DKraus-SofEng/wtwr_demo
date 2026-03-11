import "./ItemCard.css";
import likeDefault from "../../../../assets/like-icon-default.svg";
import likeActive from "../../../../assets/like-icon-liked.svg";
import { useAuth } from "../../../../contexts/AuthContext.jsx";

function ItemCard({ clothingItem, onCardClick, onCardLike, isLiked }) {
    const { user } = useAuth();
    function handleOpenCard() {
        onCardClick(clothingItem);
    }
    return (
        <li className="card">
            <img
                src={clothingItem.imageUrl}
                alt={clothingItem.name}
                className="card__image"
                onClick={handleOpenCard}
            />
            <div className="card__header">
                <h2 className="card__title">{clothingItem.name}</h2>
                {user && typeof clothingItem._id === "string" && (
                    <button
                        className="card__like-btn"
                        onClick={() =>
                            onCardLike({ id: clothingItem._id, isLiked })
                        }
                    >
                        <img
                            src={isLiked ? likeActive : likeDefault}
                            alt={isLiked ? "Liked" : "Like"}
                        />
                    </button>
                )}
            </div>
        </li>
    );
}

export default ItemCard;
