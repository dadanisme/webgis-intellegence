import React from "react";
import { Outlet } from "react-router-dom";

export default function User() {
  return (
    <div>
      User
      <Outlet />
    </div>
  );
}
