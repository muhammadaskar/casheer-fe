/* eslint-disable @typescript-eslint/no-floating-promises */
import { BaseType } from '@/types/base-type';
import { ProductCategory } from '@/types/product-type';
import { UserType } from '@/types/user-type';
import { useCallback, useEffect, useState } from 'react';

const useOrder = () => {
  const [category, setCategory] = useState<ProductCategory[]>([]);
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  console.log(user.token);

  const fetchCategory = useCallback(async () => {
    try {
      const response = await fetch(baseURL + 'category', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          Authorization: `Bearer ${user.token}`,
        },
      });
      const result: BaseType = await response.json();
      setCategory(result.data);
    } catch (error) {
      console.log(error);
    }
  }, [baseURL, user.token]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return {
    category,
  };
};

export default useOrder;
