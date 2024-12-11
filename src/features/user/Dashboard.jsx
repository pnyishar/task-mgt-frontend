import React, { useEffect } from 'react';
import { FaTasks, FaCheckCircle, FaClipboardList } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUserDashboardDataAsync } from '@/app/services/userService';
import { getCurrentUser } from '@/app/services/commonService';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.common);
  const { userStats, recentTasks } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCurrentUser({ toast }));
  }, [dispatch]);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(
        getUserDashboardDataAsync({
          userId: currentUser.id,
          toast,
        })
      );
    }
  }, [currentUser, dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
          <FaTasks className="text-blue-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Created Tasks</h3>
            <p className="text-gray-600">{userStats?.numberOfCreatedTasks}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
          <FaCheckCircle className="text-green-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Completed Tasks</h3>
            <p className="text-gray-600">{userStats?.numberOfCompletedTasks}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
          <FaClipboardList className="text-yellow-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Waiting Tasks</h3>
            <p className="text-gray-600">{userStats?.numberOfWaitingTasks}</p>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Recent Tasks</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          <ul>
            {recentTasks?.length > 0 ? (
              recentTasks.map((task, index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">{task.title}</span> -{' '}
                  <span className="italic">{task.status}</span>
                </li>
              ))
            ) : (
              <p>No recent tasks available.</p>
            )}
          </ul>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-blue-700"
            onClick={() => toast.info('View All Tasks clicked!')}
          >
            <FaTasks className="mr-2" /> View All Tasks
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:bg-green-700"
            onClick={() => toast.info('Mark Task Complete clicked!')}
          >
            <FaCheckCircle className="mr-2" /> Mark Task Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
