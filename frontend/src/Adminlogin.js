import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Adminlogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();

        const adminEmail = "admin1@gmail.com";
        const adminPassword = "admin123";

        if (email === adminEmail && password === adminPassword) {
            navigate("/dashboard");
        } else {
            alert("invalid")
        }
    };

    return (
        <div className="login-page">
            <div className="login-card fade-slide">
                <h2 className="login-title">
                    Admin Login
                    <span>Secure Authentication</span>
                </h2>

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>


                    <button className="btn primary large login-btn" type="submit" >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};
