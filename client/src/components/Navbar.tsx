import * as React from "react";
import { Button as ChakraButton } from "@chakra-ui/react";
import If from "./If";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { checkAuth } from "../api/queries";

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  background-color: var(--secondary);
  /* height: 56px; */
  justify-content: space-between;
  padding: 12px 40px;
`;

const Pages = styled.div`
  display: flex;
  flex: 1;
  background-color: var(--secondary);
  color: var(--text-secondary);
`;

export interface IAppProps {
  isLoggedIn: boolean | null;
  setUserAuth: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export default function App({ setUserAuth, isLoggedIn }: IAppProps) {
  const navigate = useNavigate();

  const logoutUser = () => {
    Cookies.set("auth", "null");
    window.localStorage.removeItem("Authenticate");
    navigate("/");
    // set userAuth as false
    setUserAuth(false);
  };

  return (
    <React.Fragment>
      <Navbar>
        <Pages>
          <Link style={{ marginRight: "16px" }} to="/">
            Guest
          </Link>
          <If condition={isLoggedIn}>
            <Link style={{ marginRight: "16px" }} to="/home">
              Home
            </Link>
          </If>

          <Link style={{ marginRight: "16px" }} to="/about">
            About
          </Link>
        </Pages>

        <If condition={isLoggedIn}>
          <ChakraButton onClick={logoutUser}>Logout</ChakraButton>
        </If>

        <If condition={!isLoggedIn}>
          <Link to="/login">
            <ChakraButton>Login</ChakraButton>
          </Link>
        </If>
      </Navbar>
    </React.Fragment>
  );
}
