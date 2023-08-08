/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { BaseType } from '@/types/base-type';
import { UserType } from '@/types/user-type';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getNotification = async () => {
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  const response = await axios.get(baseURL + 'notification', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  });
  const result: BaseType = await response.data;

  return result;
};

export const useNotificationQuery = () =>
  useQuery(['notification'], getNotification, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
