/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BaseType } from '@/types/base-type';

import { FormEvent, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

const useAuthentication = () => {
  const [messageAuth, setMessageAuth] = useState<string>('');
  const [responseStatusAuth, setResponseStatusAuth] = useState<number>(0);
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
        body: JSON.stringify({
          username,
          password,
        }),
      });

      // });
      const result: BaseType = await response.json();
      setResponseStatusAuth(response.status);
      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem('user', JSON.stringify(result.data));
        // navigate('/', { replace: true });
        window.location.reload();
      } else {
        setMessageAuth(result.data.errors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { authLogin, setResponseStatusAuth, responseStatusAuth, messageAuth };
};

export default useAuthentication;
