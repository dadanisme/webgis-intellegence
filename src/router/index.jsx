import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/loading";

// layouts
const AuthLayout = lazy(() => import("../layouts/AuthPage"));
const UserSideBar = lazy(() => import("../layouts/User"));
const AdminSideBar = lazy(() => import("../layouts/Admin"));
const Header = lazy(() => import("../layouts/Header"));

// pages
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const UserDashboard = lazy(() => import("../pages/user/Dashboard"));
const UserPackages = lazy(() => import("../pages/user/Packages"));
const UserShp = lazy(() => import("../pages/user/Shp"));
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const AdminPackages = lazy(() => import("../pages/admin/Packages"));
const AdminUsers = lazy(() => import("../pages/admin/Users"));
const AdminShp = lazy(() => import("../pages/admin/Shp"));
const Survey = lazy(() => import("../pages/survey/Survey"));
const SurveyForm = lazy(() => import("../pages/survey/SurveyForm"));
const NotFound = lazy(() => import("../pages/NotFound"));

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route index element={<Home />} />
          <Route path="/" element={<Header />}>
            <Route path="/user" element={<UserSideBar />}>
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="packages" element={<UserPackages />} />
              <Route path="shp" element={<UserShp />} />
            </Route>
            <Route path="/admin" element={<AdminSideBar />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="packages" element={<AdminPackages />} />
              <Route path="shp" element={<AdminShp />} />
            </Route>
            <Route path="/survey" element={<Survey />}>
              <Route path=":id" element={<SurveyForm />} />
            </Route>
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
