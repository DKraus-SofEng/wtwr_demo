import { BASE_URL } from "./config";

const handleResponse = async (res) => {
    const data = await res.json();
    if (res.ok) return data;
    return Promise.reject(data.message || "Token check failed");
};

// SIGNUP (REGISTER) function
export const signup = ({ name, avatar, email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, avatar, email, password }),
    }).then(handleResponse);
};

// SIGNIN (LOGIN) function
export const signin = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    }).then(handleResponse);
};

// CHECK TOKEN function
export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then(handleResponse);
};
