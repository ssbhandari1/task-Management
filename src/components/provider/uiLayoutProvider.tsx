"use client";
import { useState } from "react";
import Header from "../common/header";
import Sidebar from "../common/sidebar";
import Navbar from "../common/navbar";
import Loading from "../common/loading";
import { useAppSelector } from "@/hooks/redux.hooks";

const UiLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (loading) return <Loading />;

  return (
    <div className="w-full h-screen">
      <Header />
      <div className="flex w-full">
        {isAuthenticated && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
        <div className="flex-1 overflow-x-auto">
          <Navbar />
          <div className="mt-3 p-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default UiLayoutProvider;
