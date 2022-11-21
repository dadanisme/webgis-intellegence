import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/user";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useSelector(selectUser);
  const navigate = useNavigate();

  if (user?.role === "admin") {
    navigate("/admin/dashboard");
  } else if (user?.role === "user") {
    navigate("/user/dashboard");
  } else {
    navigate("/user/dashboard");
  }

  return <></>;
}
