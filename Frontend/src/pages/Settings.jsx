import React, { useState } from 'react';
import { Form } from 'react-router-dom'; // Assuming Form component is imported correctly
import { resetPassword, changePassword, softDeleteUser, updateUser } from '../api'; // Import API functions

function Settings() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({ email, code, newPassword });
      setMessage('Password reset successful!');
    } catch (error) {
      setMessage(`Error resetting password: ${error.message}`);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await changePassword({ oldPassword, newPassword });
      setMessage('Password changed successfully!');
    } catch (error) {
      setMessage(`Error changing password: ${error.message}`);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ firstName, lastName, email, phone });
      setMessage('User updated successfully!');
    } catch (error) {
      setMessage(`Error updating user: ${error.message}`);
    }
  };
  

  const handleSoftDeleteUser = async (e) => {
    e.preventDefault();
    try {
      await softDeleteUser();
      setMessage('User account soft deleted successfully!');
    } catch (error) {
      setMessage(`Error during soft delete: ${error.message}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 my-10 bg-[#bababa] rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Settings</h1>

      {/* Reset Password Box */}
      <div className="border rounded-md p-4 mb-4">
        <h2 className="text-lg font-medium mb-2">Reset Password</h2>
        <Form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#2DA884] focus:border-[#2DA884] sm:text-sm"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Code</label>
            <input
              type="text"
              name="code"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#2DA884] focus:border-[#2DA884] sm:text-sm"
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#2DA884] focus:border-[#2DA884] sm:text-sm"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleResetPassword}
            className="mt-2 px-4 py-2 bg-[#2DA884] text-white rounded-md hover:bg-[#2DA884] focus:outline-none focus:ring-2 focus:ring-[#2DA884] focus:ring-offset-2"
          >
            Reset Password
          </button>
        </Form>
      </div>

      {/* Change Password Box */}
      <div className="border rounded-md p-4 mb-4">
        <h2 className="text-lg font-medium mb-2">Change Password</h2>
        <Form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#2DA884] focus:border-[#2DA884] sm:text-sm"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-[#2DA884] focus:border-[#2DA884] sm:text-sm"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleChangePassword}
            className="mt-2 px-4 py-2 bg-[#2DA884] text-white rounded-md hover:bg-[#2DA884] focus:outline-none focus:ring-2 focus:ring-[#2DA884] focus:ring-offset-2"
          >
            Change Password
          </button>
        </Form>
      </div>

      {/* Update User Box */}
      <div className="border  rounded-md p-4 mb-4">
        <h2 className="text-lg font-medium mb-2">Update User</h2>
        <Form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-bg-[#2DA884] focus:border-bg-[#2DA884] sm:text-sm"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-bg-[#2DA884] focus:border-bg-[#2DA884] sm:text-sm"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-bg-[#2DA884] focus:border-bg-[#2DA884] sm:text-sm"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            onClick={handleUpdateUser}
            className="mt-2 px-4 py-2 bg-[#2DA884] text-white rounded-md hover:bg-[#2DA884] focus:outline-none focus:ring-2 focus:ring-bg-[#2DA884] focus:ring-offset-2"
          >
            Update User
          </button>
        </Form>
      </div>

      {/* Soft Delete Account Box */}
      <div className=" rounded-md p-4 mb-4">
        <button
          onClick={handleSoftDeleteUser}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete Account
        </button>
      </div>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}

export default Settings;
