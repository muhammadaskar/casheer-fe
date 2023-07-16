import DashboardIcon from '@/assets/icons/DashboardIcon';
import { buttonStyle } from '@/styles/buttonStyle';
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
        icon: <DashboardIcon />,
        name: 'Pemesanan & Penjualan',
        path: '/transaction',
        value: 'transaction',
      },
      {
        icon: <DashboardIcon />,
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
        icon: <DashboardIcon />,
        name: 'Produk',
        path: '/product',
        value: 'product',
      },
      {
        icon: <DashboardIcon />,
        name: 'Stok',
        path: '/stock',
        value: 'stock',
      },
      {
        icon: <DashboardIcon />,
        name: 'Customer',
        path: '/customer',
        value: 'customer',
      },
      {
        icon: <DashboardIcon />,
        name: 'User',
        path: '/user',
        value: 'user',
      },
    ],
  },
];

const Sidebar: NextPage = () => {
  const router = useRouter();
  const pathNow = router.pathname.split('/')[1];

  return (
    <div className="hidden w-64 pt-10 border-r p-4 scrollbar-hide border-gray-200 overflow-auto hover:overflow-scroll h-screen sm:block lg:block">
      {/* Menu */}
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
                className={`${
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
