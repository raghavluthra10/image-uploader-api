import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";

// export interface IAppProps {
//   // userAuth: boolean | null;
// }

export default function App(): any {
  const navigator = useNavigate();

  React.useEffect(() => {
    const token = window.localStorage.getItem("Authenticate");
    const regexJwt = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

    // const parsedToken = JSON.parse(token as string);

    if (!token) {
      console.log("token is falsy =>", typeof token);
      navigator("/login");
      return;
    }

    // if (!regexJwt.test(parsedToken)) {
    //   navigator("/login");
    //   return;
    // }
  }, []);

  return <Outlet />;
}
