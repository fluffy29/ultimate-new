const AlertComp = ({ alertType, text }) => {
  return (
    <div
      className={`alert ${alertType} d-flex align-items-center shadow-sm rounded-3 px-4 py-3`}
      role="alert"
      style={{
        fontSize: "1rem",
        fontWeight: "500",
        letterSpacing: "0.5px",
        backgroundColor:
          alertType === "alert-danger"
            ? "#f8d7da"
            : alertType === "alert-success"
            ? "#d1e7dd"
            : "#e2e3e5",
        color:
          alertType === "alert-danger"
            ? "#842029"
            : alertType === "alert-success"
            ? "#0f5132"
            : "#41464b",
        border: "1px solid transparent",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {text}
    </div>
  );
};

export default AlertComp;
