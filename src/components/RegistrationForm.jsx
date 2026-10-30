import { useState } from "react";
import InputField from "./InputField";

function RegistrationForm() {
  const [activeForm, setActiveForm] = useState("register");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");


function handleChange(e) {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value
  });

  let error = "";

  if (name === "name" && !value.trim()) {
    error = "Name is required";
  }

  if (name === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    error = "Enter a valid email";
  }

  if (name === "phone" && !/^[0-9]{10}$/.test(value)) {
    error = "Enter a valid 10 digit number";
  }

  if (name === "password" && value.length < 6) {
    error = "Password must have at least 6 characters";
  }

  if (name === "confirmPassword" &&
      value !== formData.password) {
    error = "Passwords do not match";
  }

  setErrors({
    ...errors,
    [name]: error,
    ...(name === "password" && formData.confirmPassword
      ? {
          confirmPassword:
            value !== formData.confirmPassword
              ? "Passwords do not match"
              : ""
        }
      : {})
  });

  setMessage("");
}
  function handleLoginChange(e) {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value
    });

    setMessage("");
    setErrors({
      ...errors,
      [name]: ""
    });
  }

  function validateRegistration() {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10 digit number";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must have at least 6 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validateLogin() {
    let newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleRegister(e) {
    e.preventDefault();

    if (validateRegistration()) {
      setMessage("Registration form submitted successfully!");
    }
  }

  function handleLogin(e) {
    e.preventDefault();

    if (validateLogin()) {
      setMessage("Login form validated successfully! (Demo only)");
    }
  }

  const registrationValid =
    formData.name.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    /^[0-9]{10}$/.test(formData.phone) &&
    formData.password.length >= 6 &&
    formData.confirmPassword === formData.password;

  const loginValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email) &&
    loginData.password !== "";

  return (
    <div className="form-container">

      <h1>User Registration & Login</h1>

      <div className="tabs">
        <button
          type="button"
          className={activeForm === "register" ? "active" : ""}
          onClick={() => {
            setActiveForm("register");
            setErrors({});
            setMessage("");
          }}
        >
          Register
        </button>

        <button
          type="button"
          className={activeForm === "login" ? "active" : ""}
          onClick={() => {
            setActiveForm("login");
            setErrors({});
            setMessage("");
          }}
        >
          Login
        </button>
      </div>

      {activeForm === "register" ? (

        <form onSubmit={handleRegister}>

          <InputField
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Enter your full name"
          />

          <InputField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Enter your email"
          />

          <InputField
            label="Phone Number"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="Enter 10 digit phone number"
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Enter password"
          />

          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="Confirm your password"
          />

          <button
            type="submit"
            className="submit-btn"
            disabled={!registrationValid}
          >
            Register
          </button>

        </form>

      ) : (

        <form onSubmit={handleLogin}>

          <InputField
            label="Email Address"
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleLoginChange}
            error={errors.email}
            placeholder="Enter your email"
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
            error={errors.password}
            placeholder="Enter your password"
          />
          <button
            type="submit"
            className="submit-btn"
            disabled={!loginValid}
          >
            Login
          </button>

        </form>

      )}
      {message && <p className="success">{message}</p>}

    </div>
  );
}
export default RegistrationForm;