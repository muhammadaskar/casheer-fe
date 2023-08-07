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
import Header from './Header';

type SidebarSubmenu = {
  icon: ReactNode;
  name: string;
  path: string;
};

type SidebarItemType = {
  title: string;
  submenu: Array<SidebarSubmenu>;
};

type LayoutProps = {
  mode: string | null;
  toggle: () => void;
};

const sidebarItem: Array<SidebarItemType> = [
  {
    title: 'Menu',
    submenu: [
      {
        icon: <LayoutGridIcon className="mr-2 w-4 h-4" />,
        name: 'Dashboard',
        path: '/',
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
        icon: <UserCogIcon className="mr-2 w-4 h-4" />,
        name: 'Profile',
        path: 'settings/profile',
      },
      {
        icon: <MonitorDotIcon className="mr-2 w-4 h-4" />,
        name: 'Customize',
        path: 'settings/customize',
      },
    ],
  },
];

const Sidebar: FC<LayoutProps> = ({ mode, toggle }) => {
  return (
    <>
      <Header mode={mode} toggle={toggle} />
      <aside className="hidden w-64 border-r px-4 py-12 scrollbar-hide overflow-auto hover:overflow-scroll h-screen md:block transition-all">
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
                    isActive
                      ? buttonStyle.buttonActive
                      : buttonStyle.buttonGhost
                  }
                >
                  {subItem.icon}
                  {subItem.name}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </aside>
    </>
  );
};

export default Sidebar;
