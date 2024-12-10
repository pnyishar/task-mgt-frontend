import React from 'react';
import { NavLink } from 'react-router-dom';
import { roles } from '@/utils/constants';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  // Get the role from the Redux store
  const { user } = useSelector((store) => store.auth);
  const role = user?.roles[0]?.name; // Assumes roles is an array

  // Define menu items based on role
  const menuItems = {
    [roles.SUPERADMIN]: [
      { path: '/admin/dashboard', label: 'Dashboard' },
      { path: '/admin/users', label: 'Manage Users' },
      { path: '/admin/tasks', label: 'Manage Tasks' },
      { path: '/admin/settings', label: 'Settings' },
    ],
    [roles.USER]: [
      { path: '/user/dashboard', label: 'Home' },
      { path: '/user/profile', label: 'Profile' },
      { path: '/user/settings', label: 'Settings' },
    ],
  };

  const items = menuItems[role] || [];

  return (
    <div className="w-64 bg-green-700 text-white h-full p-4">
      <h2 className="text-lg font-bold mb-4">Task Management</h2>
      <nav>
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? 'bg-green-800' : 'hover:bg-green-700'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
