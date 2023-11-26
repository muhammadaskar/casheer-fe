/* eslint-disable @typescript-eslint/no-explicit-any */
import { createWithEqualityFn } from 'zustand/traditional';

export interface InvoiceFormValue {
  id: number;
  product_name: string;
  price: number;
  quantity: number;
  total: number;
}

interface InvoiceStore {
  invoiceForm: any;
  setInvoiceForm: (value: any) => void;
}

export const useInvoiceStore = createWithEqualityFn<InvoiceStore>(
  (set) => ({
    invoiceForm: [],
    setInvoiceForm: (value: [InvoiceFormValue]) => set({ invoiceForm: value }),
  }),
  Object.is
);
