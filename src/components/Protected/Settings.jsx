// Settings.jsx
import React, { useRef, useState } from "react";
import { Bell, Phone, Lock, Eye, EyeOff, X, Upload } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
// import { useDarkMode } from "../../context/DarkModeContext";

const BUSINESS_TYPES = [
  "E-tailer(B2B)",
  "E-tailer(B2C)",
  "Investor",
  "Jewellery manufacturer",
  "Jewellery retailer",
  "Other",
  "Personal",
  "Retailer",
  "Retailer(100+)",
  "Retailer (10-100)",
  "Watch",
  "Wholesaler",
];

const COUNTRY_CODES = [
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "India" },
  { code: "+86", country: "China" },
  { code: "+81", country: "Japan" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+61", country: "Australia" },
];

const ToggleSwitch = ({ checked, onChange }) => (
  <div
    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer ${
      checked ? "bg-theme-600" : "bg-gray-300"
    }`}
    onClick={() => onChange(!checked)}
  >
    <div
      className={`bg-white h-4 w-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </div>
);

const SettingsSection = ({ title, children }) => (
  <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
    <h3 className="text-xl font-semibold text-theme-800 mb-4">{title}</h3>
    {children}
  </div>
);

const PasswordModal = ({ isOpen, onClose }) => {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const validatePasswords = () => {
    const newErrors = {};

    if (!passwords.current) {
      newErrors.current = "Current password is required";
    }

    if (!passwords.new) {
      newErrors.new = "New password is required";
    } else if (passwords.new.length < 8) {
      newErrors.new = "Password must be at least 8 characters";
    }

    if (!passwords.confirm) {
      newErrors.confirm = "Please confirm your password";
    } else if (passwords.new !== passwords.confirm) {
      newErrors.confirm = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      toast.success("Password changed successfully!");
      onClose();
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const renderPasswordInput = (field, label) => (
    <div>
      <label className="block text-sm font-medium text-theme-800 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPasswords[field] ? "text" : "password"}
          value={passwords[field]}
          onChange={(e) => {
            setPasswords((prev) => ({ ...prev, [field]: e.target.value }));
            setErrors((prev) => ({ ...prev, [field]: "" }));
          }}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
            errors[field]
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-theme-500"
          }`}
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility(field)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
        >
          {showPasswords[field] ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {errors[field] && (
        <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
      )}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold text-theme-800 mb-4">
          Change Password
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderPasswordInput("current", "Current Password")}
          {renderPasswordInput("new", "New Password")}
          {renderPasswordInput("confirm", "Confirm New Password")}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-theme-600 text-white rounded-md hover:bg-theme-700"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Settings() {
  // const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [newsletterSubscription, setNewsletterSubscription] = useState(true);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [profileData, setProfileData] = useState({
    firstName: "Shubh",
    lastName: "Kakadia",
    email: "shubh@kayracreation.com",
    designation: "Manager",
    companyName: "kayra Creation",
    address: "123 Business Street",
    countryCode: "+1",
    phoneNumber: "234-567-8900",
    website: "www.kayracreation.com",
    username: "shubhkakadia",
    password: "password123",
    businessType: "Jewellery retailer",
  });

  const [originalData, setOriginalData] = useState({ ...profileData });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    address: "",
    phoneNumber: "",
    website: "",
  });

  const validateName = (name) => {
    return /^[A-Za-z\s]+$/.test(name);
  };

  const validatePhone = (phone) => {
    return /^[\d-]+$/.test(phone);
  };

  const validateWebsite = (website) => {
    return /^[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+$/.test(website);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsEditing(true);
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateName(profileData.firstName)) {
      newErrors.firstName = "First name should only contain letters and spaces";
    }
    if (!validateName(profileData.lastName)) {
      newErrors.lastName = "Last name should only contain letters and spaces";
    }
    if (!validateName(profileData.designation)) {
      newErrors.designation =
        "Designation should only contain letters and spaces";
    }
    if (!profileData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!validatePhone(profileData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    if (!validateWebsite(profileData.website)) {
      newErrors.website = "Please enter a valid website";
    }

    if (!validateEmail(profileData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setIsVerificationModalOpen(true);
    } else {
      toast.error("Please fix the errors before saving");
    }
  };

  const handleVerification = (password) => {
    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    if (password === profileData.password) {
      setOriginalData(profileData);
      setIsEditing(false);
      setIsVerificationModalOpen(false);
      toast.success("Settings saved successfully!");
    } else {
      setError("Incorrect password");
      toast.error("Incorrect password. Please try again.");
    }
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setIsEditing(false);
    setErrors({
      firstName: "",
      lastName: "",
      designation: "",
      address: "",
      phoneNumber: "",
      website: "",
    });
  };

  const renderInput = (name, label, disabled = false) => (
    <div>
      <label className="block text-sm font-medium text-theme-800 mb-1">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={profileData[name]}
        onChange={handleInputChange}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
          errors[name]
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-theme-500"
        } ${
          disabled
            ? "bg-gray-100 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            : ""
        }`}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  );

  const removePhoto = () => {
    setProfilePhoto(null);
    setIsEditing(true);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
      setIsEditing(true);
    }
  };
  // Add email validation
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="flex w-full h-full">
      {isVerificationModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
              <h3 className="text-xl font-semibold text-theme-800 mb-4">
                Verify Changes
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Please enter your password to save changes
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleVerification(password);
                }}
                className="space-y-4"
              >
                <div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                        error
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-theme-500"
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs mt-1">{error}</p>
                  )}
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsVerificationModalOpen(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-theme-600 text-white rounded-md hover:bg-theme-700"
                  >
                    Verify & Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />

      <div className="flex-none md:w-20 w-14">
        <Sidebar />
      </div>

      <div className="flex-auto m-4 space-y-3 w-[85%] h-full">
        <div className="sticky top-0 bg-main-bg z-[5] py-2 flex md:justify-between md:items-center md:flex-row flex-col gap-2">
          <div>
            <h2 className="text-4xl font-semibold pb-4 text-theme-600">
              Settings
            </h2>
          </div>

          <button
            onClick={() => navigate("/contact")}
            className="flex items-center px-4 py-2 relative animate-[attention_1s_ease-in-out_infinite] hover:bg-theme-300 hover:animate-none rounded-md hover:text-white transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" />
            <span>Contact Us</span>
            <style jsx global>{`
              @keyframes attention {
                0% {
                  color: rgb(75 85 99); /* text-gray-600 dark:text-gray-300 */
                }
                50% {
                  color: rgb(79 70 229); /* text-theme-600 */
                }
                100% {
                  color: rgb(75 85 99); /* text-gray-600 dark:text-gray-300 */
                }
              }
            `}</style>
          </button>
        </div>

        <div className="space-y-6">
          <SettingsSection title="User Details">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="col-span-2 flex items-center space-x-4 mb-6">
                <div className="relative">
                  {profilePhoto ? (
                    <div className="relative">
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <button
                        onClick={removePhoto}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-2xl text-gray-500">
                        {profileData.firstName.charAt(0)}
                        {profileData.lastName.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="px-4 py-2 text-sm bg-theme-600 text-white rounded-md hover:bg-theme-700 flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Photo</span>
                  </button>
                  <p className="text-sm text-gray-500 mt-1">
                    Recommended: Square image, at least 400x400px
                  </p>
                </div>
              </div>
              {renderInput("firstName", "First Name")}
              {renderInput("lastName", "Last Name")}
              {renderInput("email", "Email Address")}
              {renderInput("designation", "Designation")}
              {renderInput("companyName", "Company Name", true)}

              <div>
                <label className="block text-sm font-medium text-theme-800 mb-1">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={profileData.countryCode}
                    onChange={handleInputChange}
                    className="w-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 border-gray-300 focus:ring-theme-500"
                  >
                    {COUNTRY_CODES.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.code} ({country.country})
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleInputChange}
                    className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                      errors.phoneNumber
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-theme-500"
                    }`}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {renderInput("website", "Website")}
              {renderInput("username", "Username", true)}

              <div className="col-span-2">
                {renderInput("address", "Address")}
              </div>
            </div>
          </SettingsSection>

          <SettingsSection title="Business Information">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-theme-800 mb-1">
                  Business Type
                </label>
                <select
                  name="businessType"
                  value={profileData.businessType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 border-gray-300 focus:ring-theme-500"
                >
                  {BUSINESS_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="text-sm font-medium text-theme-800">
                    Newsletter Subscription
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive promotional letters and stock updates
                  </p>
                </div>
                <ToggleSwitch
                  checked={newsletterSubscription}
                  onChange={setNewsletterSubscription}
                />
              </div>
            </div>
          </SettingsSection>

          <SettingsSection title="Preferences">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-theme-600" />
                  <div>
                    <h4 className="text-sm font-medium text-theme-800">
                      Notifications
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Manage your notification preferences
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={notifications}
                  onChange={setNotifications}
                />
              </div>

              {/* <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <Moon className="h-5 w-5 text-theme-600" />
                  <div>
                    <h4 className="text-sm font-medium text-theme-800">
                      Dark Mode
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Toggle dark mode on or off
                    </p>
                  </div>
                </div>
                <ToggleSwitch checked={isDarkMode} onChange={toggleDarkMode} />
              </div> */}

              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="flex items-center space-x-2 text-theme-600 hover:text-theme-700"
              >
                <Lock className="h-4 w-4" />
                <span>Change Password</span>
              </button>
            </div>
          </SettingsSection>

          {isEditing && (
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-theme-600 text-white rounded-md hover:bg-theme-700"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
