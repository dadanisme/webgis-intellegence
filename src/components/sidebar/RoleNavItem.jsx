import { useLocation, Link } from "react-router-dom";
import clsx from "clsx";

export default function RoleNavItem({ icon, href, active = false, text }) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link to={href} className="flex items-center gap-4">
      <button
        className={clsx(
          "flex items-center justify-center w-14 h-14 rounded-full text-2xl",
          "shadow-lg",
          (active || isActive) && "bg-[#4461F2] shadow-lg text-[#FFFBFA]"
        )}
      >
        {icon}
      </button>
      <p className="text-left font-semibold">{text}</p>
    </Link>
  );
}
