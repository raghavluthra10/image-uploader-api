import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";

export interface IAppProps {
  userAuth: boolean | null;
}

export default function App(userAuth: IAppProps): any {
  console.log("private route = == = =>", userAuth);
  // return userAuth.userAuth ? <Outlet /> : <Navigate to="/login" />;
  if (userAuth.userAuth === false || userAuth.userAuth === null) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
