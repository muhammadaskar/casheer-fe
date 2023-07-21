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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutIndex />}>
        {/* Menu */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transaction" element={<Transaction />} />
        <Route path="report" element={<Report />} />

        {/* Management */}
        <Route path="product" element={<Product />} />
        <Route path="stock" element={<Stock />} />
        <Route path="customer" element={<Customer />} />
        <Route path="user" element={<User />} />

        {/* Settings */}
        <Route path="profile" element={<Profile />} />
        <Route path="customize" element={<Customize />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
