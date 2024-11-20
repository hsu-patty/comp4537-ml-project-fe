import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin";
import Home from "./components/Home";
import Recommendations from "./components/Recommendations";
import EditUser from "./components/EditUser";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ProtectedRoute from "./components/protectedRoute";
import axios from "axios";
import { API_LIMIT } from "./constant";

const App = () => {
  const [apiCallLimitReached, setApiCallLimitReached] = useState(false);


  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      localStorage.removeItem("apiCalls");
      setApiCallLimitReached(false);
  
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const updateApiLimitState = () => {
      const apiCalls = parseInt(localStorage.getItem("apiCalls") || "0", 10);
      setApiCallLimitReached(apiCalls >= API_LIMIT);
    };

    updateApiLimitState();

    window.addEventListener("storage", updateApiLimitState);

    return () => {
      window.removeEventListener("storage", updateApiLimitState);
    };
  }, []);

  return (
    <Router>
      {apiCallLimitReached && (
        <div style={{ background: "red", color: "white", padding: "10px", textAlign: "center" }}>
          You have hit the {API_LIMIT} API call limit!
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
  path="/login"
  element={<Login setApiCallLimitReached={setApiCallLimitReached} />}
/>
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <Recommendations />
            </ProtectedRoute>
          }
        />
        <Route path="/edit-user" element={<EditUser />} />
      </Routes>
    </Router>
  );
};

export default App;
