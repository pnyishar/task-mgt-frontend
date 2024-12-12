import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTaskAsync } from '@/app/services/taskService';

const NewTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'NORMAL',
    dueDate: '',
    status: 'PENDING',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskData.title.trim() === '') {
      alert('Task title is required');
      return;
    }
    const formData = {
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      status: taskData.status,
    };
    console.log('New task:', formData);
    dispatch(createTaskAsync({ formData, toast, navigate }));
    setTaskData({
      title: '',
      description: '',
      priority: 'NORMAL',
      dueDate: '',
      status: 'WAITING',
    });
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Create a New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter task title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter task description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="HIGH">High</option>
            <option value="NORMAL">Normal</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={taskData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="WAITING">Waiting</option>
            <option value="STARTED">Started</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default NewTask;
