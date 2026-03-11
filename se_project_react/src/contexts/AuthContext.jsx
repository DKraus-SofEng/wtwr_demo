import React, { createContext, useContext } from "react";

export const AuthContext = React.createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children, value }) => {
    return (
        <AuthContext.Provider value={value || {}}>
            {children}
        </AuthContext.Provider>
    );
};
