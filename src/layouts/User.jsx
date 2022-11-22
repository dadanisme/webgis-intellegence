import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import clsx from "clsx";
import RoleNavItem from "../components/sidebar/RoleNavItem";
import { MdOutlineDashboard } from "react-icons/md";
import { TbPackage } from "react-icons/tb";
import { FiLayers } from "react-icons/fi";
import Photo from "../components/sidebar/Photo";

export default function User() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <aside
        className={clsx(
          "h-screen bg-white shadow-lg w-[300px] fixed top-0",
          "transition-all duration-300 ease-in-out p-6",
          "flex flex-col gap-8 z-[2]",
          isSidebarOpen ? "left-20" : "-left-[220px]"
        )}
      >
        <button
          onClick={toggleSidebar}
          className="p-3 rounded-lg absolute top-4 -right-14 bg-[#4461F2]"
        >
          <GiHamburgerMenu className="text-xl text-white" />
        </button>
        <Photo />
        <nav className="grid gap-4">
          <RoleNavItem
            icon={<MdOutlineDashboard />}
            href="/user/dashboard"
            text="Dashboard"
          />
          <RoleNavItem
            icon={<TbPackage />}
            href="/user/packages"
            text="Packages"
          />
          <RoleNavItem icon={<FiLayers />} href="/user/shp" text="SHP" />
        </nav>
      </aside>
      <div
        className={clsx(
          "transition-all duration-300 ease-in-out",
          isSidebarOpen && "ml-[300px]"
        )}
      >
        <Outlet />
      </div>
    </>
  );
}
