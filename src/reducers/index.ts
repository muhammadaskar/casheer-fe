import { OrderContextType } from '@/types/context-type';
import { ActionMap, DarkModePayload, OrderPayload } from '@/types/reducer-type';

export type OrderActions =
  ActionMap<OrderPayload>[keyof ActionMap<OrderPayload>];

export const orderReducer = (state: OrderContextType, action: OrderActions) => {
  switch (action.type) {
    case 'ORDER_FORM':
      return {
        ...state,
        product_name: action.payload.product_name,
        id: action.payload.id,
        category: action.payload.category,
        price: action.payload.price,
        qty: action.payload.qty,
        total: action.payload.total,
      };

    default:
      return state;
  }
};

export type DarkModeActions =
  ActionMap<DarkModePayload>[keyof ActionMap<DarkModePayload>];

export const darkModeReducer = (state: string, action: DarkModeActions) => {
  switch (action.type) {
    case 'DARK_MODE':
      return action.payload;
    default:
      return state;
  }
};
