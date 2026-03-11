import { useCurrentTemperatureUnit } from "../../../../contexts/CurrentTemperatureUnitContext.jsx";
import "./WeatherCard.css";
import { weatherConditionImages } from "../../../../utils/constants";

function WeatherCard({ weatherData }) {
    const { currentTempUnit = "F" } = useCurrentTemperatureUnit();

    const timeOfDay =
        weatherData?.timeOfDay ?? (weatherData?.isDay ? "day" : "night");
    const condition = (
        weatherData?.weatherCondition ?? "default"
    ).toLowerCase();

    const weatherCardImage =
        weatherConditionImages?.[timeOfDay] &&
        weatherConditionImages[timeOfDay][condition]
            ? weatherConditionImages[timeOfDay][condition]
            : weatherConditionImages?.[timeOfDay]?.default ??
              weatherConditionImages.day.default;

    const temp =
        typeof weatherData?.temp === "object"
            ? weatherData.temp[currentTempUnit] ?? weatherData.temp.F
            : weatherData?.temp ?? 0;

    return (
        <section className="weather-card">
            <img
                className="weather-card__image"
                src={weatherCardImage.image}
                alt={weatherCardImage.alt}
            />
            <p className="weather-card__temp">
                {temp}&deg; {currentTempUnit}
            </p>
        </section>
    );
}

export default WeatherCard;
