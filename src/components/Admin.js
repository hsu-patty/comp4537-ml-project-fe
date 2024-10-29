import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        "http://myWebAPIServer.ca/api/auth/admin",
        { withCredentials: true }
      );
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.firstName} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
