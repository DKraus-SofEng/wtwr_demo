// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}

const coordinates = { lat: "39.8028", lon: "-105.0875" };
const apiKey = "cbaa164becbae8435a4336c09faa8e3a";

export const weatherConditionImages = {
    day: {
        clear: {
            name: "clear",
            alt: "clear weather image",
            image: new URL("../assets/day/clear.svg", import.meta.url).href,
        },
        clouds: {
            name: "cloudy",
            alt: "cloudy weather image",
            image: new URL("../assets/day/clouds.svg", import.meta.url).href,
        },
        fog: {
            name: "fog",
            alt: "foggy weather image",
            image: new URL("../assets/day/fog.svg", import.meta.url).href,
        },
        rain: {
            name: "rain",
            alt: "rainy weather image",
            image: new URL("../assets/day/rain.svg", import.meta.url).href,
        },
        snow: {
            name: "snow",
            alt: "snowy weather image",
            image: new URL("../assets/day/snow.svg", import.meta.url).href,
        },
        storm: {
            name: "storm",
            alt: "storm weather image",
            image: new URL("../assets/day/storm.svg", import.meta.url).href,
        },
        default: {
            name: "default",
            alt: "default image",
            image: new URL("../assets/day/default.svg", import.meta.url).href,
        },
    },
    night: {
        clear: {
            name: "clear",
            alt: "clear weather image",
            image: new URL("../assets/night/clear.svg", import.meta.url).href,
        },
        clouds: {
            name: "cloudy",
            alt: "cloudy weather image",
            image: new URL("../assets/night/clouds.svg", import.meta.url).href,
        },
        fog: {
            name: "fog",
            alt: "foggy weather image",
            image: new URL("../assets/night/fog.svg", import.meta.url).href,
        },
        rain: {
            name: "rain",
            alt: "rainy weather image",
            image: new URL("../assets/night/rain.svg", import.meta.url).href,
        },
        snow: {
            name: "snow",
            alt: "snowy weather image",
            image: new URL("../assets/night/snow.svg", import.meta.url).href,
        },
        storm: {
            name: "storm",
            alt: "storm weather image",
            image: new URL("../assets/night/storm.svg", import.meta.url).href,
        },
        default: {
            name: "default",
            alt: "default image",
            image: new URL("../assets/night/default.svg", import.meta.url).href,
        },
    },
};

export { coordinates, apiKey };
