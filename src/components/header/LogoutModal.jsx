import app from "../../firebase";
import { getAuth, signOut } from "firebase/auth";
import alert from "../../utils/alert";
import { useNavigate } from "react-router-dom";

export default function LogoutModal({ onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        navigate("/auth/login");
        alert.success("Logout success");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      className="w-96 h-40 bg-white backdrop-blur-sm rounded-lg shadow-lg
      fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
    >
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-semibold">Are you sure?</h1>
        <div className="flex items-center justify-center gap-2">
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mt-4"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg mt-4"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
