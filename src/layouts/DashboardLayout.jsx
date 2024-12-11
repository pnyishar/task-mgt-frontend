import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  // const { user } = useSelector((store) => store.auth);
  // const role = user?.roles[0]?.name;
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
