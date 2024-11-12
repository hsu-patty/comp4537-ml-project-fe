import React from "react";
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/edit-user" element={<EditUser />} />
      </Routes>
    </Router>
  );
};

export default App;
