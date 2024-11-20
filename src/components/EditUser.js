import React, { useState, useEffect } from "react";
import axios from "axios";

const EditUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/auth/get-user`,
          {
            withCredentials: true,
          }
        );
        setEmail(response.data.email);
        const apiCalls = response.data.apiCalls;
        localStorage.setItem("apiCalls", apiCalls);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setError("Failed to fetch user details.");
      }
    };

    fetchUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword) {
      alert("Please enter your current password.");
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/edit`,
        {
          email,
          password,
          currentPassword,
        },
        {
          withCredentials: true,
        }
      );
      const apiCalls = response.data.apiCalls;
      localStorage.setItem("apiCalls", apiCalls);
      setSuccessMessage("Profile updated successfully.");
      setPassword("");
      setCurrentPassword("");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Please make sure you entered your current password correctly.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Edit Your Profile</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <div className="card mt-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Login Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter new email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="currentPassword" className="form-label">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                className="form-control"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
