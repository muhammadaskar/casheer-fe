/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { UserData } from '@/types/user-type';
import { FormEvent } from 'react';
// import { useNavigate } from 'react-router-dom';

const useAuthentication = () => {
  // const navigate = useNavigate();
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;

  const authLogin = async (
    event: FormEvent<HTMLFormElement>,
    username: string,
    password: string
  ) => {
    event.preventDefault();
    try {
      const response = await fetch(baseURL + 'auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const result: UserData = await response.json();
      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem('user', JSON.stringify(result.data));
        // navigate('/', { replace: true });
        window.location.reload();
      } else {
        console.log('Login error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { authLogin };
};

export default useAuthentication;
