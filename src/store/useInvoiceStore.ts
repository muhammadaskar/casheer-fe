import { createWithEqualityFn } from 'zustand/traditional';

export interface InvoiceFormValue {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface InvoiceStore {
  invoiceForm: [InvoiceFormValue];
  setInvoiceForm: (value: [InvoiceFormValue]) => void;
}

export const useInvoiceStore = createWithEqualityFn<InvoiceStore>(
  (set) => ({
    invoiceForm: [
      {
        id: 0,
        name: '',
        price: 0,
        quantity: 0,
        total: 0,
      },
    ],
    setInvoiceForm: (value: [InvoiceFormValue]) => set({ invoiceForm: value }),
  }),
  Object.is
);
