import { useAuth } from "../contexts/AuthContext.jsx";
import { Navigate, useLocation } from "react-router-dom";

// "anonymous" prop is used to indicate routes that can be visited anonymously
// (i.e., without authorization). The two 'anonymous' routes in this application
// are /signup and /signin.
export default function ProtectedRoute({ children, anonymous = false }) {
    const location = useLocation();
    const from = location.state?.from || "/";

    const { user } = useAuth();

    // If user is logged in, they are redirected away from anonymous routes.
    if (anonymous && user) {
        return <Navigate to={from} />;
    }

    if (!anonymous && !user) {
        return <Navigate to="/" />;
    }
    // Otherwise, display the children of the current route.
    return children;
}
