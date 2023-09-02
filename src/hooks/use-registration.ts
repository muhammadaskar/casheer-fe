/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { UserType } from '@/types/user-type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FormEvent, useState } from 'react';

export const useRegistration = () => {
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
      const response = await fetch(baseURL + 'auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });

      const result = await response.json();
      setResponseStatus(response.status);
      if (response.status >= 200 && response.status < 300) {
        setMessage(result.meta.message);
      } else {
        setMessage(result.data.errors);
      }
    } catch (error: any) {
      setMessage(error);
    }
  };

  return { onRegistration, message, responseStatus, setResponseStatus };
};

export const useAcceptRegistrationMutation = () => {
  const queryClient = useQueryClient();
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.put(
        baseURL + `user/activate/${id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    },

    onSuccess: async (accept) => {
      await queryClient.invalidateQueries(['registration']);
      queryClient.setQueryData(['registration'], accept);
    },
  });
};

export const useRejectRegistrationMutation = () => {
  const queryClient = useQueryClient();
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.put(
        baseURL + `user/reject/${id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    },

    onSuccess: async (reject) => {
      await queryClient.invalidateQueries(['registration']);
      queryClient.setQueryData(['registration'], reject);
    },
  });
};
