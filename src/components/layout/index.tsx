import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const LayoutIndex = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="hidden sm:block flex-1 h-full ml-64">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayoutIndex;
