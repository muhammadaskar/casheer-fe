/* eslint-disable @typescript-eslint/no-explicit-any */
export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  Order = 'ORDER_FORM',
}

export type OrderPayload = {
  [Types.Order]: {
    product_name: string;
    id: string;
    category: string;
    price: string;
    qty: number;
    total: string;
  };
};
