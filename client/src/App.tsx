import { Fragment, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Guest from "./pages/guest/Guest";
import { Routes, Route, Link } from "react-router-dom";
import { Box, Button as ChakraButton } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Guest />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Fragment>
  );
}

export default App;
