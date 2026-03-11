// Geolocation utility functions

/**
 * Get the user's current position using the browser's Geolocation API
 * @returns {Promise<{lat: number, lon: number}>} Promise that resolves to coordinates
 */
export function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        // Check if geolocation is supported
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by this browser"));
            return;
        }

        // Options for geolocation
        const options = {
            enableHighAccuracy: true, // Use GPS if available
            timeout: 10000, // 10 second timeout
            maximumAge: 300000, // Accept cached position up to 5 minutes old
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                };
                resolve(coords);
            },
            (error) => {
                let errorMessage;
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location access denied by user";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Location request timed out";
                        break;
                    default:
                        errorMessage =
                            "An unknown error occurred while retrieving location";
                        break;
                }
                reject(new Error(errorMessage));
            },
            options
        );
    });
}

/**
 * Get fallback coordinates (can be used if geolocation fails)
 * @returns {{lat: string, lon: string}} Default coordinates
 */
export function getFallbackCoordinates() {
    // Default to Denver, Colorado (same as current hard-coded coordinates)
    return { lat: "39.8028", lon: "-105.0875" };
}
