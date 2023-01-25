import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";

// export interface IAppProps {
//   // userAuth: boolean | null;
// }

export default function App(): any {
  const navigator = useNavigate();

  React.useEffect(() => {
    const token = window.localStorage.getItem("Authenticate");

    if (!token) {
      navigator("/login");
      return;
    }
  }, []);

  return <Outlet />;
}
