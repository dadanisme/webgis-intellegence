import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/user";

export default function Greeting() {
  const { details } = useSelector(selectUser);
  return (
    <h1 className="text-xl font-semibold">
      Welcome back, {details?.displayName || "No Name"}!
    </h1>
  );
}
