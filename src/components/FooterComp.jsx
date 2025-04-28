import React from "react";
import { Link } from "react-router-dom";

const FooterComp = () => {
  return (
    <footer
      className="bg-light text-muted mt-auto border-top"
      style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
    >
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="mb-2 mb-md-0 text-center text-md-start">
          <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
            UltimateShop
          </span>{" "}
          © {new Date().getFullYear()}
        </div>

        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link to="/" className="nav-link px-3 text-muted small">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link px-3 text-muted small">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link px-3 text-muted small">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterComp;
