import * as React from "react";
import { useNavigate } from "react-router-dom";

// interface IAppProps {}

export default function useLoggedIn() {
  const navigator = useNavigate();

  React.useEffect(() => {
    const regexJwt = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

    const cookie = window.localStorage.getItem("Authenticate");
    if (cookie && regexJwt.test(cookie)) {
      navigator("/home");
      return;
    }
  }, []);
}
// tell user logged in or not on load for the first time
// inform every time the auth status changes
