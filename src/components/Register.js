import React, { useState } from "react";
import axios from "axios";
import MESSAGES from "../lang/messages/en/user";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage(MESSAGES.INVALID_EMAIL);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/register`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response);
      console.log(response.status);
      //setMessage(MESSAGES.REGISTER_SUCCESS);
      setMessage(`(Code: ${response.status}) ${MESSAGES.REGISTER_SUCCESS}`);
      setEmail("");
      setPassword("");
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || MESSAGES.REGISTER_FAIL;
      const code = err.response?.status || "---";
      setMessage(`(Code: ${code}) ${errorMessage}`);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Register</h1>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
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
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </form>
    </div>
  );
};

export default Register;
