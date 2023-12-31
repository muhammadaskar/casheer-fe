export interface ProductCategory {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  code: string;
}

export interface CombineInvoice {
  product_name: string;
  id: number;
  price: number;
  qty: number;
  total: number;
}
export interface Invoice {
  id: number;
  product_name: string;
  price: number;
  quantity: number;
  total: number;
}

export type TransactionType = {
  id: number;
  member_code: string;
  transaction_code: string;
  product_and_quantity: string;
  total_quantity: number;
  amount: number;
  casheer_name: string;
};

export type TransactionParseType = {
  id: number;
  member_code: string;
  transaction_code: string;
  product_and_quantity: [];
  total_quantity: number;
  amount: number;
  casheer_name: string;
  created_at: string;
};
