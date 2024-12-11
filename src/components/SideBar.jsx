import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { roles } from '@/utils/constants';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAsync } from '@/app/services/authService';
import {
  FaHome,
  FaUsers,
  FaTasks,
  FaCog,
  FaBars,
  FaSignOutAlt,
} from 'react-icons/fa';

const Sidebar = () => {
  const { user } = useSelector((store) => store.auth);
  const role = user?.roles[0]?.name || roles.USER;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Define menu items based on roles
  const menuItems = {
    [roles.SUPERADMIN]: [
      { path: '/admin/dashboard', label: 'Dashboard', icon: <FaHome /> },
      { path: '/admin/user', label: 'Manage Users', icon: <FaUsers /> },
      { path: '/admin/task', label: 'Manage Tasks', icon: <FaTasks /> },
      { path: '/admin/settings', label: 'Settings', icon: <FaCog /> },
    ],
    [roles.USER]: [
      { path: '/user/dashboard', label: 'Dashboard', icon: <FaHome /> },
      { path: '/user/profile', label: 'Profile', icon: <FaUsers /> },
      { path: '/user/task', label: 'Tasks', icon: <FaTasks /> },
      { path: '/user/settings', label: 'Settings', icon: <FaCog /> },
    ],
  };

  const items = menuItems[role] || [];

  // Redirect or notify if no menu items are available
  if (!items.length) {
    toast.error('Access denied: No menu items available for your role.');
    navigate('/auth/login');
    return null; // Prevent rendering the sidebar
  }

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutAsync(toast, navigate, location));
    navigate('/auth/login');
  };

  return (
    <div
      className={`h-screen bg-green-700 text-white transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar toggle button */}
      <div
        className="flex justify-end p-2 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <FaBars className="text-xl" />
      </div>

      <h2 className="text-lg font-bold mb-4 px-4">
        {!isCollapsed && 'Task Management'}
      </h2>

      <nav>
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-2 rounded transition-all duration-300 ${
                isActive ? 'bg-green-800' : 'hover:bg-green-700'
              }`
            }
          >
            <div className="text-xl">{item.icon}</div>
            {/* Text is hidden when collapsed */}
            {!isCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-2 rounded w-full text-left transition-all duration-300 hover:bg-green-800"
        >
          <FaSignOutAlt className="text-xl" />
          {/* Text is hidden when collapsed */}
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
