import { InspectIcon, LayoutGridIcon, Settings } from 'lucide-react';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type BottomBarType = {
  icon: ReactNode;
  name: string;
  path: string;
};

const bottomBarItems: Array<BottomBarType> = [
  { icon: <LayoutGridIcon />, name: 'Dashboard', path: '/' },
  { icon: <InspectIcon />, name: 'Manajemen', path: '/product' },
  {
    icon: <Settings />,
    name: 'Settings',
    path: '/settings',
  },
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
      </div>
    </div>
  );
};

export default BottomTabBar;
