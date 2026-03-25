import React, { useEffect, useState } from "react";
import axios from "axios";
import Admin from "./Admin";

const Candidates = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    party: "",
    image: null
  });

  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = async () => {
    const res = await axios.get("https://ovs-gmwq.onrender.com");
    setCandidates(res.data);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFile = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("age", formData.age);
    data.append("gender", formData.gender);
    data.append("party", formData.party);
    data.append("image", formData.image);

    await axios.post("http://localhost:5000/api/candidates", data, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    setFormData({
      name: "",
      age: "",
      gender: "",
      party: "",
      image: null
    });

    fetchCandidates();
  };

  return (
    <div className={`main-container ${collapsed ? "collapsed" : ""}`}>
      <Admin collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className="dashboard-content"
        style={{ marginLeft: "150px", padding: "20px" }}
      >
        <h1
          className="fw-bold ps-3 mb-3"
          style={{
            fontSize: "2rem",
            borderLeft: "4px solid #4a148c",
            color: "#4a148c"
          }}
        >
          &nbsp; Candidates Data
        </h1>

        <form className="data-form" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="Candidate Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            className="form-input"
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleChange}
              />{" "}
              Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
              />{" "}
              Female
            </label>
          </div>

          <input
            className="form-input"
            type="text"
            name="party"
            placeholder="Party Name"
            value={formData.party}
            onChange={handleChange}
            required
          />

          <input type="file" name="image" onChange={handleFile} required />

          <button className="form-btn">Submit</button>
        </form>

        <br />

        <table border="1" width="100%" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Party</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.age}</td>
                <td>{c.gender}</td>
                <td>{c.party}</td>
                <td>
                  {c.image && (
                    <img
                      src={`http://localhost:5000/uploads/${c.image}`}
                      alt="candidate"
                      width="60"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Candidates;
