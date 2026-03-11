import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Sidebar from "../components/Profile/Sidebar/Sidebar.jsx";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import * as AuthContextModule from "../contexts/AuthContext.jsx";

describe("Sidebar API states", () => {
    it("shows loading indicator when loading", () => {
        vi.spyOn(AuthContextModule, "useAuth").mockReturnValue({
            user: null,
            setUser: vi.fn(),
            loading: true,
        });
        render(
            <MemoryRouter>
                <Sidebar handleOpenEditProfileModal={() => {}} />
            </MemoryRouter>
        );
        // Check for the username placeholder
        expect(screen.getByText("User")).toBeInTheDocument();
        // Optionally, check for the avatar placeholder
        expect(screen.getByText("U")).toBeInTheDocument();
    });

    it("shows error message when error", () => {
        vi.spyOn(AuthContextModule, "useAuth").mockReturnValue({
            user: null,
            setUser: vi.fn(),
            error: "Failed to fetch",
        });
        render(
            <MemoryRouter>
                <Sidebar handleOpenEditProfileModal={() => {}} />
            </MemoryRouter>
        );
        // Check for the username placeholder
        expect(screen.getByText("User")).toBeInTheDocument();
        // Optionally, check for the avatar placeholder
        expect(screen.getByText("U")).toBeInTheDocument();
    });
});
