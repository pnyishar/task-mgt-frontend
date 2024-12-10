import { useEffect } from 'react';

const AuthLayout = ({ children, title }) => {
  useEffect(() => {
    document.title = `${title} | ${import.meta.env.VITE_APP_TITLE}`;
  }, [title]);

  return (
    <div className="flex flex-col h-screen bg-[#E4F0FA] overflow-hidden w-full">
      <div className="flex flex-col relative h-full w-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
