"use client";

import { useState } from "react";
import Header from "../common/header";
import Sidebar from "../common/sidebar";
import Navbar from "../common/navbar";

const UiLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("authToken");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="w-full h-screen">
      <Header />
      <div className="flex w-full h-[90vh]">
        {!token && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}

        <div className="flex-1 overflow-x-auto">
          <Navbar />

          <div className="mt-3 p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default UiLayoutProvider;
