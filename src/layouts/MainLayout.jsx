import { Outlet, useLocation, Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import { MdDashboard } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import { RiSurveyLine } from "react-icons/ri";
import clsx from "clsx";

export default function MainLayout() {
  const location = useLocation();
  return (
    <div>
      <aside className="bg-[#4461F2] h-screen w-20 absolute left-0 top-0 flex flex-col items-center">
        <figure className="flex items-center justify-center bg-[#FFFBFA] w-14 h-14 rounded-full mt-4 shadow-lg">
          <img src={logo} alt="logo" className="object-contain w-8 h-8" />
        </figure>

        <nav className="flex flex-col gap-4 mt-8">
          <NavItem
            icon={<MdDashboard />}
            href="/"
            active={
              location.pathname === "/user/dashboard" ||
              location.pathname === "/admin/dashboard"
            }
          />

          <NavItem icon={<FaLayerGroup />} href="/map" />
          <NavItem icon={<RiSurveyLine />} href="/survey" />
        </nav>
      </aside>
      <div className="ml-20">
        <Outlet />
      </div>
    </div>
  );
}

function NavItem({ icon, href, active = false }) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link to={href}>
      <button
        className={clsx(
          "flex items-center justify-center w-14 h-14 rounded-full text-white text-2xl",
          (active || isActive) && "bg-[#FFFBFA] shadow-lg text-[#4461F2]"
        )}
      >
        {icon}
      </button>
    </Link>
  );
}
