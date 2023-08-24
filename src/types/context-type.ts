export interface OrderContextType {
  product_name: string;
  id: number;
  price: number;
  qty: number;
  total: number;
}

export interface DarkModeContextType {
  dark_mode: string | undefined;
}

export interface InitialStateType {
  orderType: OrderContextType;
  darkMode: string | undefined;
}
