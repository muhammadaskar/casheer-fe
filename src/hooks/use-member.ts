/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { BaseType } from '@/types/base-type';
import { UserType } from '@/types/user-type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchMember = async () => {
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  const response = await axios.get(baseURL + 'member', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  });

  const result: BaseType = await response.data;
  return result;
};

export const useMemberQuery = () =>
  useQuery(['member'], fetchMember, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

export const useMemberMutation = () => {
  const queryClient = useQueryClient();
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  return useMutation({
    mutationFn: async (input: { name: string; phone: string }) => {
      await axios.post(baseURL + 'member', input, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
    },
    onSuccess: async (addMember) => {
      await queryClient.invalidateQueries(['member']);

      queryClient.setQueryData(['member'], addMember);
    },
  });
};
