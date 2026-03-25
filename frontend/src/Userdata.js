import React, { useEffect, useState } from "react";
import axios from "axios";
import Admin from "./Admin";

const Userdata = () => {
    const [collapsed, setCollapsed] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        aadhaar: "",
        emailid: ""
    });

    const [users, setUsers] = useState([]);

const fetchUsers = async () => {
  try {
    const res = await axios.get("https://ovs-gmwq.onrender.com/api/users");

    if (Array.isArray(res.data)) {
      setUsers(res.data);
    } else {
      setUsers([]);
    }

  } catch (error) {
    console.log("API error:", error);
    setUsers([]);
  }
};

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post("https://ovs-gmwq.onrender.com/api/users", formData);

        setFormData({
            name: "",
            dob: "",
            aadhaar: "",
            emailid: ""
        });
        console.log(formData);


        fetchUsers();
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
                    &nbsp; User Data
                </h1>
                <form className="data-form" onSubmit={handleSubmit}>
                    <input
                        className="form-input"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="form-input"
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="form-input"
                        type="text"
                        name="aadhaar"
                        placeholder="Aadhaar Number"
                        value={formData.aadhaar}
                        onChange={handleChange}
                        maxLength={12}
                        required
                    />
                    <input
                        className="form-input"
                        type="email"
                        name="emailid"
                        placeholder="Email"
                        value={formData.emailid}
                        onChange={handleChange}
                        required
                    />
                    <button className="form-btn">Submit</button>
                </form>
                <br />
                <table border="1" width="100%" cellPadding="10">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>DOB</th>
                            <th>Aadhaar No</th>
                            <th>Email</th>
                            <th>status</th>
                        </tr>
                    </thead>
                   <tbody>
  {Array.isArray(users) && users.length > 0 ? (
    users.map((u) => (
      <tr key={u._id}>
        <td>{u.name}</td>
        <td>{u.dob}</td>
        <td>{u.aadhaar}</td>
        <td>{u.emailid}</td>
        <td style={{ color: u.hasVoted ? "green" : "red" }}>
          {u.hasVoted ? "Voted" : "Not Voted"}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5">No users found</td>
    </tr>
  )}
</tbody>
                </table>
            </div>
        </div>
    );
};

export default Userdata;
