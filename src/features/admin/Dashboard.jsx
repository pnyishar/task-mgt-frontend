import React, { useEffect } from 'react';
import { FaUsers, FaTasks, FaCheckCircle, FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAdminDashboardDataAsync } from '@/app/services/adminService';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.admin);

  const getStats = () => dispatch(getAdminDashboardDataAsync({ toast }));

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
          <FaUsers className="text-blue-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-gray-600">{stats?.numberOfUsers}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
          <FaTasks className="text-green-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Tasks</h3>
            <p className="text-gray-600">{stats?.numberOfTasks}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
          <FaCheckCircle className="text-yellow-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Completed Tasks</h3>
            <p className="text-gray-600">{stats?.numberOfCompletedTasks}</p>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          <ul>
            <li className="mb-2">
              <span className="font-semibold">John Doe</span> added a new task -
              <span className="italic"> "Update user profile feature"</span>.
            </li>
            <li className="mb-2">
              <span className="font-semibold">Admin</span> updated settings.
            </li>
            <li>
              <span className="font-semibold">Jane Smith</span> completed the
              task -<span className="italic"> "Fix login issue."</span>.
            </li>
          </ul>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link
            to="/admin/users/add"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-blue-700"
          >
            <FaPlusCircle className="mr-2" /> Add User
          </Link>
          <Link
            to="/admin/reports"
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-green-700"
          >
            <FaPlusCircle className="mr-2" /> Generate Report
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
