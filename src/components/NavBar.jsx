import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#0d6efd", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}>
      <div className="container-fluid py-2 px-4">
        <a
          className="navbar-brand fw-bold d-flex align-items-center"
          href="/"
          style={{ color: "#ffffff", fontSize: "1.7rem", letterSpacing: "1px" }}
        >
          <span style={{ fontSize: "2rem", marginRight: "8px" }}>🛍️</span> UltimateShop
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <div className="d-flex align-items-center gap-3">
            {token ? (
              <>
                <button
                  className="btn btn-light text-primary fw-semibold rounded-pill px-4"
                  onClick={() => navigate("/create-product")}
                  style={{ transition: "all 0.3s ease" }}
                >
                  + Create
                </button>

                <button
                  className="btn btn-outline-light fw-semibold rounded-pill px-4"
                  onClick={handleLogout}
                  style={{ transition: "all 0.3s ease" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-light fw-semibold rounded-pill px-4"
                  onClick={() => navigate("/login")}
                  style={{ transition: "all 0.3s ease" }}
                >
                  Login
                </button>

                <button
                  className="btn btn-light text-primary fw-semibold rounded-pill px-4"
                  onClick={() => navigate("/signup")}
                  style={{ transition: "all 0.3s ease" }}
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
