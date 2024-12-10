import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { roles } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const AuthLayout = ({ children, title }) => {
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    document.title = `${title} | ${import.meta.env.VITE_APP_TITLE}`;
  }, [title]);

  useEffect(() => {
    console.log('Outside =>', user);
    if (
      user !== undefined &&
      user?.token &&
      user?.roles[0]?.name === roles.SUPERADMIN
    ) {
      return navigate('/admin/dashboard');
    } else if (
      user !== undefined &&
      user?.token &&
      user?.roles[0]?.name === roles.USER
    ) {
      return navigate('/user/dashboard');
    }
  }, [user]);

  return (
    <div className="flex flex-col h-screen bg-[#E4F0FA] overflow-hidden w-full">
      <div className="flex flex-col relative h-full w-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
