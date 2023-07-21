import Login from '@/pages/login';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const user = JSON.parse(localStorage.getItem('user') || '');

  const useAuth = () => {
    if (user.token) {
      return true;
    }

    return false;
  };

  const auth = useAuth();

  return auth ? <Navigate to="dashboard" /> : <Outlet />;
};

export default PublicRoute;
