/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UserType } from '@/types/user-type';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const getUser = localStorage.getItem('user');
  let token: string;
  let user: UserType;

  if (typeof getUser === 'string') {
    user = JSON.parse(getUser);
    token = user.token;
  }

  const useAuth = () => {
    if (token) {
      return true;
    }

    return false;
  };

  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="login" />;
};

export default ProtectedRoute;
