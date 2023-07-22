import { buttonStyle } from '@/styles';
import {
  CalculatorIcon,
  FileSpreadsheetIcon,
  LayoutGridIcon,
  MonitorDotIcon,
  PackageIcon,
  PackageSearchIcon,
  UserCogIcon,
  UserSquareIcon,
  UsersIcon,
} from 'lucide-react';

import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type SidebarSubmenu = {
  icon: ReactNode;
  name: string;
  path: string;
};

type SidebarItemType = {
  title: string;
  submenu: Array<SidebarSubmenu>;
};

const sidebarItem: Array<SidebarItemType> = [
  {
    title: 'Menu',
    submenu: [
      {
        icon: <LayoutGridIcon className="mr-2 w-4 h-4" />,
        name: 'Dashboard',
        path: 'dashboard',
      },
      {
        icon: <CalculatorIcon className="mr-2 w-4 h-4" />,
        name: 'Pemesanan & Penjualan',
        path: 'transaction',
      },
      {
        icon: <FileSpreadsheetIcon className="mr-2 w-4 h-4" />,
        name: 'Pelaporan & Analisis',
        path: 'report',
      },
    ],
  },
  {
    title: 'Manajemen',
    submenu: [
      {
        icon: <PackageIcon className="mr-2 w-4 h-4" />,
        name: 'Produk',
        path: 'product',
      },
      {
        icon: <PackageSearchIcon className="mr-2 w-4 h-4" />,
        name: 'Stok',
        path: '/stock',
      },
      {
        icon: <UserSquareIcon className="mr-2 w-4 h-4" />,
        name: 'Customer',
        path: 'customer',
      },
      {
        icon: <UsersIcon className="mr-2 w-4 h-4" />,
        name: 'User',
        path: 'user',
      },
    ],
  },
  {
    title: 'Settings',
    submenu: [
      {
        icon: <MonitorDotIcon className="mr-2 w-4 h-4" />,
        name: 'Customize',
        path: 'customize',
      },
      {
        icon: <UserCogIcon className="mr-2 w-4 h-4" />,
        name: 'Profile',
        path: 'profile',
      },
    ],
  },
];

const Sidebar: FC = () => {
  return (
    <div className="hidden w-64 pt-10 border-r p-4 scrollbar-hide border-gray-200 overflow-auto hover:overflow-scroll h-screen sm:block lg:block">
      {sidebarItem.map((item) => (
        <div className="py-3" key={item.title}>
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            {item.title}
          </h2>
          <div className="space-y-1">
            {item.submenu.map((subItem) => (
              <NavLink
                key={subItem.path}
                to={subItem.path}
                className={({ isActive }) =>
                  isActive ? buttonStyle.buttonActive : buttonStyle.buttonGhost
                }
              >
                {subItem.icon}
                {subItem.name}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
