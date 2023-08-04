/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { BaseType } from '@/types/base-type';
import { NotificationType } from '@/types/notification-type';
import { UserType } from '@/types/user-type';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const useNotification = () => {
  const [notification, setNotification] = useState<NotificationType[]>();
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  const getNotification = useCallback(async () => {
    try {
      const response = await axios.get(baseURL + 'notification', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      const result: BaseType = await response.data;
      setNotification(result.data);
    } catch (error) {
      console.log(error);
    }
  }, [baseURL, user.token]);

  useEffect(() => {
    getNotification();
  }, [getNotification]);

  return { notification };
};

export default useNotification;
