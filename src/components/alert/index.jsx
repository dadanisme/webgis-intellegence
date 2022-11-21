import { Alert, AlertTitle, Slide } from "@mui/material";
import { selectAlert, clearAlert } from "../../store/slices/alert";
import { useDispatch, useSelector } from "react-redux";

export default function Notification() {
  const dispatch = useDispatch();
  const { title, message, show, type } = useSelector(selectAlert);

  return (
    <div className="fixed top-6 right-6">
      <Slide
        direction="left"
        in={show}
        mountOnEnter
        unmountOnExit
        onExited={() => dispatch(clearAlert())}
      >
        <Alert severity={type} onClose={() => dispatch(clearAlert())}>
          {Boolean(title) && <AlertTitle>{title}</AlertTitle>}
          {message}
        </Alert>
      </Slide>
    </div>
  );
}
