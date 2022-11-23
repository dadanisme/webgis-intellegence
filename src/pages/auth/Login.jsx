import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useState, useRef } from "react";
import {
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { setUser, setGoogleToken } from "../../store/slices/user";
import { useDispatch } from "react-redux";
import app from "../../firebase";
import alert from "../../utils/alert";
import SideImage from "../../components/auth/login/SideImage";
import logoDark from "../../assets/images/logo-dark.svg";
import clsx from "clsx";
import Title from "@/layouts/Title";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const formRef = useRef(null);

  const togglePassword = () => setShowPassword(!showPassword);
  const resetInput = () => (formRef.current[0].value = "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    const email = formRef.current[0].value;
    const password = formRef.current[1].value;

    e.preventDefault();

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(setUser(JSON.parse(JSON.stringify(user))));
        alert.success("Login Success");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert.error(errorMessage);
        console.log(errorCode, errorMessage);
      });
  };

  const handeGoogleLogin = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        dispatch(setUser(JSON.parse(JSON.stringify(user))));
        dispatch(setGoogleToken(token));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);

        alert.error(errorMessage);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen px-4 lg:px-16 gap-12">
      <Title>Login - WebGIS Intellegence</Title>
      <SideImage />
      <aside className="flex items-center justify-center">
        <div
          className="lg:h-[600px] flex items-center justify-center overflow-y-auto 
          p-10 shadow-2xl lg:w-[455px] rounded-xl bg-white"
        >
          <main>
            <figure className="w-full flex items-center justify-center">
              <img src={logoDark} alt="logo" className="w-[323px]" />
            </figure>

            <form
              className="mt-8 flex flex-col gap-3"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <div className="relative">
                <input
                  className={clsx(
                    "rounded-md px-4 py-2 w-full h-[60px]",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    "bg-[#EAF0F7]"
                  )}
                  placeholder="Email"
                  type="email"
                  name="email"
                />
                <AiOutlineCloseCircle
                  className="absolute right-4 top-1/2 text-2xl -translate-y-1/2 text-[#667085] cursor-pointer"
                  onClick={resetInput}
                />
              </div>

              <div className="relative">
                <input
                  className={clsx(
                    "rounded-md px-4 py-2 w-full h-[60px]",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    "bg-[#EAF0F7]"
                  )}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"
                  onClick={togglePassword}
                  type="button"
                >
                  {showPassword ? (
                    <AiOutlineEye className="text-2xl" />
                  ) : (
                    <AiOutlineEyeInvisible className="text-2xl" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <Link
                  to="/auth/register"
                  className="text-[#C7C7C7] text-sm font-semibold hover:text-[#4461F2]"
                >
                  Register
                </Link>
                <Link
                  to="/auth/forgot-password"
                  className="text-[#C7C7C7] text-sm font-semibold hover:text-[#4461F2]"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                className="bg-[#4461F2] hover:bg-blue-700 h-[60px] text-white font-semibold py-2 rounded-md shadow-lg"
                type="submit"
              >
                Sign In
              </button>
            </form>

            <div className="flex items-center justify-center mt-4">
              <div className="w-1/5 h-[1px] bg-[#C7C7C7]"></div>
              <span className="mx-2 text-[#C7C7C7] text-sm">
                Or continue with
              </span>
              <div className="w-1/5 h-[1px] bg-[#C7C7C7]"></div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                className="bg-[#F6F6F6] hover:bg-slate-100 text-white font-semibold py-3 rounded-md shadow-lg
                flex items-center justify-center w-full h-[60px]"
                type="button"
                onClick={handeGoogleLogin}
              >
                <FcGoogle className="text-2xl" />
              </button>
              <button
                className="bg-[#F6F6F6] hover:bg-slate-100 text-white font-semibold py-3 rounded-md shadow-lg
              flex items-center justify-center w-full h-[60px]"
                type="button"
              >
                <BsFacebook className="text-2xl text-[#1778F2]" />
              </button>
            </div>
          </main>
        </div>
      </aside>
    </div>
  );
}
