import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container my-5 text-center">
      <h1>Welcome to Game Rec!</h1>
      <p>Your platform for all gaming recommendations!</p>
      <div className="mt-4">
        <Link to="/login">
          <button className="btn btn-primary mx-2">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn btn-success mx-2">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
