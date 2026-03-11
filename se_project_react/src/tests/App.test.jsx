import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../components/App/App";
import { AuthProvider, useAuth } from "../contexts/AuthContext.jsx";
import { MemoryRouter } from "react-router-dom";
import RegisterModal from "../components/RegisterModal/RegisterModal"; // Import RegisterModal for testing
import LoginModal from "../components/LoginModal/LoginModal"; // Import LoginModal for testing
import Sidebar from "../components/Profile/Sidebar/Sidebar";
import { vi } from "vitest";
import avatar from "../assets/avatar.png";

describe("App component", () => {
    it("renders without crashing", () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </MemoryRouter>
        );
        // Check for a known element/text in your App, e.g. the header or logo
        expect(screen.getAllByAltText(/wtwr logo/i).length).toBeGreaterThan(0);
    });

    it("opens the menu when the menu button is clicked", () => {
        render(
            <MemoryRouter>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </MemoryRouter>
        );
        const menuButton = screen.getByLabelText(/open menu/i);
        expect(menuButton).toBeInTheDocument();
        menuButton.click();
        // You can add more assertions here to check if the menu appears
    });

    it("renders the RegisterModal and allows form input", () => {
        // Render RegisterModal directly for isolated test
        const handleClose = vi.fn();
        const handleRegister = vi.fn().mockResolvedValue({ success: true });
        const handleOpenLoginModal = vi.fn();
        render(
            <RegisterModal
                isOpen={true}
                onClose={handleClose}
                onRegister={handleRegister}
                handleOpenLoginModal={handleOpenLoginModal}
            />
        );
        // Check for form fields
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getAllByLabelText(/password/i).length).toBeGreaterThan(0);
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/avatar url/i)).toBeInTheDocument();
        // Simulate typing in the email field
        screen.getByLabelText(/email/i).value = "test@example.com";
        // Simulate clicking the close button
        screen.getByRole("button", { name: /close icon/i }).click();
        expect(handleClose).toHaveBeenCalled();
    });

    it("renders the LoginModal and allows form input", () => {
        const handleClose = vi.fn();
        const handleLogin = vi.fn().mockResolvedValue({ success: true });
        render(
            <MemoryRouter>
                <LoginModal
                    isOpen={true}
                    onClose={handleClose}
                    onLogin={handleLogin}
                />
            </MemoryRouter>
        );
        // Check for form fields
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        // Simulate typing in the email field
        screen.getByLabelText(/email/i).value = "user@example.com";
        // Simulate clicking the close button
        screen.getByRole("button", { name: /close icon/i }).click();
        expect(handleClose).toHaveBeenCalled();
    });

    it("renders the Sidebar and allows logout", () => {
        const handleOpenEditProfileModal = vi.fn();
        // Provide a mock user and setUser via AuthContext
        const mockUser = { name: "Test User", avatar };
        const mockSetUser = vi.fn();
        const MockAuthProvider = ({ children }) => (
            <AuthProvider value={{ user: mockUser, setUser: mockSetUser }}>
                {children}
            </AuthProvider>
        );
        render(
            <MemoryRouter>
                <MockAuthProvider>
                    <Sidebar
                        handleOpenEditProfileModal={handleOpenEditProfileModal}
                    />
                </MockAuthProvider>
            </MemoryRouter>
        );
        // Check for logout button
        const logoutButton = screen.getByText(/log out/i);
        expect(logoutButton).toBeInTheDocument();
        logoutButton.click();
        // You can add more assertions to check if setUser was called
    });

    it("calls setUser(null) when logout is clicked", () => {
        const handleOpenEditProfileModal = vi.fn();
        const mockUser = { name: "Test User", avatar };
        const mockSetUser = vi.fn();
        const MockAuthProvider = ({ children }) => (
            <AuthProvider value={{ user: mockUser, setUser: mockSetUser }}>
                {children}
            </AuthProvider>
        );
        render(
            <MemoryRouter>
                <MockAuthProvider>
                    <Sidebar
                        handleOpenEditProfileModal={handleOpenEditProfileModal}
                    />
                </MockAuthProvider>
            </MemoryRouter>
        );
        const logoutButton = screen.getByText(/log out/i);
        logoutButton.click();
        expect(mockSetUser).toHaveBeenCalledWith(null);
    });

    it("calls handleOpenEditProfileModal when 'Change profile data' is clicked", () => {
        const handleOpenEditProfileModal = vi.fn();
        const mockUser = { name: "Test User", avatar: undefined };
        const mockSetUser = vi.fn();
        const MockAuthProvider = ({ children }) => (
            <AuthProvider value={{ user: mockUser, setUser: mockSetUser }}>
                {children}
            </AuthProvider>
        );
        render(
            <MemoryRouter>
                <MockAuthProvider>
                    <Sidebar
                        handleOpenEditProfileModal={handleOpenEditProfileModal}
                    />
                </MockAuthProvider>
            </MemoryRouter>
        );
        const editProfileButton = screen.getByText(/change profile data/i);
        editProfileButton.click();
        expect(handleOpenEditProfileModal).toHaveBeenCalled();
    });

    it("renders fallback avatar (initial) when user.avatar is missing", () => {
        const handleOpenEditProfileModal = vi.fn();
        const mockUser = { name: "Test User" };
        const mockSetUser = vi.fn();
        const MockAuthProvider = ({ children }) => (
            <AuthProvider value={{ user: mockUser, setUser: mockSetUser }}>
                {children}
            </AuthProvider>
        );
        render(
            <MemoryRouter>
                <MockAuthProvider>
                    <Sidebar
                        handleOpenEditProfileModal={handleOpenEditProfileModal}
                    />
                </MockAuthProvider>
            </MemoryRouter>
        );
        // Should render a div with the initial
        expect(screen.getByText("T")).toBeInTheDocument();
        expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("renders avatar image when user.avatar is present", () => {
        const handleOpenEditProfileModal = vi.fn();
        const mockUser = { name: "Test User", avatar };
        const mockSetUser = vi.fn();
        const MockAuthProvider = ({ children }) => (
            <AuthProvider value={{ user: mockUser, setUser: mockSetUser }}>
                {children}
            </AuthProvider>
        );
        render(
            <MemoryRouter>
                <MockAuthProvider>
                    <Sidebar
                        handleOpenEditProfileModal={handleOpenEditProfileModal}
                    />
                </MockAuthProvider>
            </MemoryRouter>
        );
        // Should render an img with correct alt text
        const avatarImg = screen.getByAltText("Test User's avatar");
        expect(avatarImg).toBeInTheDocument();
        expect(avatarImg.tagName).toBe("IMG");
    });

    it("renders correct username in Sidebar", () => {
        const handleOpenEditProfileModal = vi.fn();
        const mockUser = { name: "Alice", avatar: undefined };
        const mockSetUser = vi.fn();
        const MockAuthProvider = ({ children }) => (
            <AuthProvider value={{ user: mockUser, setUser: mockSetUser }}>
                {children}
            </AuthProvider>
        );
        render(
            <MemoryRouter>
                <MockAuthProvider>
                    <Sidebar
                        handleOpenEditProfileModal={handleOpenEditProfileModal}
                    />
                </MockAuthProvider>
            </MemoryRouter>
        );
        expect(screen.getByText("Alice")).toBeInTheDocument();
    });
});
