export interface OrderContextType {
  product_name: string;
  id: string;
  category: string;
  price: string;
  qty: number;
  total: string;
}

export interface DarkModeContextType {
  dark_mode: string | undefined;
}

export interface InitialStateType {
  orderType: OrderContextType;
  darkMode: string | undefined;
}
