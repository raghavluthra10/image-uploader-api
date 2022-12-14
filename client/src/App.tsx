import React, { Fragment, useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Guest from "./pages/guest/Guest";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/notFound/NotFound";

function App() {
  const [userAuth, setUserAuth] = useState<boolean | null>(null);

  const checkIfUserIsAuthenticated = () => {
    const regexJwt = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

    // const cookie = Cookies.get("auth");
    const cookie = window.localStorage.getItem("Authenticate");
    if (cookie && regexJwt.test(cookie)) {
      setUserAuth(true);
    } else {
      setUserAuth(false);
    }
  };

  React.useEffect(() => {
    checkIfUserIsAuthenticated();
  }, []);

  return (
    <Fragment>
      <Navbar isLoggedIn={userAuth} setUserAuth={setUserAuth} />
      <Routes>
        <Route path="/" element={<Guest />} />
        <Route path="/about" element={<About />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login setUserAuth={setUserAuth} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* set body color to primary */}
      <style>{"body {background-color:var(--primary);}"}</style>
    </Fragment>
  );
}

export default App;
