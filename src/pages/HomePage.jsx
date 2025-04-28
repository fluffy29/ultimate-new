import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../utils/fetchProduts";
import CardComponent from "../components/CardComponent";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleEdit = (productId) => {
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/edit-product/${productId}`);
    }
  };

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-5">
        <p className="text-danger fw-bold">{error}</p>
      </div>
    );

  if (!products.length)
    return (
      <div className="text-center mt-5">
        <p className="text-muted">No products found.</p>
      </div>
    );

  return (
    <div className="container py-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {products.map((product) => (
          <div key={product._id} className="col d-flex">
            <div className="card shadow-sm border-0 rounded-4 w-100">
              <CardComponent
                title={product.Model}
                brand={product.brand}
                price={product.price}
                stock={product.stock}
                imageUrl={product.imageUrl}
              />
              {token && (
                <button
                  className="btn btn-outline-warning rounded-pill m-3"
                  onClick={() => handleEdit(product._id)}
                >
                  Edit Product
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
