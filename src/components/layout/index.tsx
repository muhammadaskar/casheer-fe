import { FC } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import BottomTabBar from './BottomTabBar';
import { ScrollArea } from '../ui/scroll-area';

type LayoutProps = {
  mode: string | null;
  toggle: () => void;
};

const LayoutIndex: FC<LayoutProps> = ({ mode, toggle }) => {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <ScrollArea className="w-full flex-1 h-screen">
          <div className="pb-16">
            <Header mode={mode} toggle={toggle} />
            <Outlet />
          </div>
        </ScrollArea>
        <BottomTabBar />
      </div>
    </>
  );
};

export default LayoutIndex;
