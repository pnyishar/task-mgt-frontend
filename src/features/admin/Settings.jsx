import React, { useState } from 'react';
import { FaCog, FaUser, FaBell, FaPalette } from 'react-icons/fa';

const Settings = () => {
  // State to track active tab
  const [activeTab, setActiveTab] = useState('general');

  // State for form inputs
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [theme, setTheme] = useState('light');
  const [emailNotif, setEmailNotif] = useState(false);
  const [smsNotif, setSmsNotif] = useState(false);

  // Form submit handlers
  const handleGeneralSubmit = (e) => {
    e.preventDefault();

    console.log('General settings updated', { username, email });
  };

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    console.log('Account settings updated', { oldPassword, newPassword });
  };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    console.log('Notification settings updated', { emailNotif, smsNotif });
  };

  const handleThemeSubmit = (e) => {
    e.preventDefault();
    console.log('Theme settings updated', { theme });
  };

  // Render the active tab content
  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">General Settings</h2>
            <form onSubmit={handleGeneralSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Application Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter application name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        );
      case 'account':
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
            <form onSubmit={handleAccountSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Old Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        );
      case 'notifications':
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Notification Settings
            </h2>
            <form onSubmit={handleNotificationSubmit}>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                    checked={emailNotif}
                    onChange={(e) => setEmailNotif(e.target.checked)}
                  />
                  <span className="ml-2">Email Notifications</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                    checked={smsNotif}
                    onChange={(e) => setSmsNotif(e.target.checked)}
                  />
                  <span className="ml-2">SMS Notifications</span>
                </label>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
                >
                  Save Notifications
                </button>
              </div>
            </form>
          </div>
        );
      case 'theme':
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">Theme Customization</h2>
            <form onSubmit={handleThemeSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Choose Theme
                </label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
                >
                  Save Theme
                </button>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`flex items-center space-x-2 px-4 py-2 rounded ${
            activeTab === 'general'
              ? 'bg-green-700 text-white'
              : 'bg-white text-gray-700'
          }`}
          onClick={() => setActiveTab('general')}
        >
          <FaCog />
          <span>General</span>
        </button>
        <button
          className={`flex items-center space-x-2 px-4 py-2 rounded ${
            activeTab === 'account'
              ? 'bg-green-700 text-white'
              : 'bg-white text-gray-700'
          }`}
          onClick={() => setActiveTab('account')}
        >
          <FaUser />
          <span>Account</span>
        </button>
        <button
          className={`flex items-center space-x-2 px-4 py-2 rounded ${
            activeTab === 'notifications'
              ? 'bg-green-700 text-white'
              : 'bg-white text-gray-700'
          }`}
          onClick={() => setActiveTab('notifications')}
        >
          <FaBell />
          <span>Notifications</span>
        </button>
        <button
          className={`flex items-center space-x-2 px-4 py-2 rounded ${
            activeTab === 'theme'
              ? 'bg-green-700 text-white'
              : 'bg-white text-gray-700'
          }`}
          onClick={() => setActiveTab('theme')}
        >
          <FaPalette />
          <span>Theme</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white p-4 rounded shadow">{renderContent()}</div>
    </div>
  );
};

export default Settings;
