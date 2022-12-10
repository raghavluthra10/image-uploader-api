import { Box, Button, Flex, Input } from "@chakra-ui/react";
import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// export interface IAppProps {}

const LoginContainer = styled.div`
  background-color: var(--primary);
  display: grid;
  place-content: center;
  margin-top: 144px;
`;

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 2em;
  font-weight: 600;
  align-self: center;
  margin-bottom: 32px;
`;

interface LoginForm {
  email: string;
  password: string;
}

export default function App() {
  const [loginForm, setLoginForm] = React.useState<LoginForm>({
    email: "",
    password: "",
  });

  const login = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("form", loginForm);
    console.log("Login");
  };
  return (
    <LoginContainer>
      <Flex
        w="384px"
        boxShadow="2xl"
        p={10}
        borderRadius="xl"
        // h="400px"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Title>Login</Title>
        <form onSubmit={login}>
          <InputForm>
            <label htmlFor="email">Email</label>
            <Input
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
              mt="8px"
              type="email"
              placeholder="example@email.com"
              name="email"
            />
          </InputForm>
          <InputForm>
            <label htmlFor="password">Password</label>
            <Input
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              type="password"
              mt="8px"
              placeholder="*******"
              name="password"
            />
          </InputForm>
          <Button
            type="submit"
            w="100%"
            bgColor="var(--secondary)"
            color="var(--text-secondary)"
            _hover={{
              color: "var(--text-primary)",
              bgColor: "var(--primary)",
              border: "1px solid var(--secondary)",
            }}
          >
            Login
          </Button>
        </form>
        <Box p="10px">
          Not registered? <Link to="/signup">Click here</Link> to Sign Up
        </Box>
      </Flex>
    </LoginContainer>
  );
}
