import * as React from "react";
import { Button as ChakraButton } from "@chakra-ui/react";
import If from "./If";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

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

// export interface IAppProps {}

export default function App() {
  React.useEffect(() => {
    console.log("navbar", Cookies.get("auth"));
  }, []);

  return (
    <Navbar>
      <Pages>
        <Link style={{ marginRight: "16px" }} to="/">
          Guest
        </Link>
        <Link style={{ marginRight: "16px" }} to="/home">
          Home
        </Link>

        <Link style={{ marginRight: "16px" }} to="/about">
          About
        </Link>
      </Pages>

      <Link to="/login">
        <ChakraButton>Login</ChakraButton>
      </Link>
    </Navbar>
  );
}
