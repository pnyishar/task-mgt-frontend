import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserTasksAsync } from '@/app/services/taskService';
import { toast } from 'react-toastify';
import { getCurrentUser } from '@/app/services/commonService';
import NewTask from './NewTask';

const Task = () => {
  const dispatch = useDispatch();
  const { userTasks } = useSelector((store) => store.task);
  const { currentUser } = useSelector((store) => store.common);

  const [filters, setFilters] = useState({
    priority: '',
    dueDate: '',
    status: '',
  });

  const [isCreatingTask, setIsCreatingTask] = useState(false);

  // Fetch the current user on component mount
  useEffect(() => {
    dispatch(getCurrentUser({ toast }));
  }, [dispatch]);

  // Fetch tasks for the current user when the current user is available
  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(
        getAllUserTasksAsync({
          userId: currentUser.id,
          toast,
          page: 0,
          limit: 10,
        })
      );
    }
  }, [currentUser, dispatch]);

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters only when activated
  const applyFilters = () => {
    return userTasks?.entities?.filter((task) => {
      const isFilterActive =
        filters.priority || filters.dueDate || filters.status;
      return isFilterActive
        ? (filters.priority ? task.priority === filters.priority : true) &&
            (filters.dueDate ? task.dueDate === filters.dueDate : true) &&
            (filters.status ? task.status === filters.status : true)
        : true;
    });
  };

  // Determine the tasks to display
  const tasksToDisplay = applyFilters() || userTasks?.data?.entities || [];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">
        {currentUser?.fullName} Tasks
      </h1>

      {/* Button to Create Task */}
      {!isCreatingTask && (
        <div className="text-right mb-6">
          <button
            onClick={() => setIsCreatingTask(true)}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            Create New Task
          </button>
        </div>
      )}

      {/* Filters Section */}
      {!isCreatingTask && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Filter Tasks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Priorities</option>
              <option value="HIGH">High</option>
              <option value="NORMAL">Normal</option>
              <option value="LOW">Low</option>
            </select>

            <input
              type="date"
              name="dueDate"
              value={filters.dueDate}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="WAITING">Waiting</option>
              <option value="STARTED">Started</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>
      )}

      {/* Task List */}
      {!isCreatingTask ? (
        <div className="space-y-4">
          {tasksToDisplay.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white border rounded-lg shadow"
            >
              <h2 className="text-lg font-bold">{task.title}</h2>
              <p>{task.description}</p>
              <p>Priority: {task.priority}</p>
              <p>Due Date: {task.dueDate}</p>
              <p>Status: {task.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <NewTask onClose={() => setIsCreatingTask(false)} />
      )}
    </div>
  );
};

export default Task;
