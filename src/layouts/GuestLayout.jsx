import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const GuestLayout = ({ children, title }) => {
  useEffect(() => {
    document.title = `${title} | ${import.meta.env.VITE_APP_TITLE}`;
  }, [title]);
  return <div className="w-full">{children}</div>;
};

export default GuestLayout;
