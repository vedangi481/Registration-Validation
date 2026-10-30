
function InputField({ label, type, name, value, onChange, error, placeholder }) {
  return (
    <div className="input-group">
      <label>{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default InputField;