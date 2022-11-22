import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUserDetails, clearUser, setUser } from "../store/slices/user";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { readUserData } from "../firebase/utils";
import alert from "../utils/alert";
import app from "../firebase";

export default function AuthLayout() {
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUserDetails(JSON.parse(JSON.stringify(user))));

        readUserData(user.uid).then((doc) => {
          if (doc.exists) {
            const userData = doc.val();
            dispatch(setUser(userData));

            // conditionally redirect user to dashboard
            const adminInUserPage =
              userData?.role === "admin" &&
              location.pathname.startsWith("/user");
            const userInAdminPage =
              userData?.role === "user" &&
              location.pathname.startsWith("/admin");
            const userDoesntHaveRole =
              !userData?.role && location.pathname.startsWith("/admin");

            if (adminInUserPage) {
              navigate("/admin/dashboard");
            } else if (userInAdminPage) {
              navigate("/user/dashboard");
            } else if (userDoesntHaveRole) {
              navigate("/user/dashboard");
            }
          } else {
            alert.error("User not found");
          }
        });

        const authPages = ["/auth/login"];
        if (authPages.includes(location.pathname)) {
          alert.info("You are already logged in");
          navigate("/");
        }
      } else {
        dispatch(clearUser());
        const authPages = [
          "/auth/login",
          "/auth/register",
          "/auth/forgot-password",
        ];
        if (!authPages.includes(location.pathname)) {
          alert.error("You need to login first");
          navigate("/auth/login");
        }
      }
    });
  }, [dispatch, navigate, location.pathname, auth]);

  return <Outlet />;
}
