import { createWithEqualityFn } from 'zustand/traditional';

interface OrderFormValue {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface OrderStore {
  orderForm: OrderFormValue;
  isClicked: boolean;
  setOrderForm: (value: OrderFormValue) => void;
  setClick: (value: boolean) => void;
}

export const useOrderStore = createWithEqualityFn<OrderStore>(
  (set) => ({
    orderForm: {
      id: 0,
      name: '',
      price: 0,
      quantity: 0,
      total: 0,
    },
    isClicked: true,
    setOrderForm: (value: OrderFormValue) => set({ orderForm: value }),
    setClick: (value: boolean) => set({ isClicked: value }),
  }),
  Object.is
);
