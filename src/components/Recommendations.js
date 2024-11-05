import React, { useEffect, useState } from "react";
import axios from "axios";

const Recommendations = () => {
  const [apiStatus, setApiStatus] = useState("");
  const [error, setError] = useState("");
  const [gameName, setGameName] = useState("");
  const [recommendedGames, setRecommendedGames] = useState([]);
  const [images, setImages] = useState([]);

  const handleGenerateRecommendations = async () => {
    try {
      const input = { input: gameName };

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/generate`,
        input,
        {
          withCredentials: true,
        }
      );

      if (response.data.images && response.data.recommended_games) {
        setImages(response.data.images);
        setRecommendedGames(response.data.recommended_games);
        setError(""); // Clear any previous errors
      } else {
        setError("Unexpected response format");
        console.error("Unexpected response format:", response.data);
      }
    } catch (err) {
      setError("Failed to fetch recommendations. Please try again.");
      console.error("Error during API call:", err);
      if (err.response) {
        console.error("Server responded with:", err.response.data);
      }
    }
  };

  useEffect(() => {
    const apiCalls = localStorage.getItem("apiCalls") || 0;
    setApiStatus(`API Calls Used: ${apiCalls}`);
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center">Recommendations</h1>
      <div className="card mt-4">
        <div className="card-body text-center">
          <h5 className="card-title">Dashboard Status</h5>
          <p className="card-text">{apiStatus}</p>
          {error && <div className="alert alert-danger">{error}</div>}

          <input
            type="text"
            id="input"
            placeholder="Enter game name"
            className="form-control my-3"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={handleGenerateRecommendations}
          >
            Get Recommendations
          </button>
        </div>
        <div className="card-body text-center">
          <a href="/dashboard" className="btn btn-secondary">
            Back to Dashboard
          </a>
        </div>
      </div>

      <div className="row mt-5">
        {recommendedGames.map((game, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <img src={images[index]} alt={game} className="card-img-top" />
              <div className="card-body text-center">
                <h5 className="card-title">{game}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
