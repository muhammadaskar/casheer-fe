import { FC } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

type LayoutProps = {
  mode: string | null;
  toggle: () => void;
};

const LayoutIndex: FC<LayoutProps> = ({ mode, toggle }) => {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto hover:overflow-scroll h-screen">
          <Header mode={mode} toggle={toggle} />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayoutIndex;
