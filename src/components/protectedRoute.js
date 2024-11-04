import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.post("http://localhost:3001/api/auth/check", {}, {
                    withCredentials: true,
                });
                console.log(response.data.isAuthenticated);
                setIsAuthenticated(response.data.isAuthenticated);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    // show loading while the result is not here
    if (isAuthenticated === null) return <div>Loading...</div>;

    // if not logged in, send to login page
    if (!isAuthenticated) return <Navigate to="/login" />;

    // if logged in, return child component(page)
    return children;
};

export default ProtectedRoute;
