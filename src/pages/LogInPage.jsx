import LabelComp from "../components/LabelComp";
import InputForm from "../components/InputFormComp";
import { useState } from "react";
import { checkEmail } from "../utils/checkFormErrors";
import AlertComp from "../components/AlertComp";
import { useNavigate } from "react-router-dom";

const LogInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (value) => setEmail(value);
  const handlePasswordChange = (value) => setPassword(value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);

      if (!checkEmail.checkEmpty(email)) throw Error("Email is empty");
      if (!checkEmail.checkFormat(email)) throw Error("Wrong email format");

      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 401) {
        throw Error("Invalid credentials, please check");
      }

      const data = await response.json();
      if (!data.token) {
        throw Error("Invalid response from server");
      }

      localStorage.setItem("token", data.token);

      console.log("Login successful");

      navigate("/");
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="card shadow-lg border-0 rounded-4 p-5 w-100"
      style={{
        maxWidth: "480px",
        margin: "2rem auto",
        backgroundColor: "#f8f9fa",
      }}
      onSubmit={handleSubmit}
    >
      <h1
        className="text-center mb-4 fw-bold text-primary"
        style={{ letterSpacing: "1px" }}
      >
        Log In
      </h1>

      <div className="mb-4">
        <LabelComp htmlFor="emailInput" displayText="Email" />
        <InputForm
          onChange={handleEmailChange}
          value={email}
          type="email"
          id="emailInput"
          ariaDescribedby="emailHelp"
        />
      </div>

      <div className="mb-4">
        <LabelComp htmlFor="passwordInput" displayText="Password" />
        <InputForm
          onChange={handlePasswordChange}
          value={password}
          type="password"
          id="passwordInput"
          ariaDescribedby="passwordHelp"
        />
      </div>

      {error && (
        <div className="mb-3">
          <AlertComp alertType="alert-danger" text={error} />
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary w-100 py-2 fw-semibold rounded-pill"
        style={{ fontSize: "1.1rem" }}
        disabled={loading}
      >
        {loading ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default LogInPage;
