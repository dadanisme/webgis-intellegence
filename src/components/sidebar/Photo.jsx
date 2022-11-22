import { Avatar, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/user";

export default function Photo() {
  const { details } = useSelector(selectUser);
  return (
    <div className="flex justify-start">
      <figure className="relative flex items-center justify-center">
        <CircularProgress
          variant="determinate"
          value={75}
          size={70}
          className="absolute"
        />
        <Avatar
          src={details?.photoURL}
          sx={{ width: 65, height: 65 }}
          referrerPolicy="no-referrer"
        />
      </figure>
      <figcaption className="flex flex-col justify-center ml-4 overflow-hidden">
        <h1 className="text-md font-semibold">
          {details?.displayName || "No Name"}
        </h1>
        <p className="text-xs text-gray-500">{details?.email}</p>
      </figcaption>
    </div>
  );
}
