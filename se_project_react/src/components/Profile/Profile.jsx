// import { Link } from "react-router-dom";
import ClothesSection from "./ClothesSection/ClothesSection";
import Sidebar from "./Sidebar/Sidebar";
import { useAuth } from "../../contexts/AuthContext.jsx";

import "./Profile.css";

function Profile({
    clothingItems,
    handleOpenItemModal,
    handleOpenAddGarmentModal,
    onCardLike,
    handleOpenEditProfileModal,
}) {
    const { user } = useAuth();

    return (
        <main className="profile">
            <Sidebar handleOpenEditProfileModal={handleOpenEditProfileModal} />
            <ClothesSection
                clothingItems={clothingItems}
                handleOpenItemModal={handleOpenItemModal}
                handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                onCardLike={onCardLike}
            />
        </main>
    );
}

export default Profile;
