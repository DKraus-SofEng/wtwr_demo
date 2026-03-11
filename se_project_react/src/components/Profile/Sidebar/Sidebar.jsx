import "./Sidebar.css";
import avatar from "../../../assets/avatar.png";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Sidebar({ handleOpenEditProfileModal }) {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("jwt");
        navigate("/");
    };

    return (
        <aside className="sidebar">
            <div className="sidebar__row">
                <p className="sidebar__userName">{user?.name || "User"}</p>
                {user?.avatar ? (
                    <img
                        className="sidebar__avatar"
                        src={user.avatar}
                        alt={
                            user?.name ? `${user.name}'s avatar` : "User avatar"
                        }
                    />
                ) : (
                    <div className="avatar-placeholder">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                )}
            </div>
            <button
                className="sidebar__edit-profile"
                onClick={handleOpenEditProfileModal}
            >
                Change profile data
            </button>
            <button className="sidebar__logout" onClick={handleLogout}>
                Log out
            </button>
        </aside>
    );
}

export default Sidebar;
