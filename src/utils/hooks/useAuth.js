import { useEffect } from 'react';

function useAuth(user) {
  useEffect(() => {}, [user]);
  return <div>useAuth</div>;
}

export default useAuth;
