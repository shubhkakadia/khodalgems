import React, { useEffect, useState, useMemo } from "react";
import {
  Users,
  BarChart2,
  Settings,
  Edit2,
  Trash2,
  UserCheck,
  UserX,
  Search,
} from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  }
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

  const usersPerPage = 25;

  // Fetch Users from API
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users`,
          headers: {},
        };

        const response = await axios.request(config);
        setUsers(response.data);
        setFilteredUsers(response.data);
        toast.success("Users loaded successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to load users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Search and Filtering
  useEffect(() => {
    const filtered = users.filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.business_type.toLowerCase().includes(searchTerm.toLowerCase())
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

  // CRUD Operations
  const createUser = async (newUser) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/register`, newUser);
      setUsers([...users, response.data]);
      setFilteredUsers([...filteredUsers, response.data]);
      toast.success("User created successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create user");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      setIsLoading(true);
      const response = await axios.put(`http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/${updatedUser.id}`, updatedUser);
      
      const updatedUsers = users.map(user => 
        user.id === updatedUser.id ? response.data : user
      );
      
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      
      toast.success("User updated successfully!");
      setIsModalOpen(false);
      setIsEditMode(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      setIsLoading(true);
      await axios.delete(`http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/${userId}`);
      
      const updatedUsers = users.filter(user => user.id !== userId);
      
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      setIsLoading(true);
      const userToToggle = users.find(user => user.id === userId);
      const updatedUser = { ...userToToggle, active: !userToToggle.active };
      
      const response = await axios.put(`http://${process.env.REACT_APP_USER_SERVER_ADDRESS}/users/${userId}`, { active: updatedUser.active });
      
      const updatedUsers = users.map(user => 
        user.id === userId ? {...user, active: updatedUser.active} : user
      );
      
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      
      toast.success(`User ${updatedUser.active ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update user status");
    } finally {
      setIsLoading(false);
    }
  };

  // User Modal Component
  const UserModal = ({ user, onClose, onSave, onCreate }) => {
    const [formData, setFormData] = useState(user ? { ...user } : {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      company_name: '',
      business_type: '',
      phone_number: '',
      password: isEditMode ? null : '', // Only require password for new users
      active: true
    });

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({ 
        ...prev, 
        [name]: type === 'checkbox' ? checked : value 
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // If edit mode, use onSave, otherwise use onCreate
      isEditMode ? onSave(formData) : onCreate(formData);
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg shadow-xl w-[600px] max-h-[90vh] flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-gray-800 p-6 pb-0">
            {isEditMode ? "Edit User" : "Create New User"}
          </h2>
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 pt-0">
            <div className="grid grid-cols-2 gap-4">
              {/* User Details Fields */}
              {Object.entries(formData).map(([key, value]) => {
                // Exclude certain fields from display
                if (['id', 'cart', 'wishlist', 'profile_picture', 'admin', 'notifications_toggle'].includes(key)) return null;
                
                return (
                  <div key={key} className="mb-4">
                    <label className="block text-gray-700 mb-2 capitalize">
                      {key.replace(/_/g, ' ')}
                    </label>
                    {key === 'active' ? (
                      <input
                        type="checkbox"
                        name={key}
                        checked={value}
                        onChange={handleChange}
                        className="mr-2"
                      />
                    ) : key === 'password' && !isEditMode ? (
                      <input
                        type="password"
                        name={key}
                        value={value}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <input
                        type="text"
                        name={key}
                        value={value || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end space-x-2 mt-4 sticky bottom-0 bg-white pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
              >
                {isEditMode ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

    // Sidebar Component (remains the same)
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
          <div className="space-y-2">
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
        </div>
      );
    };

      // Users Table Component
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
                }}
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
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
                    {["Username", "First Name", "Company Name", "Business Type", "Status", "Actions"].map(
                      (header) => (
                        <th
                          key={header}
                          className="p-3 text-left font-semibold text-primary-900"
                        >
                          {header}
                        </th>
                      )
                    )}
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
                          {user.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setIsModalOpen(true);
                              setIsEditMode(false);
                            }}
                            className="text-blue-600 hover:bg-blue-100 p-1.5 rounded-full transition-colors"
                            title="View"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setIsModalOpen(true);
                              setIsEditMode(true);
                            }}
                            className="text-green-600 hover:bg-green-100 p-1.5 rounded-full transition-colors"
                            title="Edit"
                          >
                            <Settings className="w-5 h-5" />
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
                Page {currentPage} of {totalPages} - Total Users: {filteredUsers.length}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-primary-100 text-primary-900 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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

  // Rest of the component remains the same as in the previous implementation
  // ... (Sidebar, UsersTable, and other components)

  return (
    <div className="flex h-screen">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      )}

      {/* Toast Container for Notifications */}
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
          }}
          onSave={isEditMode ? updateUser : null}
          onCreate={!isEditMode ? createUser : null}
        />
      )}
    </div>
  );
};

export default AdminPortal;