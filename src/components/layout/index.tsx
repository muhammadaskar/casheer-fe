import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import BottomTabBar from './BottomTabBar';
import { ScrollArea } from '../ui/scroll-area';

const LayoutIndex = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <ScrollArea className="w-full flex-1 h-screen">
          <div className="pb-32 px-1 md:px-0">
            <Outlet />
          </div>
        </ScrollArea>
        <BottomTabBar />
      </div>
    </>
  );
};

export default LayoutIndex;
