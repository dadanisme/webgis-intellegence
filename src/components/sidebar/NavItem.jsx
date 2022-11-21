import { useLocation, Link } from "react-router-dom";
import clsx from "clsx";

export default function NavItem({ icon, href, active = false }) {
  const location = useLocation();
  const isActive = location.pathname.split("/")[1] === href.split("/")[1];

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
