import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Users,
  BarChart2,
  Settings,
  Trash2,
  UserCheck,
  UserX,
  Search,
  Eye,
  Edit,
  LogOut,
  User,
  Upload,
} from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Initial mock user data
const initialUsers = [
  {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    designation: "",
    company_name: "",
    business_type: "",
    phone_number: "",
    website: "",
    username: "",
    password: "",
    address: "",
    notifications_toggle: false,
    cart: [],
    wishlist: [],
    profile_picture: "",
    active: false,
    admin: false,
  },
];

const AdminPortal = () => {
  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState({
    username: "Admin User",
    role: "Super Admin",
    email: "admin@example.com",
  });

  const usersPerPage = 25;

  useEffect(() => {
    // Fetch current admin details
    const fetchCurrentAdmin = async () => {
      try {
        const response = await axios.get(
          `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/admin/current`
        );
        setCurrentAdmin(response.data);
      } catch (error) {
        console.error("Failed to fetch admin details:", error);
      }
    };

    fetchCurrentAdmin();
  }, []);

  // Fetch Users from API
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        );
        setUsers(response.data);
        setFilteredUsers(response.data);
        toast.success("Users loaded successfully!");
      } catch (error) {
        console.error(error);
        if (error.response?.status === 401) {
          handleLogout();
        }
        toast.error("Failed to load users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/";
  };

  // Search and Filtering
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.business_type?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  // Pagination Logic
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * usersPerPage;
    return filteredUsers.slice(startIndex, startIndex + usersPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // CRUD Operations with error handling and authentication
  const createUser = async (newUser) => {
    console.log(newUser);
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/register`,
        newUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      setUsers((prev) => [...prev, response.data]);
      setFilteredUsers((prev) => [...prev, response.data]);
      toast.success("User created successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        handleLogout();
      }
      toast.error(
        `${
          error.response?.data?.error || error.response?.data?.message
        }, Failed to create user`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/${updatedUser.id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      setUsers((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? response.data : user))
      );

      toast.success("User updated successfully!");
      setIsModalOpen(false);
      setIsEditMode(false);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        handleLogout();
      }
      toast.error(error.response?.data?.message || "Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      setIsLoading(true);
      await axios.delete(
        `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      setUsers((prev) => prev.filter((user) => user.id !== userId));
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        handleLogout();
      }
      toast.error(error.response?.data?.message || "Failed to delete user");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      setIsLoading(true);
      const userToToggle = users.find((user) => user.id === userId);
      const updatedUser = { ...userToToggle, active: !userToToggle.active };

      const response = await axios.put(
        `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/${userId}`,
        { active: updatedUser.active }
      );

      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, active: updatedUser.active } : user
      );

      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);

      toast.success(
        `User ${updatedUser.active ? "activated" : "deactivated"} successfully!`
      );
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update user status"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const UsersTable = () => {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary-900">
            User Management
          </h1>
          <button
            onClick={() => {
              setSelectedUser(null);
              setIsModalOpen(true);
              setIsEditMode(false);
              setIsViewMode(false);
            }}
            className="px-4 py-2 bg-primary-500 text-theme-800 rounded-md hover:bg-primary-600 transition-colors"
          >
            Create User
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Search users by username, name, company, or business type"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Search className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary-100">
                {[
                  "Username",
                  "First Name",
                  "Company Name",
                  "Business Type",
                  "Status",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="p-3 text-left font-semibold text-primary-900"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className={`border-b hover:bg-gray-50 transition-colors ${
                    !user.active ? "bg-primary-50" : "bg-white"
                  }`}
                >
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.first_name}</td>
                  <td className="p-3">{user.company_name}</td>
                  <td className="p-3">{user.business_type}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        user.active
                          ? "bg-green-200 text-green-900"
                          : "bg-red-100 text-red-900"
                      }`}
                    >
                      {user.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsModalOpen(true);
                          setIsEditMode(false);
                          setIsViewMode(true);
                        }}
                        className="text-blue-600 hover:bg-blue-100 p-1.5 rounded-full transition-colors"
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsModalOpen(true);
                          setIsEditMode(true);
                          setIsViewMode(false);
                        }}
                        className="text-green-600 hover:bg-green-100 p-1.5 rounded-full transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 hover:bg-red-100 p-1.5 rounded-full transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`p-1.5 rounded-full transition-colors ${
                          user.active
                            ? "text-red-600 hover:bg-red-100"
                            : "text-green-600 hover:bg-green-100"
                        }`}
                        title={user.active ? "Deactivate" : "Activate"}
                      >
                        {user.active ? (
                          <UserX className="w-5 h-5" />
                        ) : (
                          <UserCheck className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-600">
            Page {currentPage} of {totalPages} - Total Users:{" "}
            {filteredUsers.length}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-primary-100 text-primary-900 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-primary-100 text-primary-900 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  const UserModal = ({ user, onClose, onSave, onCreate }) => {
    const [formData, setFormData] = useState(
      user
        ? { ...user }
        : {
            first_name: null,
            last_name: null,
            username: null,
            email: null,
            company_name: null,
            business_type: null,
            phone_number: null,
            password: isEditMode ? null : null,
            active: true,
            profile_picture: null,
            cart: JSON.stringify([]),
            wishlist: JSON.stringify([]),
            id: null,
            notifications_toggle: false,
            admin: false,
          }
    );

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            profile_picture: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      isEditMode ? onSave(formData) : onCreate(formData);
    };

    // Required fields for create and edit modes
    const requiredFields = [
      "first_name",
      "last_name",
      "username",
      "email",
      "phone_number",
    ];

    // Separate profile-related fields from other form fields
    const profileFields = ["profile_picture"];
    const systemFields = [
      "cart",
      "wishlist",
      "id",
      "notifications_toggle",
      "admin",
    ];

    // Filter fields based on view mode
    const formFields = Object.entries(formData).filter(
      ([key]) =>
        !profileFields.includes(key) &&
        (!systemFields.includes(key) ||
          (isViewMode && systemFields.includes(key)))
    );

    // Helper function to render field based on type
    const renderField = ([key, value]) => {
      if (isViewMode && systemFields.includes(key)) {
        if (key === "cart" || key === "wishlist") {
          return (
            <div key={key} className="col-span-3">
              <label className="block text-gray-700 text-sm font-medium capitalize mb-2">
                {key.replace(/_/g, " ")}
              </label>
              <div className="bg-gray-50 p-4 rounded-md">
                {Array.isArray(value) && value.length > 0 ? (
                  <div className="grid grid-cols-4 gap-2">
                    {value.map((productId, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 rounded-md text-sm"
                      >
                        {productId}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500">No items</span>
                )}
              </div>
            </div>
          );
        }

        // Group boolean fields together
        if (key === "notifications_toggle" || key === "admin") {
          return (
            <div key={key} className="col-span-1 flex items-center space-x-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium capitalize">
                  {key.replace(/_/g, " ")}
                </label>
                <span
                  className={`${value ? "text-green-600" : "text-red-600"}`}
                >
                  {value ? "Yes" : "No"}
                </span>
              </div>
            </div>
          );
        }

        if (key === "id") {
          return (
            <div key={key} className="col-span-3">
              <label className="block text-gray-700 text-sm font-medium capitalize">
                {key.replace(/_/g, " ")}
              </label>
              <div className="flex items-center h-10">
                <span className="text-gray-700">{value}</span>
              </div>
            </div>
          );
        }
      }

      // Active status is always rendered for all modes
      if (key === "active") {
        return (
          <div key={key} className="col-span-3">
            <div className="flex items-center">
              <input
                disabled={isViewMode}
                type="checkbox"
                name={key}
                checked={value}
                onChange={handleChange}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-gray-600">Active Status</span>
            </div>
          </div>
        );
      }

      const isRequired = !isViewMode && requiredFields.includes(key);

      return (
        <div key={key}>
          <label className="block text-gray-700 text-sm font-medium capitalize">
            {key.replace(/_/g, " ")}{" "}
            {isRequired && <span className="text-red-500">*</span>}
          </label>

          {key === "password" && !isEditMode ? (
            <input
              disabled={isViewMode}
              type="password"
              name={key}
              value={value}
              onChange={handleChange}
              required={isRequired}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50"
            />
          ) : (
            <input
              disabled={isViewMode}
              type="text"
              name={key}
              value={value || ""}
              onChange={handleChange}
              required={isRequired}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50"
            />
          )}
        </div>
      );
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg shadow-xl w-[900px] max-h-[90vh] flex flex-col">
          <h2 className="text-2xl font-bold p-6 pb-4 border-b text-gray-800">
            {isEditMode
              ? "Edit User"
              : isViewMode
              ? "View User Details"
              : "Create New User"}
          </h2>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="flex p-6 gap-8">
              {/* Left Column - Profile Picture */}
              <div className="w-1/3 flex flex-col items-center space-y-4">
                <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                  {formData.profile_picture ? (
                    <img
                      src={formData.profile_picture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-4xl">
                          {formData.first_name?.[0]?.toUpperCase()}
                        </span>
                      </div>
                      <p className="mt-4 text-gray-400">No Image Available</p>
                    </div>
                  )}
                </div>
                {!isViewMode && (
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors w-full inline-block text-center">
                      Upload Photo
                    </span>
                  </label>
                )}
              </div>

              {/* Right Column - Form Fields */}
              <div className="w-2/3">
                <div className="grid grid-cols-3 gap-6">
                  {/* Boolean fields container for view mode */}
                  {isViewMode && (
                    <div className="col-span-3 flex space-x-8 mb-4 bg-gray-50 p-4 rounded-md">
                      {formFields
                        .filter(([key]) =>
                          ["active", "notifications_toggle", "admin"].includes(
                            key
                          )
                        )
                        .map(renderField)}
                    </div>
                  )}
                  {/* Active status for edit/create mode */}
                  {!isViewMode && (
                    <div className="col-span-3 mb-4">
                      {formFields
                        .filter(([key]) => key === "active")
                        .map(renderField)}
                    </div>
                  )}
                  {/* Other form fields */}
                  {formFields
                    .filter(
                      ([key]) =>
                        !["active", "notifications_toggle", "admin"].includes(
                          key
                        )
                    )
                    .map(renderField)}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky rounded-lg bottom-0 bg-gray-50 px-6 py-4 border-t mt-4 flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                {isViewMode ? "Close" : "Cancel"}
              </button>
              {!isViewMode && (
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-600 border border-theme-300 text-theme-700 hover:bg-theme-200 rounded-md hover:bg-primary-700 transition-colors"
                >
                  {isEditMode ? "Update" : "Create"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Sidebar Component with user info and logout
  const Sidebar = () => {
    const sidebarItems = [
      {
        icon: <Users className="w-5 h-5" />,
        label: "Users",
        tab: "users",
      },
      {
        icon: <BarChart2 className="w-5 h-5" />,
        label: "Analytics",
        tab: "analytics",
      },
      {
        icon: <Settings className="w-5 h-5" />,
        label: "Settings",
        tab: "settings",
      },
    ];

    return (
      <div className="w-64 h-screen p-4 shadow-lg bg-primary-50 border-r border-primary-100 flex flex-col">
        <div className="text-2xl font-bold mb-8 text-center py-4 text-primary-900">
          Admin Portal
        </div>

        {/* Admin Info Section */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <User className="w-8 h-8 text-primary-600" />
            <div>
              <h3 className="font-medium text-primary-900">
                {currentAdmin.username}
              </h3>
              <p className="text-sm text-primary-600">{currentAdmin.role}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{currentAdmin.email}</p>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 space-y-2">
          {sidebarItems.map((item) => (
            <div
              key={item.tab}
              className={`flex items-center p-3 rounded-md cursor-pointer transition-colors duration-200 group ${
                activeTab === item.tab
                  ? "bg-primary-200 text-primary-900"
                  : "hover:bg-primary-100 text-primary-800"
              }`}
              onClick={() => setActiveTab(item.tab)}
            >
              <span className="mr-3 group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              {item.label}
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center p-3 rounded-md cursor-pointer transition-colors duration-200 text-red-600 hover:bg-red-50 group"
        >
          <LogOut className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
          Logout
        </button>
      </div>
    );
  };

  // [Rest of your existing components: UsersTable, UserModal remain the same]
  // ... Include your existing UsersTable and UserModal components here

  return (
    <div className="flex h-screen">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        {activeTab === "users" && <UsersTable />}
        {activeTab === "analytics" && (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-primary-900">
              Analytics (Coming Soon)
            </h1>
          </div>
        )}
        {activeTab === "settings" && (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-primary-900">
              Settings (Coming Soon)
            </h1>
          </div>
        )}
      </div>

      {isModalOpen && (
        <UserModal
          user={selectedUser}
          onClose={() => {
            setIsModalOpen(false);
            setIsEditMode(false);
            setIsViewMode(false);
          }}
          onSave={updateUser}
          onCreate={createUser}
        />
      )}
    </div>
  );
};

export default AdminPortal;
