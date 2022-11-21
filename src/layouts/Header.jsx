import ProfileDropdown from "../components/header/ProfileDropdown";

export default function Header() {
  return (
    <nav className="shadow-lg sticky top-0 h-20 flex justify-end items-center px-8 bg-white">
      <ProfileDropdown />
    </nav>
  );
}
