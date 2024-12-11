import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getAllTasksAsync } from '@/app/services/adminService';

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { taskList, totalUsers, currentPage, totalPages, loading } =
    useSelector((state) => state.admin);

  // Fetch users when the component mounts or page changes
  useEffect(() => {
    dispatch(getAllTasksAsync({ page: currentPage - 1, limit: 10 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    dispatch(getAllTasksAsync({ page: newPage - 1, limit: 10 }));
  };

  const handleDelete = (taskId) => {
    // Implement delete functionality
  };

  const handleEdit = (taskId) => {
    navigate(`/admin/task/edit/${taskId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage User Tasks</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Priority</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Due Date</th>
                <th className="py-2 px-4 border-b">Author</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {taskList?.map((task) => (
                <tr key={task.id}>
                  <td className="py-2 px-4 border-b">{task.title}</td>
                  <td className="py-2 px-4 border-b">{task.description}</td>
                  <td className="py-2 px-4 border-b">{task.priority}</td>
                  <td className="py-2 px-4 border-b">{task.status}</td>
                  <td className="py-2 px-4 border-b">{task.dueDate}</td>
                  <td className="py-2 px-4 border-b">{task.createdBy}</td>
                  <td className="py-2 px-4 border-b flex gap-2">
                    <button
                      onClick={() => handleEdit(task.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
