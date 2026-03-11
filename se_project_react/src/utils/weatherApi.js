import { apiKey } from "./constants";
//  api.openweathermap.org

export function getWeatherData(coordinates) {
    const { lat, lon } = coordinates;
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    )
        .then((res) => {
            return res.ok
                ? res.json()
                : Promise.reject(`Error from weather API: ${res.status}`);
        })
        .then((data) => parseWeatherData(data));
}

function parseWeatherData(data) {
    const parsedData = { temp: {} };
    parsedData.location = data.name;

    parsedData.temp.F = Math.round(data.main.temp);
    parsedData.temp.C = Math.round(((data.main.temp - 32) * 5) / 9);

    const timeInSeconds = data.dt ?? Math.floor(Date.now() / 1000);
    parsedData.timestamp = timeInSeconds;

    const sunrise = data.sys?.sunrise ?? 0;
    const sunset = data.sys?.sunset ?? Number.MAX_SAFE_INTEGER;
    parsedData.isDay = isDay(sunrise, sunset, timeInSeconds);
    parsedData.timeOfDay = parsedData.isDay ? "day" : "night";
    parsedData.weatherCondition = (
        data.weather?.[0]?.main || "default"
    ).toLowerCase();

    return parsedData;
}

function isDay(sunrise, sunset, timeInSeconds) {
    if (typeof timeInSeconds !== "number")
        timeInSeconds = Math.floor(Date.now() / 1000);
    return timeInSeconds >= sunrise && timeInSeconds <= sunset;
}
