import { buttonStyle } from '@/styles';

import { NavLink, Outlet } from 'react-router-dom';
import { Separator } from '../ui/separator';
import { FC } from 'react';
import Header from './Header';

type LayoutProps = {
  mode: string | null;
  toggle: () => void;
};

type SettingLayoutType = {
  name: string;
  path: string;
};

const layoutItem: Array<SettingLayoutType> = [
  { name: 'Profile', path: 'profile' },
  { name: 'Account', path: 'account' },
  { name: 'Customize', path: 'customize' },
];

const SettingLayout: FC<LayoutProps> = ({ mode, toggle }) => {
  return (
    <>
      <Header mode={mode} toggle={toggle} />
      <div className="hidden space-y-6 px-10 py-16 md:block">
        <div className="space-y-0.5">
          <h1 className="hidden font-semibold tracking-tight text-2xl md:block">
            Settings
          </h1>
          <p className="text-sm text-muted-foreground hidden md:block">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
              {layoutItem.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? buttonStyle.buttonActive
                      : buttonStyle.buttonGhost
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingLayout;
