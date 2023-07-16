import { DashboardIcon } from '@/assets/icons';
import { buttonStyle } from '@/styles/buttonStyle';
import {
  CalculatorIcon,
  FileSpreadsheetIcon,
  MonitorDotIcon,
  PackageIcon,
  PackageSearchIcon,
  UserCogIcon,
  UserSquareIcon,
  UsersIcon,
} from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

type SidebarSubmenu = {
  icon: ReactNode;
  name: string;
  path: string;
  value?: string;
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
        icon: <DashboardIcon />,
        name: 'Dashboard',
        path: '/',
        value: '',
      },
      {
        icon: <CalculatorIcon className="mr-2 w-4 h-4" />,
        name: 'Pemesanan & Penjualan',
        path: '/transaction',
        value: 'transaction',
      },
      {
        icon: <FileSpreadsheetIcon className="mr-2 w-4 h-4" />,
        name: 'Pelaporan & Analisis',
        path: '/report',
        value: 'report',
      },
    ],
  },
  {
    title: 'Manajemen',
    submenu: [
      {
        icon: <PackageIcon className="mr-2 w-4 h-4" />,
        name: 'Produk',
        path: '/product',
        value: 'product',
      },
      {
        icon: <PackageSearchIcon className="mr-2 w-4 h-4" />,
        name: 'Stok',
        path: '/stock',
        value: 'stock',
      },
      {
        icon: <UserSquareIcon className="mr-2 w-4 h-4" />,
        name: 'Customer',
        path: '/customer',
        value: 'customer',
      },
      {
        icon: <UsersIcon className="mr-2 w-4 h-4" />,
        name: 'User',
        path: '/user',
        value: 'user',
      },
    ],
  },
  {
    title: 'Settings',
    submenu: [
      {
        icon: <MonitorDotIcon className="mr-2 w-4 h-4" />,
        name: 'Customize',
        path: '/customize',
        value: 'customize',
      },
      {
        icon: <UserCogIcon className="mr-2 w-4 h-4" />,
        name: 'Profile',
        path: '/profile',
        value: 'profile',
      },
    ],
  },
];

const Sidebar: NextPage = () => {
  const router = useRouter();
  const pathNow = router.pathname.split('/')[1];

  return (
    <div className="hidden w-64 pt-10 border-r p-4 scrollbar-hide border-gray-200 overflow-auto hover:overflow-scroll h-screen sm:block lg:block">
      {sidebarItem.map((item) => (
        <div className="py-3" key={item.title}>
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            {item.title}
          </h2>
          <div className="space-y-1">
            {item.submenu.map((subItem) => (
              <Link
                key={subItem.path}
                href={subItem.path}
                className={`flex items-center ${
                  pathNow === subItem.value
                    ? buttonStyle.buttonActive
                    : buttonStyle.buttonGhost
                }`}
              >
                {subItem.icon}
                {subItem.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
