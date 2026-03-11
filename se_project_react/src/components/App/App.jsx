import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "./ItemModal/ItemModal";
import ProtectedRoute from "../ProtectedRoute.jsx";

import { getWeatherData } from "../../utils/weatherApi";
import {
    getCurrentPosition,
    getFallbackCoordinates,
} from "../../utils/geolocation";
import {
    addItem,
    getClothingItems,
    deleteItem,
    addCardLike,
    removeCardLike,
} from "../../utils/api";
import { CurrentTemperatureUnitProvider } from "../../contexts/CurrentTemperatureUnitContext.jsx";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { useAuth } from "../../contexts/AuthContext.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import { defaultClothingItems } from "../../utils/ClothingItems.js";
import { getUserInfo } from "../../utils/api";
import { updateUserProfile } from "../../utils/api";

function App() {
    const { user, token, loading, register, login, logout, setUser } =
        useAuth();
    const [activeModal, setActiveModal] = useState("");
    const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);
    const [clothingItems, setClothingItems] = useState([]);
    const [selectedCard, setselectedCard] = useState({});
    const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
    const [cardToDelete, setCardToDelete] = useState(null);
    const [registerError, setRegisterError] = useState("");

    function handleOpenRegisterModal() {
        setActiveModal("register-modal");
        setIsAnyModalOpen(true);
        setRegisterError(""); // Clear error on open
        // Clear register form fields by dispatching a custom event
        window.dispatchEvent(new Event("clear-register-form"));
    }
    function handleOpenLoginModal() {
        setActiveModal("login-modal");
        setIsAnyModalOpen(true);
        // Clear login form fields by dispatching a custom event
        window.dispatchEvent(new Event("clear-login-form"));
    }
    function handleOpenEditProfileModal() {
        setActiveModal("edit-profile-modal");
        setIsAnyModalOpen(true);
    }

    function handleOpenItemModal(card) {
        setActiveModal("item-modal");
        setIsAnyModalOpen(true);
        setselectedCard(card);
    }

    function handleOpenAddGarmentModal() {
        setActiveModal("add-garment-modal");
        setIsAnyModalOpen(true);
    }

    function handleOpenConfirmationModal(card) {
        setActiveModal("delete-confirmation-modal");
        setIsAnyModalOpen(true);
        setCardToDelete(card);
    }
    function handleModalClose() {
        setActiveModal("");
        setIsAnyModalOpen(false);
        setCardToDelete(null);
    }

    // REGISTER/Signup function
    function handleRegister(values) {
        // Do not close modal or set error here; let RegisterModal handle it
        return register({
            name: values.name,
            email: values.email,
            password: values.password,
            avatar: values.avatar,
        });
    }

    // LOGIN function
    function handleLogin(values) {
        // Just return the login promise; let LoginModal handle errors
        return login(values.email, values.password);
    }
    // LOGOUT function
    function handleLogout() {
        logout();
        // Optionally, navigate to home
        navigate("/");
    }

    useEffect(() => {
        if (!token) return;

        getUserInfo(token)
            .then((userData) => {
                setUser(userData);
            })
            .catch((err) => {
                console.error("Token check failed:", err);
                setUser(null);
            });
    }, [token, setUser]);

    function getWeatherCondition(temperature) {
        if (temperature >= 82) {
            return "hot";
        } else if (temperature >= 66) {
            return "warm";
        } else {
            return "cold";
        }
    }

    function handleAddItemSubmit(inputValues) {
        addItem({ ...inputValues, token })
            .then((res) => {
                setClothingItems([res.data, ...clothingItems]);
            })
            .catch(console.error);
    }

    function handleDeleteItem() {
        deleteItem(cardToDelete._id, token)
            .then(() => {
                const result = clothingItems.filter((clothingItem) => {
                    return clothingItem._id !== cardToDelete._id;
                });
                setClothingItems(result);
                handleModalClose();
            })
            .catch(console.error);
    }
    function handleCardLike({ id, isLiked }) {
        if (!isLiked) {
            // Like the item
            addCardLike(id, token)
                .then((updatedCard) => {
                    setClothingItems((cards) =>
                        cards.map((item) =>
                            item._id === id ? updatedCard.data : item
                        )
                    );
                })
                .catch(console.error);
        } else {
            // Unlike the item
            removeCardLike(id, token)
                .then((updatedCard) => {
                    setClothingItems((cards) =>
                        cards.map((item) =>
                            item._id === id ? updatedCard.data : item
                        )
                    );
                })
                .catch(console.error);
        }
    }
    function handleEditProfile(values) {
        console.log("[App] handleEditProfile called. Token:", token);
        updateUserProfile({ ...values, token })
            .then((updatedUser) => {
                setUser(updatedUser);
            })
            .catch((err) => {
                console.error("Profile update failed:", err);
            });
    }

    useEffect(() => {
        // First try to get user's current location
        getCurrentPosition()
            .then((coordinates) => {
                return getWeatherData(coordinates);
            })
            .catch(() => {
                const fallbackCoords = getFallbackCoordinates();
                return getWeatherData(fallbackCoords);
            })
            .then((data) => {
                // If data is already transformed, just set it
                if (data && data.temp && data.location) {
                    setWeatherData(data);
                    return;
                }
                // Otherwise, transform the raw API response
                if (!data || !data.main || typeof data.main.temp !== "number") {
                    console.error("Weather API returned invalid data:", data);
                    return;
                }
                const transformed = {
                    temp: {
                        F: Math.round(data.main.temp),
                        C: Math.round(((data.main.temp - 32) * 5) / 9),
                    },
                    location: data.name,
                    timestamp: data.dt,
                    isDay:
                        data.dt > data.sys.sunrise && data.dt < data.sys.sunset,
                    timeOfDay:
                        data.dt > data.sys.sunrise && data.dt < data.sys.sunset
                            ? "day"
                            : "night",
                    weather:
                        data.weather && data.weather[0]
                            ? data.weather[0].main
                            : "",
                    icon:
                        data.weather && data.weather[0]
                            ? data.weather[0].icon
                            : "",
                };
                setWeatherData(transformed);
            })
            .catch((weatherError) => {
                console.error("Failed to get weather data:", weatherError);
            });
    }, []);

    useEffect(() => {
        getClothingItems()
            .then((dbItems) => {
                setClothingItems([...dbItems, ...defaultClothingItems]);
            })
            .catch(console.error);
    }, []);

    return (
        <CurrentTemperatureUnitProvider>
            <div className="app">
                <Header
                    weatherData={weatherData}
                    handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                    handleOpenRegisterModal={handleOpenRegisterModal}
                    handleOpenLoginModal={handleOpenLoginModal}
                    handleLogout={handleLogout}
                    handleOpenEditProfileModal={handleOpenEditProfileModal}
                    isAnyModalOpen={isAnyModalOpen}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Main
                                weatherData={weatherData}
                                clothingItems={clothingItems}
                                handleOpenItemModal={handleOpenItemModal}
                                getWeatherCondition={getWeatherCondition}
                                currentUser={user}
                                onCardLike={handleCardLike}
                            />
                        }
                    ></Route>
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile
                                    clothingItems={clothingItems}
                                    handleOpenItemModal={handleOpenItemModal}
                                    handleOpenAddGarmentModal={
                                        handleOpenAddGarmentModal
                                    }
                                    handleOpenEditProfileModal={
                                        handleOpenEditProfileModal
                                    }
                                    onCardLike={handleCardLike}
                                    currentUser={user}
                                />
                            </ProtectedRoute>
                        }
                    ></Route>
                </Routes>
                <Footer />
                <RegisterModal
                    isOpen={activeModal === "register-modal"}
                    onClose={handleModalClose}
                    onRegister={handleRegister}
                    handleOpenLoginModal={handleOpenLoginModal}
                />
                <LoginModal
                    isOpen={activeModal === "login-modal"}
                    onClose={handleModalClose}
                    onLogin={handleLogin}
                    handleOpenRegisterModal={handleOpenRegisterModal}
                />
                <ItemModal
                    card={selectedCard}
                    isOpen={activeModal === "item-modal"}
                    onClose={handleModalClose}
                    handleOpenConfirmationModal={handleOpenConfirmationModal}
                />

                <AddItemModal
                    isOpen={activeModal === "add-garment-modal"}
                    onClose={handleModalClose}
                    onAddItem={handleAddItemSubmit}
                />
                <EditProfileModal
                    isOpen={activeModal === "edit-profile-modal"}
                    onClose={handleModalClose}
                    onEditProfile={handleEditProfile}
                />
                <DeleteConfirmationModal
                    isOpen={activeModal === "delete-confirmation-modal"}
                    onClose={handleModalClose}
                    onConfirm={handleDeleteItem}
                />
            </div>
        </CurrentTemperatureUnitProvider>
    );
}

export default App;
