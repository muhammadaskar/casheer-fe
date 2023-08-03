/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { BaseType } from '@/types/base-type';
import { ProductCategory } from '@/types/product-type';
import { UserType } from '@/types/user-type';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const useOrder = () => {
  const [category, setCategory] = useState<ProductCategory[]>([]);
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  const fetchCategory = useCallback(async () => {
    // try {
    //   const response = await fetch(baseURL + 'category', {
    //     method: 'GET',
    //     headers: {
    // 'Content-Type': 'application/json',
    // Accept: 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': '*',
    // Authorization: `Bearer ${user.token}`,
    //     },
    //   });
    // const result: BaseType = await response.json();
    // setCategory(result.data);
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      const response = await axios.get(baseURL + 'category', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(response.data);
      const result: BaseType = await response.data();
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
