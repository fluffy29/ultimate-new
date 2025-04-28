import productImgPlaceholder from "../assets/image.png";

const CardComponent = ({ title, brand, stock, price, imageUrl }) => {
  return (
    <article className="col">
      <div
        className="card shadow-lg border-0 rounded-4 h-100"
        style={{
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.10)";
        }}
      >
        <img
          src={imageUrl || productImgPlaceholder}
          className="card-img-top p-3"
          alt={`${title} image`}
          style={{
            height: "280px",
            objectFit: "contain",
            backgroundColor: "#f8f9fa",
            borderBottom: "1px solid #dee2e6",
          }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title fw-bold">{title}</h5>
            <p className="card-text text-muted small mb-2">
              <strong className="text-dark">Brand:</strong> {brand}
              <br />
              <strong className="text-dark">Stock:</strong> {stock}
              <br />
              <strong className="text-dark">Price:</strong> ${price}
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button
              type="button"
              className="btn btn-outline-primary rounded-pill px-3"
            >
              View
            </button>
            <button type="button" className="btn btn-primary rounded-pill px-3">
              Buy
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CardComponent;
