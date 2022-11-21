import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="/user" element={<User />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/shp" element={<SHP />} />
          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/shp" element={<SHP />} />
          </Route>
          <Route path="/survey" element={<Survey />}>
            <Route path="/:id" element={<SurveyForm />} />
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
