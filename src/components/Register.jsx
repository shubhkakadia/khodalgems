import React, { useState, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import _ from "lodash";
import companyLogo from "../assets/CompanyLogo-transparent.png";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company_name: "",
    phone_number: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  // State to track input errors
  const [inputErrors, setInputErrors] = useState({
    first_name: false,
    last_name: false,
    email: false,
    phone_number: false,
    username: false,
    password: false,
    confirm_password: false,
  });

  const navigate = useNavigate();
  const usernameTimeoutRef = useRef(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    // Clear specific input error when user starts typing
    if (inputErrors[id]) {
      setInputErrors((prev) => ({
        ...prev,
        [id]: false,
      }));
    }

    // Special handling for username (debounced check)
    if (id === "username") {
      // Cancel previous timeout
      if (usernameTimeoutRef.current) {
        clearTimeout(usernameTimeoutRef.current);
      }

      // Set new timeout for username validation
      usernameTimeoutRef.current = setTimeout(() => {
        validateUsername(value);
      }, 500); // 500ms debounce
    }
  };

  const validateUsername = useCallback(
    _.debounce(async (username) => {
      try {
        const response = await axios.post(
          `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/check-username?username=${username}`
        );

        if (!response.data.available) {
          toast.error("Username is already taken");
          setInputErrors((prev) => ({
            ...prev,
            username: true,
          }));
        } else {
          setInputErrors((prev) => ({
            ...prev,
            username: false,
          }));
        }
      } catch (error) {
        console.error("Username check failed", error);
        toast.error("Unable to check username availability");
      }
    }, 500),
    []
  );

  const validateForm = () => {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      username,
      password,
      confirm_password,
    } = formData;

    const errors = {};
    let isValid = true;

    // Name validation (no numeric values)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(first_name)) {
      toast.error("First Name should only contain alphabetic characters");
      errors.first_name = true;
      isValid = false;
    }

    // Optional last name validation
    if (last_name && !nameRegex.test(last_name)) {
      toast.error("Last Name should only contain alphabetic characters");
      errors.last_name = true;
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      errors.email = true;
      isValid = false;
    }

    // Phone number validation (only numeric)
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phone_number)) {
      toast.error("Phone Number should only contain numeric characters");
      errors.phone_number = true;
      isValid = false;
    }

    // Phone number length validation
    if (phone_number.length < 10 || phone_number.length > 15) {
      toast.error("Phone Number should be between 10 and 15 digits");
      errors.phone_number = true;
      isValid = false;
    }

    // Username validation
    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      errors.username = true;
      isValid = false;
    }

    // Password validation
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      errors.password = true;
      isValid = false;
    }

    // Password complexity (at least one uppercase, one lowercase, one number)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );
      errors.password = true;
      isValid = false;
    }

    // Confirm password validation
    if (password !== confirm_password) {
      toast.error("Passwords do not match");
      errors.confirm_password = true;
      isValid = false;
    }

    // Update input errors
    setInputErrors((prev) => ({
      ...prev,
      ...errors,
    }));

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    let data = JSON.stringify({
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.phone_number,
      username: formData.username,
      password: formData.password,
      company_name: formData.company_name,
    });

    // Show loading toast
    const loadingToastId = toast.loading("Registering...", {
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // Dismiss loading toast
        toast.dismiss(loadingToastId);

        // Show success modal/toast with account approval information
        toast.success(
          "Registration Successful! Our team will review your account and contact you shortly.",
          {
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            onClose: () => navigate("/login"),
          }
        );
      })
      .catch((error) => {
        // Dismiss loading toast
        toast.dismiss(loadingToastId);

        // Handle registration errors
        console.error(error);
        toast.error(
          error.response?.data?.message ||
            "Registration failed. Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-xl">
        <Link to="/" className="flex justify-center mb-8">
          <img
            src={companyLogo}
            alt="Company Logo"
            className="w-[200px] h-auto"
          />
        </Link>
        <h1 className="text-center text-[20px] m-4 font-bold">
          Register Account
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="first_name"
                className="block text-slate-600 font-bold mb-1"
              >
                First Name *
              </label>
              <input
                type="text"
                id="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                  ${
                    inputErrors.first_name
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-theme-500"
                  }`}
                required
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block text-slate-600 font-bold mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                  ${
                    inputErrors.last_name
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-theme-500"
                  }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mt-4">
              <label
                htmlFor="phone_number"
                className="block text-slate-600 font-bold mb-1"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                  ${
                    inputErrors.phone_number
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-theme-500"
                  }`}
                required
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="company_name"
                className="block text-slate-600 font-bold mb-1"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-theme-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-slate-600 font-bold mb-1"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                ${
                  inputErrors.email
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-theme-500"
                }`}
              required
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="username"
              className="block text-slate-600 font-bold mb-1"
            >
              Username *
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                ${
                  inputErrors.username
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-theme-500"
                }`}
              required
            />
          </div>

          <div className="mt-4 relative">
            <label
              htmlFor="password"
              className="block text-slate-600 font-bold mb-1"
            >
              Password *
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                ${
                  inputErrors.password
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-theme-500"
                }`}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-slate-500 hover:text-slate-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="mt-4 relative">
            <label
              htmlFor="confirm_password"
              className="block text-slate-600 font-bold mb-1"
            >
              Confirm Password *
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirm_password"
              value={formData.confirm_password}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none 
                ${
                  inputErrors.confirm_password
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-theme-500"
                }`}
              required
            />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="py-2 px-8 bg-theme-950 text-white font-bold rounded-full 
              transition duration-300 hover:bg-theme-900 focus:outline-none 
              focus:ring-2 focus:ring-theme-500 focus:ring-opacity-50"
            >
              Register
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-theme-600 hover:underline text-sm"
            >
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
