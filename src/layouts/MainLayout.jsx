import { Outlet, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { MdDashboard } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import { RiSurveyLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/user";
import Header from "./Header";
import NavItem from "../components/sidebar/NavItem";

export default function MainLayout() {
  const location = useLocation();
  const { user } = useSelector(selectUser);
  return (
    <div>
      <aside className="bg-[#4461F2] z-[1] h-screen w-20 absolute left-0 top-0 flex flex-col items-center">
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

      <div className="ml-20 relative">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
