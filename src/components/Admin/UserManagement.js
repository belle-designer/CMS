import React, { useState, useEffect } from 'react';

function UserManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [rowToDelete, setRowToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [role, setRole] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false); // State to trigger refresh
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:5005/api/getUsers');
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const data = await response.json();
          setUsers(data); // Update state with fetched data
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, [refresh]); // Empty dependency array ensures this runs once on mount

    const updateUser = async (userData) => {
      console.log("hi", userData);
      try {
        const response = await fetch('http://localhost:5005/api/updateUser', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
    
        const data = await response.json();
        if (response.ok) {
          console.log('User updated successfully:', data.message);
        } else {
          console.error('Error updating user:', data.error || data.message);
        }
      } catch (error) {
        console.error('Request failed:', error);
      }
    };

  const handleEditClick = (user) => {
    setUserToEdit(user);
    setIsModalOpen(true); 
  };
  

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleRefresh = () => {
    setRefresh((prev) => !prev); // Toggle `refresh` to trigger useEffect
  };

  const confirmEdit = async () => {
    try {
      // Create an updated user object with the new role
      const updatedUser = { ...userToEdit, role: role };
  
      // Update the user on the backend
      await updateUser(updatedUser); // Ensure this call completes before proceeding
  
      // Update the local users state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user // Update only the relevant user
        )
      );
  
      // Trigger a re-fetch or refresh logic
      setRefresh((prev) => !prev);
  
      // Close the popup and reset the userToEdit state
      setIsPopupVisible(false);
      setUserToEdit(null);
    } catch (error) {
      console.error('Error updating user:', error);
      // Optional: Add error handling or show an error message to the user
    }
  };
  


  const cancelEdit = () => {
    setIsPopupVisible(false);
    setUserToEdit(null);
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const currentData = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDeleteClick = (userId) => {
    setRowToDelete(userId);
    setIsModalOpen(true);
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch('http://localhost:5005/api/deleteUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
  
      const data = await response.json();
      console.log('User deleted:', data); // Handle the response data as needed
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const confirmDelete = () => {
    deleteUser(rowToDelete);
    setUsers(users.filter((user) => user.id !== rowToDelete));
    setIsModalOpen(false);
    setRowToDelete(null);
  };
  
  const cancelDelete = () => {
    setIsModalOpen(false);
    setRowToDelete(null);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });

  const togglePopup = (selectedRole) => {
    setRole(selectedRole);
    setIsPopupVisible(!isPopupVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.username) formErrors.username = 'Username is required';
    if (!formData.password) formErrors.password = 'Password is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      username: '',
      password: '',
    });
    setErrors({
      name: '',
      email: '',
      username: '',
      password: '',
    });
    setIsPopupVisible(false);
  };

  const addUser = async (user) => {
    try {
      const response = await fetch('http://localhost:5005/api/addUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({user}),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
  
      const data = await response.json();
      console.log('User added:', data); // Handle the response data as needed
    } catch (error) {
      console.error('Error adding user:', error);
      alert("Database Error!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted successfully:', formData);
  
      const newUser = {
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        role: role,
      };
      await addUser(newUser);
      getNumberOfUsers();
      handleRefresh();

  
      handleCancel();
    }
  };
  const [adminNumber, setAdminNumber] = useState(0);
  const [educatorNumber, setEducatorNumber] = useState(0);
  const getNumberOfUsers = async () => {
    try {
      const response = await fetch('http://localhost:5005/api/getNumberofUsers'); // Call the backend API
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setAdminNumber(data.users.admins);
      setEducatorNumber(data.users.educators);
      // Do something with the data
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  getNumberOfUsers();

  return (
    <div className="user-management">

      <div className="mid flex justify-between pb-4 gap-x-4">
        <div className="box w-1/2 bg-white p-4 border rounded-2xl shadow-md flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Educators</h2>
            <div className="flex flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
              <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/>
            </svg>
            </div>
          </div>

          <div className="flex flex-row justify-between items-start">
            <h1 className="text-7xl pt-4 pb-4">{educatorNumber}</h1>
            <button className="mt-2 justify-start" onClick={() => togglePopup('educator')}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
              <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
            </svg>
            </button>
          </div>

          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-300">
              <div style={{ width: '80%' }} className="rounded-lg shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-700"></div>
            </div>
          </div>
        </div>

        <div className="box w-1/2 bg-white p-4 border rounded-2xl shadow-md flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Admins</h2>
            <div className="flex flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
              <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/>
            </svg>
            </div>
          </div>

          <div className='flex flex-row justify-between items-start'>
            <h1 className="text-7xl pt-4 pb-4">{adminNumber}</h1>
            <button className="mt-2 justify-start" onClick={() => togglePopup('admin')}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
              <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
            </svg>
            </button>
          </div>

          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-300">
              <div style={{ width: '20%' }} className="rounded-lg shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-700"></div>
            </div>
          </div>
        </div>
      </div>

      {isPopupVisible && (
        <div className="popup fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="popup-content bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Add Account</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">Role:</label>
                <input
                  type="text"
                  value={role.charAt(0).toUpperCase() + role.slice(1)}
                  className="w-full p-2 border rounded"
                  readOnly
                />
              </div>
              <div className="flex justify-end">
                <button type="button" className="px-4 py-2 mr-2 bg-gray-300 rounded" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="justify-center items-center mt-8 bg-white rounded-xl">

        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed text-center items-center p-4">
            <thead>
              <tr className="border-b-2 border-black pt-2 pb-2">
                <th className="py-3 px-4 font-semibold text-mid text-gray-700 w-1/3">NAME</th>
                <th className="py-3 px-4 font-semibold text-mid text-gray-700 w-1/3">ROLE</th>
                <th className="py-3 px-4 font-semibold text-mid text-gray-700 w-1/3">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((user) => (
                <tr key={user.id}>
                  <td className="py-3 px-4 text-gray-600 truncate w-1/3 max-w-xs">{user.name}</td>
                  <td className="py-3 px-4 text-gray-600 w-1/3">{user.role}</td>
                  <td className="py-3 px-4 text-gray-600 w-1/3">

                    {}
                    <button onClick={() => handleEditClick(user)}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
                      </svg>
                    </button>

                    {}
                    <button className="ml-2" onClick={() => handleDeleteClick(user.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff2929">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && userToEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-lg w-full">
              <h3 className="text-lg font-semibold mb-4">Edit User</h3>
              <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <input
                  type="text"
                  value={userToEdit.name || ''} // Default value if userToEdit.password is undefined
                  disabled
                  // onChange={(e) => setUserToEdit({ ...userToEdit, name: e.target.value })} // Update the state with the new password
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                  type="text"
                  value={userToEdit.email || ''} // Default value if userToEdit.password is undefined
                  disabled
                  // onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })} // Update the state with the new password
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Username:</label>
                <input
                  type="text"
                  value={userToEdit.username || ''} // Default value if userToEdit.password is undefined
                  disabled
                  // onChange={(e) => setUserToEdit({ ...userToEdit, username: e.target.value })} // Update the state with the new password
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Password:</label>
                  <input
                    type="password"
                    value={userToEdit.password}
                    disabled
                    onChange={(e) => setUserToEdit({ ...userToEdit, password: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Role:</label>
                  <select
                    value={role}
                    onChange={handleRoleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="admin">admin</option>
                    <option value="educator">educator</option>
                  </select>
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={confirmEdit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isModalOpen && rowToDelete && !userToEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
              <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this user?</h3>
              <div className="flex justify-around">
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={cancelDelete}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="border-t-2 border-black flex justify-center">
          <div className="flex space-x-2 justify-center items-center pt-4 pb-4">
          {}
          <button 
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000">
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
            </svg>
          </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${currentPage === index + 1 ? 'bg-green-500' : 'bg-gray-300'}`}
            onClick={() => handlePageChange(index + 1)}
          ></button>
        ))}
        
        <button 
          className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000">
            <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
          </svg>
        </button>
        </div>
      </div>
    </div>
    
  </div>
  );
}

export default UserManagement;
