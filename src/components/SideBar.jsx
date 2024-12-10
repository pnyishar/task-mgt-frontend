import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { roles } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';

// eslint-disable-next-line react/prop-types
const AuthLayout = ({ children, title }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    document.title = `${title} | ${import.meta.env.VITE_APP_TITLE}`;
  }, [title]);

  useEffect(() => {
    if (!user?.token) {
      return navigate('/auth/login');
    }

    if (user?.roles[0]?.name === roles.SUPERADMIN) {
      navigate('/admin/dashboard');
    } else if (user?.roles[0]?.name === roles.USER) {
      navigate('/user/dashboard');
    }
  }, [user, navigate]);

  const userRole = user?.roles[0]?.name;

  return (
    <div className="flex h-screen">
      <Sidebar role={userRole} />

      {/* Main Content Area */}
      <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">{children}</div>
    </div>
  );
};

export default AuthLayout;
