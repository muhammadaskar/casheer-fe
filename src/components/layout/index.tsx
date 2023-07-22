import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const LayoutIndex = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto hover:overflow-scroll h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayoutIndex;
