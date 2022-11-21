import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase";
import alert from "../utils/alert";
export default function Home() {
  const navigate = useNavigate();
  const handleLogout = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        alert.success("Logged out successfully");
        navigate("/auth/login");
      })
      .catch((error) => {
        alert.error(error.message);
      });
  };

  return (
    <div>
      Home
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
