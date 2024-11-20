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

const API_LIMIT = 20;

const App = () => {
  const [apiCallLimitReached, setApiCallLimitReached] = useState(false);

  useEffect(() => {
    const apiCalls = parseInt(localStorage.getItem("apiCalls") || "0", 10);

    if (apiCalls >= API_LIMIT) {
      setApiCallLimitReached(true);
    }
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/recommendations" element={<Recommendations />} /> */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
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
