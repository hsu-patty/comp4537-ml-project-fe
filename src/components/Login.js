import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
        { email, password }
      );
      
      document.cookie = `authToken=${response.data.token}; max-age=3600; path=/`;
      
      localStorage.setItem("apiCalls", response.data.apiCalls);

      if (response.data.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleLogin} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;