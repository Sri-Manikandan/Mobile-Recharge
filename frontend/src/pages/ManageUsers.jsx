import { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Admin/Sidebar';
import { UserContext } from '../context/UserContext';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editFormData, setEditFormData] = useState({ firstName: '', lastName: '', email: '', role: '' });
  const [addFormData, setAddFormData] = useState({ firstName: '', lastName: '', email: '', password: '', role: '' });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [passwordFormData, setPasswordFormData] = useState({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
  const { axiosInstance } = useContext(UserContext);

  useEffect(() => {
    axiosInstance.get('http://localhost:8080/auth/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, [axiosInstance]);

  const handleEditClick = (user) => {
    setEditFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
    setIsEditModalOpen(true);
    setCurrentUser(user);
  };

  const handleAddClick = () => setIsAddModalOpen(true);
  const handlePasswordClick = (user) => {
    setIsPasswordModalOpen(true);
    setCurrentUser(user);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setAddFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handlePasswordFormChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    axiosInstance.patch(`http://localhost:8080/auth/updateUser/${currentUser.id}`, editFormData)
      .then(response => {
        setUsers(users.map(user => user.email === editFormData.email ? response.data : user));
        setIsEditModalOpen(false);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post('http://localhost:8080/auth/addAdminUser', addFormData)
      .then(response => {
        if (response.data) {
          setUsers([...users, addFormData]);
          setIsAddModalOpen(false);
        } else {
          alert("Failed to add user");
        }
      })
      .catch(error => {
        console.error('Error adding user:', error);
        alert("Error adding user");
      });
  };

  const handlePasswordFormSubmit = (e) => {
    e.preventDefault();
    if (passwordFormData.newPassword !== passwordFormData.confirmNewPassword) {
      alert("New password and confirmation do not match");
      return;
    }
    axiosInstance.patch(`http://localhost:8080/auth/change-password`, {
      userId: currentUser.id,
      currentPassword: passwordFormData.oldPassword,
      newPassword: passwordFormData.newPassword,
    })
      .then(() => setIsPasswordModalOpen(false))
      .catch(error => console.error('Error changing password:', error));
  };

  const handleDeleteClick = (user) => {
    axiosInstance.delete(`http://localhost:8080/auth/deleteUser/${user.id}`)
      .then(() => setUsers(users.filter(u => u.id !== user.id)))
      .catch(error => console.error('Error deleting user:', error));
  };

  const closeEditModal = () => setIsEditModalOpen(false);
  const closeAddModal = () => setIsAddModalOpen(false);
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 p-6 md:w-3/4">
          <div className='flex justify-between items-center mb-4'>
            <h1 className="text-3xl font-bold text-center flex-1">User Management</h1>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg text-lg hover:bg-blue-700 transition"
              onClick={handleAddClick}
            >
              Add User
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b border-gray-700">First Name</th>
                  <th className="py-3 px-4 border-b border-gray-700 hidden md:table-cell">Last Name</th>
                  <th className="py-3 px-4 border-b border-gray-700 hidden md:table-cell">Email</th>
                  <th className="py-3 px-4 border-b border-gray-700 hidden md:table-cell">Role</th>
                  <th className="py-3 px-4 border-b border-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className='bg-gray-800'>
                {users.map(user => (
                  <tr key={user.email} className="hover:bg-gray-700 transition">
                    <td className="border-b px-4 py-2">{user.firstName}</td>
                    <td className="border-b px-4 py-2 hidden md:table-cell">{user.lastName}</td>
                    <td className="border-b px-4 py-2 hidden md:table-cell">{user.email}</td>
                    <td className="border-b px-4 py-2 hidden md:table-cell">{user.role}</td>
                    <td className="border-b px-4 py-2 flex space-x-2">
                      <button
                        className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition"
                        onClick={() => handleEditClick(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
                        onClick={() => handleDeleteClick(user)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 transition"
                        onClick={() => handlePasswordClick(user)}
                      >
                        Change Password
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-75 z-40" />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl"
                onClick={closeEditModal}
              >
                &times;
              </button>
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text text-center">Edit User</h2>
              <form onSubmit={handleEditFormSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={editFormData.firstName}
                    onChange={handleEditFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={editFormData.lastName}
                    onChange={handleEditFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                    Role
                  </label>
                  <select
                    name="role"
                    value={editFormData.role}
                    onChange={handleEditFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white w-full py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-75 z-40" />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl"
                onClick={closeAddModal}
              >
                &times;
              </button>
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text text-center">Add User</h2>
              <form onSubmit={handleAddFormSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={addFormData.firstName}
                    onChange={handleAddFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={addFormData.lastName}
                    onChange={handleAddFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={addFormData.email}
                    onChange={handleAddFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={addFormData.password}
                    onChange={handleAddFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                    Role
                  </label>
                  <select
                    name="role"
                    value={addFormData.role}
                    onChange={handleAddFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white w-full py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Password Change Modal */}
      {isPasswordModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-75 z-40" />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl"
                onClick={closePasswordModal}
              >
                &times;
              </button>
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text text-center">Change Password</h2>
              <form onSubmit={handlePasswordFormSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPassword">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordFormData.oldPassword}
                    onChange={handlePasswordFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordFormData.newPassword}
                    onChange={handlePasswordFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmNewPassword">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmNewPassword"
                    value={passwordFormData.confirmNewPassword}
                    onChange={handlePasswordFormChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white w-full py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageUsers;
