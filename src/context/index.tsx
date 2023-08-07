/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
  DarkModeActions,
  OrderActions,
  darkModeReducer,
  orderReducer,
} from '@/reducers';
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
  darkMode: localStorage.getItem('theme')
    ? localStorage.getItem('theme')!
    : 'dark',
};

export const MyContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<OrderActions | DarkModeActions>;
}>({ state: contextInitialState, dispatch: () => {} });

const mainReducer = (
  { orderType, darkMode }: InitialStateType,
  action: any
) => ({
  orderType: orderReducer(orderType, action),
  darkMode: darkModeReducer(darkMode!, action),
});

const ContextProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, contextInitialState);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default ContextProvider;
