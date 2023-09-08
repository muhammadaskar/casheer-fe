/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseType } from '@/types/base-type';
import { UserType } from '@/types/user-type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback, useState } from 'react';

export const fetchAllProduct = async () => {
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  const response = await axios.get(baseURL + `products`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  });

  const result: BaseType = await response.data;
  return result;
};

export const useAllProductQuery = () =>
  useQuery(['product'], fetchAllProduct, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

export const fetchProduct = async (page: number) => {
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  const response = await axios.get(baseURL + `product?page=${page}&limit=10`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  });

  if (response.status >= 200 && response.status < 300) {
    const result: BaseType = await response.data;
    return result;
  }
};

export const useProductQuery = (page: number) =>
  useQuery(['product', page], () => fetchProduct(page), {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  return useMutation({
    mutationFn: async (input: { name: string }) => {
      await axios.post(baseURL + 'category', input, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
    },

    onSuccess: async (addCategory) => {
      await queryClient.invalidateQueries(['category']);
      queryClient.setQueryData(['category'], addCategory);
    },
  });
};

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  return useMutation({
    mutationFn: async (input: {
      category_id: number;
      name: string;
      price: number;
      quantity: number;
      description: string;
    }) => {
      await axios.post(baseURL + 'product', input, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
    },

    onSuccess: async (addProduct) => {
      await queryClient.invalidateQueries(['product']);
      queryClient.setQueryData(['product'], addProduct);
    },
  });
};

export const useUpdateProductMutation = (id: number) => {
  const queryClient = useQueryClient();
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  return useMutation({
    mutationFn: async (input: {
      category_id: number;
      name: string;
      price: number;
      quantity: number;
      description: string;
    }) => {
      const sendData = {
        category_id: input.category_id,
        name: input.name,
        price: input.price,
        quantity: input.quantity,
        description: input.description,
      };

      await axios.put(baseURL + `product/${id}`, sendData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(['product']);
    },
    onError: (er) => {
      console.log(er);
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(baseURL + `product/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(['product']);
    },

    onError: (err) => {
      console.log(err);
    },
  });
};

export const useSearchProduct = () => {
  const [searchData, setSearchData] = useState<any>();
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  const fetchSearch = useCallback(
    async (query: string) => {
      const response = await axios.get(baseURL + `product?query=${query}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      const result: BaseType = await response.data;
      setSearchData(result);
    },
    [baseURL, user]
  );

  return {
    fetchSearch,
    searchData,
  };
};

export const useUpdateQuantityMutation = (id: number) => {
  const queryClient = useQueryClient();
  const baseURL: string = import.meta.env.VITE_REACT_APP_BASE_URL;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

  return useMutation({
    mutationFn: async (input: { quantity: number }) => {
      await axios.put(baseURL + `product/quantity/${id}`, input, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries(['product']);
    },
    onError: (er) => {
      console.log(er);
    },
  });
};
