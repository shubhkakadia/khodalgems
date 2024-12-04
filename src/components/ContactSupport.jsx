import React, { useState } from "react";

export default function ContactSupport ({ onClose }) {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    companyName: "",
    message: "",
    mobileNumber: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email address.";
    }
    if (/\d/.test(formData.name)) {
      newErrors.name = "Name should not contain numbers.";
    }
    if (/\d/.test(formData.companyName)) {
      newErrors.companyName = "Company name should not contain numbers.";
    }
    if (isNaN(formData.mobileNumber) || formData.mobileNumber === "") {
      newErrors.mobileNumber = "Mobile number should only contain numbers.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log(formData);
    setSubmitted(true);
  };

  const handleCloseSubmitted = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className={`bg-white p-4 rounded-2xl shadow-lg w-full max-w-md transition-transform duration-500 ${submitted ? "transform translate-y-4" : ""}`}>
        {submitted ? (
          <div className="text-center">
            <div className="flex justify-end">
              <button onClick={handleCloseSubmitted} className="text-slate-500 hover:text-slate-700">
                ✖
              </button>
            </div>
            <h2 className="text-2xl font-bold text-slate-600 mb-4">Thank you!</h2>
            <p className="text-slate-500">We will get back to you soon.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-600">Contact Us</h2>
              <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
                ✖
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-slate-600 font-bold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-slate-600 font-bold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="companyName" className="block text-slate-600 font-bold mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${errors.companyName ? "border-red-500" : ""}`}
                />
                {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-slate-600 font-bold mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mobileNumber" className="block text-slate-600 font-bold mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${errors.mobileNumber ? "border-red-500" : ""}`}
                />
                {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="py-2 px-6 border-[2px] border-theme-950 text-theme-950 font-bold text-sm rounded-full transition duration-200 hover:bg-theme-950 hover:text-main-bg"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};