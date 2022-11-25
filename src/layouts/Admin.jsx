import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import clsx from "clsx";
import RoleNavItem from "../components/sidebar/RoleNavItem";
import { MdOutlineDashboard } from "react-icons/md";
import { TbPackage } from "react-icons/tb";
import { FiLayers } from "react-icons/fi";
import { RiGroupLine } from "react-icons/ri";
import Photo from "../components/sidebar/Photo";

export default function Admin() {
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
          "flex flex-col gap-8 z-[7]",
          isSidebarOpen ? "left-20" : "-left-[220px]"
        )}
      >
        <button
          onClick={toggleSidebar}
          className="p-3 rounded-lg absolute top-4 -right-14 bg-[#4461F2] shadow-lg"
        >
          <GiHamburgerMenu className="text-xl text-white" />
        </button>
        <Photo />
        <nav className="grid gap-4">
          <RoleNavItem
            icon={<MdOutlineDashboard />}
            href="/admin/dashboard"
            text="Dashboard"
          />
          <RoleNavItem
            icon={<RiGroupLine />}
            href="/admin/users"
            text="Management Users"
          />
          <RoleNavItem
            icon={<TbPackage />}
            href="/admin/packages"
            text="Packages"
          />
          <RoleNavItem icon={<FiLayers />} href="/admin/shp" text="SHP" />
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
