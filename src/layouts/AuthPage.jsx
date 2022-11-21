import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthPage() {
  return (
    <div>
      AuthPage
      <Outlet />
    </div>
  );
}
