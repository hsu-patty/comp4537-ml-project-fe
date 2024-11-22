import React, { useEffect, useState } from "react";
import axios from "axios";
import MESSAGES from "../lang/messages/en/user";

const Recommendations = () => {
  const [apiStatus, setApiStatus] = useState("");
  const [error, setError] = useState("");
  const [gameName, setGameName] = useState("");
  const [recommendationSets, setRecommendationSets] = useState([]);

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


      if (Array.isArray(response.data.recommendations)) {
        setRecommendationSets(response.data.recommendations);
        const apiCalls = response.data.apiCalls;
        localStorage.setItem("apiCalls", apiCalls);
        setApiStatus(MESSAGES.API_STATUS.replace("%1", apiCalls));
        setError(""); // Clear any previous errors
      } else {
        setError(MESSAGES.UNEXPECTED_RESPONSE_FORMAT);
        console.error("Unexpected response format:", response.data);
      }
    } catch (err) {
      setError(MESSAGES.FAIL_TO_FETCH_RECOMMENDATION);
      console.error("Error during API call:", err);
      if (err.response) {
        console.error("Server responded with:", err.response.data);
      }
    }
  };

  useEffect(() => {
    const apiCalls = localStorage.getItem("apiCalls") || 0;
    setApiStatus(MESSAGES.API_STATUS.replace("%1", apiCalls));
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
            placeholder={MESSAGES.INPUT_PLACEHOLDER}
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

      <div className="mt-5">
        {recommendationSets.map((set, setIndex) => (
          <div key={setIndex} className="mb-5">
            <h3 className="text-center">
              Recommendations for: <strong>{set.matched_game}</strong>
            </h3>
            <div className="row mt-4">
              {set.recommended_games && set.recommended_games.map((game, gameIndex) => (
                <div key={gameIndex} className="col-md-4 mb-4">
                  <div className="card">
                    <img
                      src={set.images[gameIndex]}
                      alt={game}
                      className="card-img-top"
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{game}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;

