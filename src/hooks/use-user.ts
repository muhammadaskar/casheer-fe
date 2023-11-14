import { BaseType } from '@/types/base-type';
import { UserType } from '@/types/user-type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const fetchUser = async () => {
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  const response = await axios.get(baseURL + 'users', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  });

  const result: BaseType = await response.data;
  return result;
};

export const useUserQuery = () =>
  useQuery(['users'], fetchUser, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

const fetchUnprocessUser = async () => {
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  const response = await axios.get(baseURL + 'users/unprocess', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  });

  const result: BaseType = await response.data;
  return result;
};

export const useUnprocessUserQuery = () =>
  useQuery(['unprocess-users'], fetchUnprocessUser, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

const fetchUserPhoto = async () => {
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  const response = await axios.get(baseURL + 'user/profile-image', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  });

  const result: BaseType = await response.data;
  return result;
};

export const useUserPhotoQuery = () =>
  useQuery(['account'], fetchUserPhoto, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

export const useUserProfileMutation = () => {
  const queryClient = useQueryClient();
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  return useMutation({
    mutationFn: async (input: { name: string; email: string }) => {
      await axios.put(baseURL + 'user/update/name-or-email', input, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
    },

    onSuccess: async (update) => {
      await queryClient.invalidateQueries(['profile-info']);
      queryClient.setQueryData(['profile-info'], update);
    },
  });
};

export const useUserAccountMutation = () => {
  const queryClient = useQueryClient();
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  return useMutation({
    mutationFn: async (input: {
      current_password: string;
      new_password: string;
    }) => {
      await axios.put(baseURL + 'user/update/password', input, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
    },

    onSuccess: async (update) => {
      await queryClient.invalidateQueries(['account']);
      queryClient.setQueryData(['account'], update);
    },
  });
};

export const useUserPhotoProfileMutation = () => {
  const queryClient = useQueryClient();
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  return useMutation({
    mutationFn: async (input: { image: string }) => {
      await axios.post(baseURL + 'user/profile-image', input, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
    },

    onSuccess: async (update) => {
      await queryClient.invalidateQueries(['account']);
      queryClient.setQueryData(['account'], update);
    },
  });
};
