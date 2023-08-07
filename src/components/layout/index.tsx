import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import BottomTabBar from './BottomTabBar';
import { ScrollArea } from '../ui/scroll-area';
import { FC } from 'react';

type LayoutProps = {
  mode: string | null;
  toggle: () => void;
};

const LayoutIndex: FC<LayoutProps> = ({ mode, toggle }) => {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar mode={mode} toggle={toggle} />
        <ScrollArea className="w-full flex-1 h-screen">
          <div className="py-12 px-1 md:px-0">
            <Outlet />
          </div>
        </ScrollArea>
        <BottomTabBar />
      </div>
    </>
  );
};

export default LayoutIndex;
