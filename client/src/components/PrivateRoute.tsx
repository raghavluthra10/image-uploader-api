import * as React from "react";
import { Navigate } from "react-router-dom";

export interface IAppProps {
  component: React.FC;
  userAuth: boolean | null;
}

export default function App({
  component: Component,
  userAuth,
}: IAppProps): any {
  if (userAuth) {
    return <Component />;
  }
  return <Navigate to="/login" />;
}
