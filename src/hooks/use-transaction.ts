/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseType } from '@/types/base-type';
import { UserType } from '@/types/user-type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useTransactionMutation = () => {
  const queryClient = useQueryClient();
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  return useMutation({
    mutationFn: async (input: { member_code: string; transactions: any }) => {
      const response = await axios.post(baseURL + 'transaction', input, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      return response.data as BaseType;
    },

    onSuccess: async (addTransaction) => {
      await queryClient.invalidateQueries(['transaction']);

      queryClient.setQueryData(['transaction'], addTransaction);
    },
  });
};

const fetchTransactions = async () => {
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');
  const response = await axios.get(baseURL + 'transaction', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  });

  const result: BaseType = response.data;
  return result;
};

export const useTransactionQuery = () =>
  useQuery(['transaction-list'], fetchTransactions, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

const fetchTransactionsThisYear = async () => {
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');
  const response = await axios.get(baseURL + 'transaction/this-year', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  });

  const result: BaseType = response.data;
  return result;
};

export const useTransactionThisYearQuery = () =>
  useQuery(['transaction-year'], fetchTransactionsThisYear, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
