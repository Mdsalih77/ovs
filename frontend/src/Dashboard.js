import React, { useEffect, useState } from "react";
import axios from "axios";
import Admin from "./Admin";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [publishResult, setPublishResult] = useState(false);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [totalVoted, setTotalVoted] = useState(0);

  const fetchStatus = async () => {
    const res = await axios.get("http://localhost:5000/api/dashboard/status");
    setPublishResult(res.data.publishResult);
  };

  const fetchCounts = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/dashboard/stats");

    setTotalUsers(res.data.users);
    setTotalCandidates(res.data.candidates);
    setTotalVoted(res.data.votes);

  } catch (error) {
    console.error("Error fetching stats:", error);
  }
};

  const togglePublish = async () => {
    await axios.post("http://localhost:5000/api/dashboard/publish", {
      publishResult: !publishResult,
    });
    setPublishResult(!publishResult);
  };

  useEffect(() => {
    fetchStatus();
    fetchCounts();
  }, []);

  return (
    <div className={`main-container ${collapsed ? "collapsed" : ""}`}>
      <Admin collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className="dashboard-content"
        style={{ marginLeft: "150px", padding: "20px" }}
      >
        <h1 className="dashboard-title" >Dashboard</h1>

        <div className="toggle-container">
          <span className="toggle-label">
            {publishResult ? "Results Published" : "Results Hidden"}
          </span>

          <label className="switch">
            <input
              type="checkbox"
              checked={publishResult}
              onChange={togglePublish}
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* Stats Section */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{totalUsers}</p>
          </div>

          <div className="stat-card">
            <h3>Total Candidates</h3>
            <p>{totalCandidates}</p>
          </div>

          <div className="stat-card">
            <h3>Total Voted</h3>
            <p>{totalVoted}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;