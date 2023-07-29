import {
  CalculatorIcon,
  FileSpreadsheetIcon,
  LayoutGridIcon,
  PackageIcon,
} from 'lucide-react';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type BottomBarType = {
  icon: ReactNode;
  name: string;
  path: string;
};

const bottomBarItems: Array<BottomBarType> = [
  { icon: <LayoutGridIcon />, name: 'Dashboard', path: '/' },
  { icon: <CalculatorIcon />, name: 'Transaksi', path: '/transaction' },
  {
    icon: <FileSpreadsheetIcon />,
    name: 'Pelaporan & Analisis',
    path: '/report',
  },
  { icon: <PackageIcon />, name: 'Produk', path: '/product' },
];

const BottomTabBar = () => {
  return (
    <div className="block fixed w-full border-t h-12 bottom-0 bg-background md:hidden">
      <div className="h-full flex flex-row justify-between items-center px-14">
        {bottomBarItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive ? '' : 'text-muted-foreground/70'
            }
          >
            {item.icon}
          </NavLink>
        ))}
        {/* <LayoutGridIcon className="" />
        <CalculatorIcon className=" text-muted-foreground/70" />
        <FileSpreadsheetIcon className="text-muted-foreground/70" />
        <PackageIcon className="text-muted-foreground/70" /> */}
      </div>
    </div>
  );
};

export default BottomTabBar;
