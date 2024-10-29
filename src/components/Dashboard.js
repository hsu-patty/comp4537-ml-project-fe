import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [apiStatus, setApiStatus] = useState("");
  const [error, setError] = useState("");

  const handleLogout = async () => {
    await axios.post("http://myWebAPIServer.ca/api/auth/logout");
    window.location.href = "/";
  };

  useEffect(() => {
    const apiCalls = localStorage.getItem("apiCalls");
    setApiStatus(`API Calls Used: ${apiCalls}`);
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      <div>{apiStatus}</div>
      <button onClick={handleLogout}>Logout</button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Dashboard;
