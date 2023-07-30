/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { OrderActions, orderReducer } from '@/reducers';
import { InitialStateType } from '@/types/context-type';
import {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useMemo,
  useReducer,
} from 'react';

type Props = {
  children: ReactNode;
};

const contextInitialState: InitialStateType = {
  orderType: {
    product_name: '',
    id: '',
    category: '',
    price: '',
    qty: 0,
    total: '',
  },
};

export const MyContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<OrderActions>;
}>({ state: contextInitialState, dispatch: () => {} });

const mainReducer = ({ orderType }: InitialStateType, action: any) => ({
  orderType: orderReducer(orderType, action),
});

const ContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, contextInitialState);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default ContextProvider;
