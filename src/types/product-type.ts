export interface ProductCategory {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
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
  name: string;
  price: number;
  quantity: number;
  total: number;
}
