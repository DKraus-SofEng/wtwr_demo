// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}

const coordinates = { lat: "39.8028", lon: "-105.0875" };
const apiKey = "cbaa164becbae8435a4336c09faa8e3a";

// Import all SVGs as URLS
const dayImages = import.meta.glob(`../assets/day/*.svg`, {
    eager: true,
    as: `url`,
});
const nightImages = import.meta.glob("../assets/night/*.svg", {
    eager: true,
    as: "url",
});

// Helper to get image URL by condition
function getImage(images, condition) {
    return (
        images[
            `../assets/${images === dayImages ? "day" : "night"}/${condition}.svg`
        ] ||
        images[
            `../assets/${images === dayImages ? "day" : "night"}/default.svg`
        ]
    );
}

export const weatherConditionImages = {
    day: {
        clear: {
            name: "clear",
            alt: "clear weather image",
            image: getImage(dayImages, "clear"),
        },
        clouds: {
            name: "cloudy",
            alt: "cloudy weather image",
            image: getImage(dayImages, "clouds"),
        },
        fog: {
            name: "fog",
            alt: "foggy weather image",
            image: getImage(dayImages, "fog"),
        },
        rain: {
            name: "rain",
            alt: "rainy weather image",
            image: getImage(dayImages, "rain"),
        },
        snow: {
            name: "snow",
            alt: "snowy weather image",
            image: getImage(dayImages, "snow"),
        },
        storm: {
            name: "storm",
            alt: "storm weather image",
            image: getImage(dayImages, "storm"),
        },
        default: {
            name: "default",
            alt: "default image",
            image: getImage(dayImages, "default"),
        },
    },
    night: {
        clear: {
            name: "clear",
            alt: "clear weather image",
            image: getImage(nightImages, "clear"),
        },
        clouds: {
            name: "cloudy",
            alt: "cloudy weather image",
            image: getImage(nightImages, "clouds"),
        },
        fog: {
            name: "fog",
            alt: "foggy weather image",
            image: getImage(nightImages, "fog"),
        },
        rain: {
            name: "rain",
            alt: "rainy weather image",
            image: getImage(nightImages, "rain"),
        },
        snow: {
            name: "snow",
            alt: "snowy weather image",
            image: getImage(nightImages, "snow"),
        },
        storm: {
            name: "storm",
            alt: "storm weather image",
            image: getImage(nightImages, "storm"),
        },
        default: {
            name: "default",
            alt: "default image",
            image: getImage(nightImages, "default"),
        },
    },
};

export { coordinates, apiKey };
