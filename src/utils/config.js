// Centralized API base URL for all API calls
export const BASE_URL =
    process.env.NODE_ENV === "production"
        ? "https://api.wtwr.bot.nu" //TODO update after deployment
        : "http://localhost:8080";
