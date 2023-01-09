import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import If from "../../components/If";
import Toast from "../../components/Toast";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useMutation } from "react-query";

import { LoginForm } from "../../interfaces";
import { loginUser } from "../../api/mutations";

import { useNavigate } from "react-router-dom";
// export interface IAppProps {}

const LoginContainer = styled.div`
  background-color: var(--primary);
  display: grid;
  place-content: center;
  min-height: 100vh;
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

interface IAppProps {
  setUserAuth: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export default function App({ setUserAuth }: IAppProps) {
  const [loginForm, setLoginForm] = React.useState<LoginForm>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const toast = useToast();

  const navigate = useNavigate();

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onMutate: (variable) => {
      return variable;
    },
    onError: (error, variables, context) => {
      console.log(`error =>`, error, variables, context);
    },
    onSuccess: (data, variables, context) => {
      if (data.success === false) {
        toast({
          duration: 3000,
          render: () => (
            <Toast
              toastColor="red.500"
              title="Not found"
              description="Please Sign up or use an existing account!"
            />
          ),
        });
        return;
      }

      navigate("/home");
      // set userAuth as true
      setUserAuth(true);
    },
  });

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(loginForm.email && loginForm.password)) {
      return toast({
        duration: 3000,
        render: () => (
          <Toast
            toastColor="red.500"
            description="Please provide all login credentials"
          />
        ),
      });
    }
    loginUserMutation.mutate({
      email: loginForm.email,
      password: loginForm.password,
    });
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
            <InputGroup>
              <Input
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                type={showPassword ? "text" : "password"}
                mt="8px"
                placeholder="*******"
                name="password"
              />
              <InputRightElement
                w="20px"
                h="20px"
                mt="18px"
                mr="10px"
                onClick={(): void => setShowPassword(!showPassword)}
                children={
                  <React.Fragment>
                    <If condition={showPassword}>
                      <AiOutlineEye />
                    </If>
                    <If condition={!showPassword}>
                      <AiOutlineEyeInvisible />
                    </If>
                  </React.Fragment>
                }
              />
            </InputGroup>
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
