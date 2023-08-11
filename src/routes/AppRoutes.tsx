import LayoutIndex from '@/components/layout';
import Customer from '@/pages/management/customer';
import Product from '@/pages/management/product';
import Stock from '@/pages/management/stock';
import Dashboard from '@/pages/menu/dashboard';
import Report from '@/pages/menu/report';
import Transaction from '@/pages/menu/transaction';
import Customize from '@/pages/settings/customize';
import Profile from '@/pages/settings/profile';
import { User } from 'lucide-react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '@/pages/login';
import PublicRoute from './PublicRoute';
import NotFound from '@/pages/NotFound';
import useDarkMode from '@/hooks/use-darkmode';
import SettingLayout from '@/components/layout/SettingLayout';
import Account from '@/pages/settings/account';
import { useContext } from 'react';
import { MyContext } from '@/context';
import Settings from '@/pages/settings';

const AppRoutes = () => {
  const { state } = useContext(MyContext);
  const { toggleDarkMode } = useDarkMode();

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route
          path="/"
          element={
            <LayoutIndex mode={state.darkMode!} toggle={toggleDarkMode} />
          }
        >
          {/* Menu */}
          <Route path="/" element={<Dashboard />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="report" element={<Report />} />

          {/* Management */}
          <Route path="product" element={<Product />} />
          <Route path="stock" element={<Stock />} />
          <Route path="customer" element={<Customer />} />
          <Route path="user" element={<User />} />

          <Route path="settings" element={<Settings />} />
          {/* Settings */}
        </Route>
        <Route
          path="settings"
          element={
            <SettingLayout mode={state.darkMode!} toggle={toggleDarkMode} />
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="account" element={<Account />} />
          <Route path="customize" element={<Customize />} />
        </Route>
      </Route>

      <Route path="/" element={<PublicRoute />}>
        <Route path="login" element={<Login />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
