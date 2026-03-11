// ============================================================================
// AUTH PROVIDER COMPONENT
// ============================================================================
// This component wraps our entire app and provides authentication state
// and functions to all child components via Context API
import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { BASE_URL } from "../utils/config";

export const AuthProvider = ({ children }) => {
    // STATE MANAGEMENT
    // user: stores the logged-in user's data (username, email, role, etc.)
    const [user, setUser] = useState(null);

    // token: stores the JWT token for authentication
    // Initialize from localStorage so users stay logged in after page refresh
    const [token, setToken] = useState(localStorage.getItem("jwt"));

    // loading: tracks whether we're verifying the token on app load
    // Prevents flickering UI while checking authentication status
    const [loading, setLoading] = useState(true);

    // EFFECTS
    useEffect(() => {
        const verifyToken = async () => {
            const storedToken = localStorage.getItem("jwt");
            if (storedToken) {
                try {
                    const response = await fetch(`${BASE_URL}/api/auth/me`, {
                        headers: {
                            Authorization: `Bearer ${storedToken}`,
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUser(data.data.user);
                        setToken(storedToken);
                    } else {
                        localStorage.removeItem("jwt");
                        setToken(null);
                    }
                } catch (error) {
                    console.error("Error verifying token:", error);
                    localStorage.removeItem("jwt");
                    setToken(null);
                }
            }
            setLoading(false);
        };
        verifyToken();
    }, []);

    // AUTH FUNCTIONS
    const register = async ({ name, email, password, avatar }) => {
        try {
            const response = await fetch(`${BASE_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, avatar }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("jwt", data.data.token);
                setToken(data.data.token);
                setUser(data.data.user);
                return { success: true, data };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error("Registration error:", error);
            return { success: false, message: "Network error occurred" };
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch(`${BASE_URL}/signin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok && data.token) {
                localStorage.setItem("jwt", data.token);
                setToken(data.token);
                // Fetch user info after login
                const userRes = await fetch(`${BASE_URL}/users/me`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${data.token}`,
                    },
                });
                if (userRes.ok) {
                    const userData = await userRes.json();
                    setUser(userData);
                    return {
                        success: true,
                        data: { token: data.token, user: userData },
                    };
                } else {
                    setUser(null);
                    return {
                        success: false,
                        message: "Failed to fetch user info.",
                    };
                }
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: "Network error occurred" };
        }
    };

    const logout = () => {
        localStorage.removeItem("jwt");
        setToken(null);
        setUser(null);
    };

    // CONTEXT VALUE
    const value = {
        user,
        token,
        loading,
        register,
        login,
        logout,
        setUser,
        setToken,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
