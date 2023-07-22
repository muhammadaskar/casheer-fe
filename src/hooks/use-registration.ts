import { FormEvent, useState } from 'react';

const useRegistration = () => {
  const [message, setMessage] = useState('');
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
      const response = await fetch(baseURL + 'auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });
      //   const result: UserData = await response.json();
      if (response.status >= 200 && response.status < 300) {
        setMessage('Registration Successfull');
      } else {
        setMessage('Registration Failed');
      }
    } catch (error) {
      console.log(error);
      setMessage('Registration Failed');
    }
  };

  return { onRegistration, message };
};

export default useRegistration;