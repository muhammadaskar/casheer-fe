import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem('user') || '');

  const useAuth = () => {
    if (user.token) {
      return true;
    }

    return false;
  };

  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="login" />;
};

export default ProtectedRoute;
