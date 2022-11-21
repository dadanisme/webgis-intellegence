import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser, clearUser } from "../store/slices/user";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";
import alert from "../utils/alert";
import app from "../firebase";

export default function AuthLayout() {
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const authPages = [
        "/auth/login",
        "/auth/register",
        "/auth/forgot-password",
      ];
      if (user) {
        dispatch(setUser(JSON.parse(JSON.stringify(user))));
        if (authPages.includes(location.pathname)) {
          alert.info("You are already logged in");
          navigate("/");
        }
      } else {
        dispatch(clearUser());
        if (!authPages.includes(location.pathname)) {
          alert.error("You need to login first");
          navigate("/login");
        }
      }
    });
  }, [dispatch, navigate, location.pathname, auth]);

  return <Outlet />;
}
