import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Viewresult = () => {
  const [results, setResults] = useState([]);
  const [published, setPublished] = useState(false);

  const nav = useNavigate()
  const fetchResults = async () => {
    try {
      const status = await axios.get(
        "https://ovs-gmwq.onrender.com"
      );

      setPublished(status.data.publishResult);

      if (status.data.publishResult) {
        const res = await axios.get("https://ovs-gmwq.onrender.com");
        setResults(res.data);
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const home = () => {
    nav("/")
  }

  useEffect(() => {
    fetchResults();
  }, []);

  if (!published) {
    return (
      <div className="result-page">
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          ⏳ Results are not published yet
        </h2>
      </div>
    );
  }

  const totalVotes = results.reduce((sum, r) => sum + r.votes, 0);

  const maxVotes = Math.max(...results.map(r => r.votes));


  return (
    <div className="result-page">
<div style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
}}>        <h1>Election Results</h1>
        <button className="btn primary" onClick={home}>Home</button>
      </div>

      <div className="result-container">
        {results.map((r, i) => {

          const percentage = totalVotes
            ? ((r.votes / totalVotes) * 100).toFixed(1)
            : 0;

          const isWinner = r.votes === maxVotes;

          return (
            <div
              key={i}
              className="result-card"
              style={{
                border: isWinner ? "3px solid gold" : "1px solid #ccc",
                background: isWinner ? "#fff9db" : "white"
              }}
            >
              <h3>
                {r.name}
                {isWinner && (
                  <span style={{ color: "gold", marginLeft: "10px" }}>
                    🏆 Winner
                  </span>
                )}
              </h3>

              <p>Party: {r.party}</p>
              <p>Votes: {r.votes}</p>
              <p>Vote Share: {percentage}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Viewresult;