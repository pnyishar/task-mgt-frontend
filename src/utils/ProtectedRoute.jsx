import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const location = useLocation();
  const { user } = useSelector((store) => store.auth);
  if (!user?.token) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return children;
}

export default ProtectedRoute;
