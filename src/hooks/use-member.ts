/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { BaseType } from '@/types/base-type';
import { UserType } from '@/types/user-type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const createMember = async (name: string, phone: string) => {
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  const response = await axios.post(
    baseURL + 'member',
    { name, phone },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  const result: BaseType = await response.data;
  return result;
};

// export const useCreateMemberMutation = (name:string, phone: string) => {
//   const queryClient = useQueryClient();

//     queryClient.setMutationDefaults
// };
