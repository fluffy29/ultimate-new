const InputForm = ({ id, type, value, onChange, ariaDescribedby }) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-describedby={ariaDescribedby}
      className="form-control"
    />
  );
};

export default InputForm;
