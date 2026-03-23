import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Vote = () => {
  const [candidates, setCandidates] = useState([]);
  const [publishResult, setPublishResult] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    const c = await axios.get("http://localhost:5000/api/candidates");
    setCandidates(c.data);

    const s = await axios.get("http://localhost:5000/api/dashboard/status");
    setPublishResult(s.data.publishResult);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/vote/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Vote submitted");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="page">
      <header className="header">
        <h1 className="logo">E-Vote</h1>
        <button className="btn primary" onClick={handleLogout}>Logout</button>
      </header>

      {publishResult ? (
        <div style={{
          background: "#8b4fff",
          color: "#fff",
          padding: "20px",
          textAlign: "center",
          fontWeight: "bold",
          margin: "30px",
          borderRadius: "10px"
        }}>
           Voting Closed. Results Have Been Published
        </div>
      ) : (
        <main className="candidate-main">
          {candidates.map((c) => (
            <div key={c._id} className="candidate-card">
              <img
                src={`http://localhost:5000/uploads/${c.image}`}
                alt={c.name}
                width="200"
              />
              <h3>{c.name}</h3>
              <div style={{display:"flex",justifyContent:"center",gap:"10px"}}> <p>{c.party}</p><p>|</p>
              <p>{c.age}</p><p>|</p>
              <p>{c.gender}</p></div>
             
              <button className="btn primary" onClick={() => handleVote(c._id)}>
                Vote
              </button>
            </div>
          ))}
        </main>
        
      )}
      <div>
            <footer className="footer">© 2026 Online Voting System</footer>

      </div>

    </div>
    
  );
  
};

export default Vote;
