import { Outlet, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { MdDashboard } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import { RiSurveyLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/user";
import Header from "./Header";
import NavItem from "../components/sidebar/NavItem";
import { useState } from "react";
import clsx from "clsx";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
export default function MainLayout() {
  const location = useLocation();
  const { user } = useSelector(selectUser);

  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <aside
        className={clsx(
          "bg-[#4461F2] z-[1] h-screen w-20 absolute top-0 flex flex-col items-center",
          "transition-all duration-300 ease-in-out",
          showSidebar ? "left-0" : "-left-20"
        )}
      >
        {location.pathname === "/map" && (
          <button
            className="absolute top-8 hover:bg-gray-50 -right-8 bg-white rounded-full flex items-center justify-center p-1.5 shadow-lg"
            onClick={toggleSidebar}
          >
            {showSidebar ? (
              <BsChevronLeft className="text-xs" />
            ) : (
              <BsChevronRight className="text-xs" />
            )}
          </button>
        )}
        <figure className="flex items-center justify-center bg-[#FFFBFA] w-14 h-14 rounded-full mt-4 shadow-lg">
          <img src={logo} alt="logo" className="object-contain w-8 h-8" />
        </figure>

        <nav className="flex flex-col gap-4 mt-8">
          <NavItem
            icon={<MdDashboard />}
            href={
              user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
            }
            active={
              location.pathname === "/user/dashboard" ||
              location.pathname === "/admin/dashboard"
            }
          />

          <NavItem icon={<FaLayerGroup />} href="/map" />
          <NavItem icon={<RiSurveyLine />} href="/survey" />
        </nav>
      </aside>

      <div className={clsx("relative", showSidebar ? "ml-20" : "ml-0")}>
        {location.pathname !== "/map" && <Header />}
        <Outlet />
      </div>
    </div>
  );
}
