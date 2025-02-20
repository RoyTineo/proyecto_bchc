import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
const MainLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 bg-slate-200 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
