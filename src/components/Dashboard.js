import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [apiStatus, setApiStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false)

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

  useEffect(() => {
    const apiCalls = localStorage.getItem("apiCalls");
    setApiStatus(`API Calls Used: ${apiCalls}`);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/admin`,
         {
            withCredentials: true,
          }
        );
        if(response.data && response.data.length>0) setIsAdmin(true)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setIsAdmin(false)
        } else if (error.response && error.response.status === 403) {
          setIsAdmin(false)   
        }       
        else {
          console.error("Failed to fetch users:", error);
        }
      }
    };
    fetchUsers();
  }, [navigate]);

  return (
    <div className="container my-5">
      <h1 className="text-center">User Dashboard</h1>
      <div className="card mt-4">
        <div className="card-body text-center">
          <h5 className="card-title">Dashboard Status</h5>
          <p className="card-text">{apiStatus}</p>
          <p className="card-text">User type:{isAdmin?"Admin":"Regular user"}</p>
          {error && <div className="alert alert-danger">{error}</div>}
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className='card-body text-center'>
          <a href='/recommendations' className='btn btn-primary'>Recommendations</a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
