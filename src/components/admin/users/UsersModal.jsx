import { useEffect, useState, useRef } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import clsx from "clsx";
import { Avatar } from "@mui/material";
import { readUserData } from "../../../firebase/utils";
import { FaEdit } from "react-icons/fa";
import alert from "../../../utils/alert";
import { useDispatch } from "react-redux";
import { randomizeUpdateToken } from "../../../store/slices/app";
import { updateUserData } from "../../../firebase/utils";

export default function UsersModal({ data, onClose }) {
  const [user, setUser] = useState(null);
  const form = useRef(null);
  const dispatch = useDispatch();
  const api = import.meta.env.VITE_API;

  const handeEdit = async (e) => {
    e.preventDefault();

    const inputs = form.current;

    const name = inputs[0].value;
    const email = inputs[1].value;
    const company = inputs[2].value;

    const uid = data.localId;

    alert.info("Updating user data...");
    try {
      const res = await fetch(`${api}/user/${uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company,
        }),
      });

      const data = await res.json();

      updateUserData(uid, {
        company,
        displayName: name,
        email,
      });

      if (data.success) {
        alert.success("User updated successfully");
        dispatch(randomizeUpdateToken());
        onClose();
      } else {
        console.log(data);
        alert.error(data.error);
      }
    } catch (err) {
      console.log(err);
      alert.error(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (data.localId) {
      readUserData(data.localId).then((user) => {
        setUser(user.val());
      });
    }

    return () => {
      setUser(null);
    };
  }, [data.localId]);

  return (
    <div
      className="w-full md:w-3/5 md:h-96 bg-white fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 
      rounded-lg flex flex-col justify-center items-center"
    >
      <header className="w-full">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold">Edit User</h2>
          <button
            className="text-red-500 hover:text-red-600"
            onClick={() => onClose()}
          >
            <AiOutlineCloseCircle className="text-2xl" />
          </button>
        </div>
      </header>
      <hr className="w-full" />

      <main className="p-8 flex-1 w-full">
        <div className="flex gap-8 w-full items-center justify-center flex-col md:flex-row">
          <figure className="h-full flex flex-col items-center justify-center relative">
            <Avatar
              src={data.photoUrl}
              sx={{ width: 150, height: 150 }}
              className="rounded-full shadow-lg"
            />

            <button
              className="absolute right-2 bottom-2 bg-primary rounded-full shadow-lg
              p-2 flex items-center justify-center"
            >
              <FaEdit className="text-white text-sm relative left-[1px]" />
            </button>
          </figure>
          <form
            className="flex flex-col gap-2 flex-1 relative -top-2"
            ref={form}
            onSubmit={handeEdit}
          >
            <div>
              <label htmlFor="name" className="font-semibold text-gray-500">
                Name
              </label>
              <input
                className={clsx(
                  "rounded-md px-4 py-2 w-full h-[40px]",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  "bg-[#EAF0F7]"
                )}
                type="text"
                name="name"
                defaultValue={data.displayName}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="font-semibold text-gray-500">
                Email
              </label>
              <input
                className={clsx(
                  "rounded-md px-4 py-2 w-full h-[40px]",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  "bg-[#EAF0F7]"
                )}
                type="email"
                name="email"
                defaultValue={data.email}
                required
              />
            </div>

            <div>
              <label htmlFor="company" className="font-semibold text-gray-500">
                Company
              </label>
              <input
                className={clsx(
                  "rounded-md px-4 py-2 w-full h-[40px]",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  "bg-[#EAF0F7]"
                )}
                type="text"
                name="company"
                defaultValue={user?.company}
              />
            </div>
            <button
              className="bg-[#4461F2] hover:bg-blue-700 h-[40px] text-white font-semibold py-2 mt-2 rounded-md shadow-lg"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
