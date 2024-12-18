import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MESSAGES from "../lang/messages/en/user";

const Admin = ({ handleLogout }) => {
  const [users, setUsers] = useState([]);
  const [overallApiStats, setOverallApiStats] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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

        const apiCalls = response.data.apiCalls;
        localStorage.setItem("apiCalls", apiCalls);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          //setError(MESSAGES.ACCESS_DENY_ERROR);
          setError(`(Code: ${error.response?.status}) ${MESSAGES.ACCESS_DENY_ERROR}`);
        } else {
          //setError(MESSAGES.FETCH_ERROR);
          setError(`(Code: ${error.response?.status}) ${MESSAGES.FETCH_ERROR}`);
        }
        console.error("Failed to fetch admin data:", error);
      }
    };

    fetchUsers();
  }, []);


  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      MESSAGES.CONFIRM_DELETION
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_SERVER_URL}/api/admin/delete/${userId}`,
          {
            withCredentials: true,
          }
        );
        setUsers(users.filter((user) => user._id !== userId));
        //setSuccessMessage(MESSAGES.USER_DELETE_SUCCESS);
        setSuccessMessage(`(Code: ${response.status}) ${MESSAGES.USER_DELETE_SUCCESS}`);
      } catch (error) {
        //setError(MESSAGES.FAIL_TO_DELETE_ERROR);
        setError(`(Code: ${error.response?.status}) ${MESSAGES.FAIL_TO_DELETE_ERROR}`);
        console.error("Failed to delete user:", error);
      }
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Admin Dashboard</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

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
                key={user._id}
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
