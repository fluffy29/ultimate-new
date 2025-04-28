import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LabelComp from "../components/LabelComp";
import InputForm from "../components/InputFormComp";
import AlertComp from "../components/AlertComp";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    image: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const fieldConfig = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      id: "firstNameInput",
    },
    { name: "lastName", label: "Last Name", type: "text", id: "lastNameInput" },
    { name: "email", label: "Email Address", type: "email", id: "emailInput" },
    { name: "password", label: "Password", type: "password", id: "pwdInput" },
    { name: "role", label: "Role (User/Admin)", type: "text", id: "roleInput" },
    {
      name: "image",
      label: "Profile Picture URL",
      type: "text",
      id: "imageInput",
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      const response = await fetch("http://localhost:3001/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const serverData = await response.json();

      if (!response.ok) {
        throw Error(serverData.message || "Signup failed");
      }

      setSuccess("Account created successfully! Redirecting...");
      console.log("Signup successful:", serverData);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #f6f9fc, #e9f0ff)",
        padding: "2rem",
      }}
    >
      <form
        className="card border-0 shadow-lg p-5"
        style={{
          width: "100%",
          maxWidth: "700px",
          borderRadius: "20px",
          background: "white",
          animation: "fadeSlideIn 1s ease",
        }}
        onSubmit={handleSubmit}
      >
        <h1
          className="mb-4 fw-bold text-center"
          style={{ color: "#0b132b", fontSize: "2.5rem" }}
        >
          Welcome to UltimateShop
        </h1>

        <p className="text-center text-muted mb-5" style={{ fontSize: "1rem" }}>
          Create your account and unlock the future of shopping.
        </p>

        <div className="row g-3">
          {fieldConfig.map(({ name, label, type, id }, idx) => (
            <div className={`col-md-${idx < 2 ? "6" : "12"}`} key={name}>
              <LabelComp htmlFor={id} displayText={label} />
              <InputForm
                id={id}
                type={type}
                value={formData[name]}
                onChange={handleChange(name)}
                ariaDescribedby={`${id}Help`}
              />
            </div>
          ))}
        </div>

        {error && (
          <div className="mt-4">
            <AlertComp alertType="alert-danger" text={error} />
          </div>
        )}

        {success && (
          <div className="mt-4">
            <AlertComp alertType="alert-success" text={success} />
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-100 mt-4 py-3 fw-semibold rounded-pill"
          style={{
            fontSize: "1.2rem",
            backgroundColor: "#1d3557",
            borderColor: "#1d3557",
          }}
          disabled={loading}
        >
          {loading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Create Account"
          )}
        </button>

        <p
          className="text-center text-muted mt-4 mb-0"
          style={{ fontSize: "0.9rem" }}
        >
          Already have an account?{" "}
          <a
            href="/login"
            className="text-decoration-none fw-bold"
            style={{ color: "#1d3557" }}
          >
            Log In
          </a>
        </p>

        {/* Simple entrance animation */}
        <style>
          {`
          @keyframes fadeSlideIn {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
        </style>
      </form>
    </div>
  );
};

export default SignUpPage;
