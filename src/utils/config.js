// Centralized API base URL for all API calls
export const BASE_URL =
    process.env.NODE_ENV === "production"
        ? "https://wtwr-backend-287197084974.us-central1.run.app"
        : "http://localhost:8080";
