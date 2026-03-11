import { useMemo } from "react";
import { useCurrentTemperatureUnit } from "../../../contexts/CurrentTemperatureUnitContext";
import { useAuth } from "../../../contexts/AuthContext.jsx";

import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";

function Main({
    clothingItems,
    handleOpenItemModal,
    weatherData,
    getWeatherCondition,
    onCardLike,
}) {
    const { currentTempUnit = "F" } = useCurrentTemperatureUnit();
    const { user } = useAuth();

    console.log("[Main] weatherData:", weatherData);
    console.log("[Main] clothingItems:", clothingItems);

    const tempToShow =
        weatherData?.temp?.[currentTempUnit] ?? weatherData?.temp ?? "0";

    const weatherCondition = getWeatherCondition(weatherData.temp.F);
    console.log("[Main] weatherCondition:", weatherCondition);

    const itemsToShow = useMemo(() => {
        if (!weatherCondition) return clothingItems;
        const filtered = clothingItems.filter(
            (item) =>
                (item.weather || "").toLowerCase() ===
                weatherCondition.toLowerCase()
        );
        console.log("[Main] itemsToShow (filtered):", filtered);
        return filtered;
    }, [clothingItems, weatherCondition]);

    const isItemLiked = (item) =>
        user && item.likes && item.likes.includes(user?._id);

    return (
        <main className="main">
            <WeatherCard weatherData={weatherData} />
            <p className="main__text">
                Today is {tempToShow}&deg; {currentTempUnit} / You may want to
                wear:
            </p>
            <ul className="main__card-list">
                {itemsToShow.map((item) => (
                    <ItemCard
                        key={item._id}
                        clothingItem={item}
                        isLiked={isItemLiked(item)}
                        onCardLike={onCardLike}
                        onCardClick={handleOpenItemModal}
                    />
                ))}
            </ul>
        </main>
    );
}

export default Main;
