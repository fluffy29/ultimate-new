import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LabelComp from "../components/LabelComp";
import InputForm from "../components/InputFormComp";
import AlertComp from "../components/AlertComp";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    brand: "",
    Model: "",
    stock: "",
    price: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/product/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        setFormData({
          brand: data.brand,
          Model: data.Model,
          stock: data.stock,
          price: data.price,
        });
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };

    fetchProduct();
  }, [id, token]);

  const handleChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");

      const response = await fetch(`http://localhost:3001/api/product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      setSuccess("Product updated successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1500); 
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  const fieldConfig = [
    { name: "brand", label: "Brand", type: "text", id: "brandInput" },
    { name: "Model", label: "Model", type: "text", id: "modelInput" },
    { name: "stock", label: "Stock", type: "number", id: "stockInput" },
    { name: "price", label: "Price", type: "number", id: "priceInput" },
  ];

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
        Edit Product
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
        Save Changes
      </button>
    </form>
  );
};

export default EditProductPage;
