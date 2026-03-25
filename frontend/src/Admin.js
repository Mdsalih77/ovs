import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faUsers, faBars, faAngleLeft, faAngleRight, } from "@fortawesome/free-solid-svg-icons";

  

const Admin = ({ collapsed, setCollapsed }) => {
  return (
    <div className={`admindash ${collapsed ? "collapsed" : ""}`}>
      <div className="top-section">
        {!collapsed && <h5 className="brand">ONLINE VOTING SYSTEM</h5>}
        <button
          className="toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FontAwesomeIcon icon={collapsed ? faAngleRight : faAngleLeft} />
        </button>
      </div>

            <div className="line"></div>

            <NavLink
                to="/Dashboard"
                className={({ isActive }) => (isActive ? "detail active" : "detail")}
            >
                <FontAwesomeIcon icon={faGauge} className="icon" />
                {!collapsed && <span>Dashboard</span>}
            </NavLink>

            <NavLink
                to="/UserData"
                className={({ isActive }) => (isActive ? "detail active" : "detail")}
            >
                <FontAwesomeIcon icon={faUsers} className="icon" />
                {!collapsed && <span>User Data</span>}
            </NavLink>

            <NavLink
                to="/Candidates"
                className={({ isActive }) => (isActive ? "detail active" : "detail")}
            >
                <FontAwesomeIcon icon={faBars} className="icon" />
                {!collapsed && <span>Candidates</span>}
            </NavLink>

                 <NavLink
                to="/Adminlogin"
                className={({ isActive }) => (isActive ? "detail active" : "detail")}
            >
                <FontAwesomeIcon icon={faBars} className="icon" />
                {!collapsed && <span>Logout</span>}
            </NavLink>
        </div>
    );
};

export default Admin;
