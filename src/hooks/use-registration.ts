/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios from 'axios';
import { FormEvent, useState } from 'react';

const useRegistration = () => {
  const [message, setMessage] = useState<string>('');
  const [responseStatus, setResponseStatus] = useState<number>(0);
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;

  const onRegistration = async (
    event: FormEvent<HTMLFormElement>,
    name: string,
    username: string,
    email: string,
    password: string
  ) => {
    event.preventDefault();
    try {
      // const response = await fetch(baseURL + 'auth/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Accept: 'application/json',
      //     'Access-Control-Allow-Origin': '*',
      //   },
      //   body: JSON.stringify({
      //     name,
      //     username,
      //     email,
      //     password,
      //   }),
      // });
      // const result = await response.json();
      const response = await axios.post(baseURL + 'auth/register', {
        name,
        username,
        email,
        password,
      });
      const result = await response.data;
      setResponseStatus(response.status);
      if (response.status >= 200 && response.status < 300) {
        setMessage(result.meta.message);
      } else {
        setMessage(result.data.errors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { onRegistration, message, responseStatus, setResponseStatus };
};

export default useRegistration;
