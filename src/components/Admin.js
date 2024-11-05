import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
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
        setUsers(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        } else {
          console.error("Failed to fetch users:", error);
        }
      }
    };
    fetchUsers();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/logout`, {}, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Admin Dashboard</h1>
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Registered Users</h5>
          <ul className="list-group">
            {users.map((user) => (
              <li className="list-group-item" key={user._id}>
                <strong>User Email:</strong> {user.email} <br />
                <strong>API Calls Used:</strong> {user.apiCalls}
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
