import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [apiStatus, setApiStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/");
    } catch (error) {
      setError("Failed to log out. Please try again.");
      console.error("Logout error:", error);
    }
  };

  // Fetch API call status and user type
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Make a GET request to the admin endpoint
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/auth/get-user`,
          {
            withCredentials: true,
          }
        );

        console.log("response!", response.data);
        
        // Update apiCalls in localStorage and the component state
        const apiCalls = response.data.apiCalls;
        localStorage.setItem("apiCalls", apiCalls);
        setApiStatus(`API Calls Used: ${apiCalls}`);

        // Check if the user is an admin
        setIsAdmin(response.data && response.data.isAdmin);
      } catch (error) {
          setError("Failed to fetch user type. Please try again.");
          console.error("Error fetching user type:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center">User Dashboard</h1>
      <div className="card mt-4">
        <div className="card-body text-center">
          <h5 className="card-title">Dashboard Status</h5>
          <p className="card-text">{apiStatus}</p>
          <p className="card-text">User type: {isAdmin ? "Admin" : "Regular user"}</p>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
        <div className="card-body text-center">
          <a href="/recommendations" className="btn btn-primary">
            View Recommendations
          </a>
        </div>
        <div className="card-body text-center">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/edit-user")}
          >
            Edit Profile
          </button>
        </div>
        <div className="card-body text-center">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
