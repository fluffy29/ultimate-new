import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LabelComp from "../components/LabelComp";
import InputForm from "../components/InputFormComp";
import AlertComp from "../components/AlertComp";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand: "",
    Model: "",
    stock: "",
    price: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if not logged in
    }
  }, [navigate]);

  const handleChange = (field) => (value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const fieldConfig = [
    { name: "brand", label: "Brand", type: "text", id: "brandInput" },
    { name: "Model", label: "Model", type: "text", id: "modelInput" },
    { name: "stock", label: "Stock", type: "number", id: "stockInput" },
    { name: "price", label: "Price", type: "number", id: "priceInput" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const response = await fetch(
        "http://localhost:3000/api/product/addProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            brand: formData.brand,
            Model: formData.Model,
            stock: Number(formData.stock),
            price: Number(formData.price),
          }),
        }
      );

      const serverData = await response.json();

      if (!response.ok) {
        throw new Error(serverData.message || "Product creation failed");
      }

      console.log("Product created successfully:", serverData);
      setSuccess("Product created successfully!");
      setFormData({ brand: "", Model: "", stock: "", price: "" });
    } catch (error) {
      console.error(error.message);
      setError(error.message);
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
        Create Product
      </h1>

      {fieldConfig.map(({ name, label, type, id }) => (
        <div className="mb-4" key={name}>
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

      {error && (
        <div className="mb-3">
          <AlertComp alertType="alert-danger" text={error} />
        </div>
      )}
      {success && (
        <div className="mb-3">
          <AlertComp alertType="alert-success" text={success} />
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary w-100 py-2 fw-semibold rounded-pill"
        style={{ fontSize: "1.1rem", transition: "background 0.3s" }}
      >
        Add Product
      </button>
    </form>
  );
};

export default CreateProduct;
