import { useEffect } from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import Login from '@/features/auth/Login';

const LandingPage = () => {
  useEffect(() => {}, []);
  return (
    <GuestLayout title={'LoginOrRegister'}>
      <Login title={'Login'} />
    </GuestLayout>
  );
};

export default LandingPage;
