import { BaseType } from '@/types/base-type';
import { UserType } from '@/types/user-type';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchSale = async () => {
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  const response = await axios.get(baseURL + 'transaction/amount', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  });
  const result: BaseType = await response.data;

  return result;
};

export const useSaleQuery = () =>
  useQuery(['sale'], fetchSale, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

const fetchItemOut = async () => {
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  const response = await axios.get(baseURL + 'transaction/item-out', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  });
  const result: BaseType = await response.data;

  return result;
};

export const useItemOutQuery = () =>
  useQuery(['item-out'], fetchItemOut, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
