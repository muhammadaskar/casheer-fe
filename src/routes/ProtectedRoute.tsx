/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
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

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const useAuth = () => {
    if (token) {
      const decodeJwt = parseJwt(token);
      localStorage.setItem('user-data-parse', JSON.stringify(decodeJwt));
      if (decodeJwt?.exp * 1000 < Date.now()) {
        localStorage.removeItem('user');
        return window.location.reload();
      } else {
        return true;
      }
    }

    return false;
  };

  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="login" />;
};

export default ProtectedRoute;
