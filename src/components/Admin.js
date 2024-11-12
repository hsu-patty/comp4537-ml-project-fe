import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [overallApiStats, setOverallApiStats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/admin`,
          {
            withCredentials: true,
          }
        );
        setUsers(response.data.users);
        setOverallApiStats(response.data.overallApiStats);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("admin users only");
        } else {
          console.error("Failed to fetch users:", error);
        }
      }
    };
    fetchUsers();
  }, []);

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
      console.error("Failed to log out:", error);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_SERVER_URL}/api/admin/delete/${userId}`,
          {
            withCredentials: true,
          }
        );
        setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Admin Dashboard</h1>

      {/* Display overall total API usage by endpoint and method */}
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">
            Overall API Usage (By Method & Endpoint)
          </h5>
          <ul className="list-group">
            {overallApiStats.map((stat) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={`${stat.method}-${stat.endpoint}`}
              >
                <div>
                  <strong>Method:</strong> {stat.method} <br />
                  <strong>Endpoint:</strong> {stat.endpoint}
                </div>
                <div>
                  <strong>Total Requests:</strong> {stat.totalRequests}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Registered Users</h5>
          <ul className="list-group">
            {users.map((user) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={user.email}
              >
                <div>
                  <strong>User Email:</strong> {user.email} <br />
                  <strong>Total API Calls Used:</strong> {user.apiCalls}
                </div>
                <div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Admin;
