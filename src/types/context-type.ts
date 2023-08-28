import { Invoice } from './product-type';

export interface OrderContextType {
  product_name: string;
  id: number;
  price: number;
  qty: number;
  total: number;
}

export interface InvoiceContext {
  invoice: any;
}

export interface DarkModeContextType {
  dark_mode: string | undefined;
}

export interface InitialStateType {
  orderType: OrderContextType;
  darkMode: string | undefined;
  invoiceForm: InvoiceContext;
}
