import { useState, useRef, lazy, Suspense } from "react";
import { BsPerson, BsKey } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { Fade, Modal, Backdrop } from "@mui/material";
import Progress from "../loading/Progress";

const ProfileModal = lazy(() => import("./ProfileModal"));
const LogoutModal = lazy(() => import("./LogoutModal"));

export default function ProfileDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const container = useRef(null);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div ref={container} className="relative">
      <button
        className="flex items-center justify-center"
        onClick={handleDropdown}
        onBlur={() => setIsDropdownOpen(false)}
      >
        <BsPerson className="text-2xl" />
      </button>

      <Fade in={isDropdownOpen} {...(isDropdownOpen ? { timeout: 500 } : {})}>
        <div className="absolute right-0 top-12 bg-white rounded-md shadow-lg w-max py-2">
          <button
            className="flex items-center justify-start px-4 py-2 hover:bg-gray-100 w-full"
            onClick={() => setProfileModalOpen(true)}
          >
            <BsPerson className="text-xl mr-2" />
            <span className="text-sm">Profile</span>
          </button>
          <button
            className="flex items-center justify-start px-4 py-2 hover:bg-gray-100 w-full"
            onClick={() => setProfileModalOpen(true)}
          >
            <BsKey className="text-xl mr-2" />
            <span className="text-sm">Change Password</span>
          </button>
          <button
            className="flex items-center justify-start px-4 py-2 hover:bg-gray-100 w-full"
            onClick={() => setLogoutModalOpen(true)}
          >
            <ImExit className="text-xl mr-2 text-red-600" />
            <span className="text-sm text-red-600">Logout</span>
          </button>
        </div>
      </Fade>

      <Modal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Suspense fallback={<Progress />}>
          <ProfileModal />
        </Suspense>
      </Modal>

      <Modal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Suspense fallback={<Progress />}>
          <LogoutModal onClose={() => setLogoutModalOpen(false)} />
        </Suspense>
      </Modal>
    </div>
  );
}
