import person from "../../assets/images/person.svg";
import logoDark from "../../assets/images/logo-dark.svg";
import clsx from "clsx";
import { Link } from "react-router-dom";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { setUser, setGoogleToken } from "../../store/slices/user";
import { useDispatch } from "react-redux";
import { writeUserData } from "../../firebase/utils";
import app from "../../firebase";
import alert from "../../utils/alert";
import Title from "@/layouts/Title";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const formRef = useRef(null);

  const togglePassword = () => setShowPassword(!showPassword);
  const resetInput = () => (formRef.current[0].value = "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = formRef.current[0].value;
    const password = formRef.current[1].value;
    const confirmPassword = formRef.current[2].value;
    const company = formRef.current[3].value;

    if (password !== confirmPassword) {
      alert.error("Passwords do not match");
      return;
    } else {
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          writeUserData(user.uid, company, "user", user.displayName || null);
          alert.success("Register Success");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert.error(errorMessage);
        });
    }
  };

  const handleGoogleLogin = () => {
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
      <Title>Register - WebGIS Intellegence</Title>
      <aside className="relative w-full h-[300px] hidden lg:flex items-center">
        <div className="absolute h-[226px] w-[226px] bg-[#DDA82A] blur-[158.5px] z-[-3] left-[75px] -top-[27px]"></div>
        <div className="absolute h-[226px] w-[226px] bg-[#4461F2] blur-[158.5px] z-[-3] left-[279px] top-[200px]"></div>
        <div className="w-96">
          <h1 className="text-4xl font-bold">Register an Account</h1>
          <p className="mt-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum
          </p>
        </div>
        <img
          src={person}
          alt="person"
          className="h-[349px] absolute right-0 top-0 z-[-1]"
        />
      </aside>

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
                <a
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#667085] cursor-pointer"
                  onClick={togglePassword}
                >
                  {showPassword ? (
                    <AiOutlineEye className="text-2xl" />
                  ) : (
                    <AiOutlineEyeInvisible className="text-2xl" />
                  )}
                </a>
              </div>

              <div className="relative">
                <input
                  className={clsx(
                    "rounded-md px-4 py-2 w-full h-[60px]",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    "bg-[#EAF0F7]"
                  )}
                  placeholder="Retype Password"
                  type={showPassword ? "text" : "password"}
                  name="repassword"
                />
                <a
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#667085] cursor-pointer"
                  onClick={togglePassword}
                >
                  {showPassword ? (
                    <AiOutlineEye className="text-2xl" />
                  ) : (
                    <AiOutlineEyeInvisible className="text-2xl" />
                  )}
                </a>
              </div>

              <div className="relative">
                <input
                  className={clsx(
                    "rounded-md px-4 py-2 w-full h-[60px]",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    "bg-[#EAF0F7]"
                  )}
                  placeholder="Company"
                  type="text"
                  name="company"
                />
              </div>

              <p className="text-center text-[#C7C7C7] text-sm">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="hover:text-[#4461F2] font-semibold"
                >
                  Login
                </Link>
              </p>

              <button
                className="bg-[#4461F2] hover:bg-blue-700 h-[60px] text-white font-semibold py-2 rounded-md shadow-lg"
                type="submit"
              >
                Register
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
                onClick={handleGoogleLogin}
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
