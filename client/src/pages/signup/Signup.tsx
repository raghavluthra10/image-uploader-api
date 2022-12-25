import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import If from "../../components/If";

import { useNavigate } from "react-router-dom";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useMutation } from "react-query";
import { signupUser } from "../../api/mutations";

// export interface IAppProps {}

const SignupContainer = styled.div`
  background-color: var(--primary);
  display: grid;
  place-content: center;
  margin-top: 102px;
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

interface SignupForm {
  email: string;
  password: string;
  name: string;
}

export default function App() {
  const [signupForm, setSignupForm] = React.useState<SignupForm>({
    email: "",
    password: "",
    name: "",
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const signUpMutation = useMutation({
    mutationFn: signupUser,
    onMutate: (variable) => {
      return variable;
    },
    onError: (error, variables, context) => {
      console.log(`error =>`, error, variables, context);
    },
    onSuccess: (data, variables, context) => {
      if (data) {
        navigate("/login");
      }
      console.log("success => ", data, variables, context);
    },
  });

  const signup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpMutation.mutate({
      name: signupForm.name,
      email: signupForm.email,
      password: signupForm.password,
    });
  };
  return (
    <SignupContainer>
      <Flex
        w="384px"
        boxShadow="2xl"
        p={10}
        borderRadius="xl"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Title>Sign up</Title>
        <form onSubmit={signup}>
          <InputForm>
            <label htmlFor="name">Name</label>
            <Input
              value={signupForm.name}
              onChange={(e) =>
                setSignupForm({ ...signupForm, name: e.target.value })
              }
              mt="8px"
              type="text"
              placeholder="Your name"
              name="name"
            />
          </InputForm>
          <InputForm>
            <label htmlFor="email">Email</label>
            <Input
              value={signupForm.email}
              onChange={(e) =>
                setSignupForm({ ...signupForm, email: e.target.value })
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
                value={signupForm.password}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, password: e.target.value })
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
            signup
          </Button>
        </form>
        <Box p="10px">
          Already a user? <Link to="/login">Click here</Link> to Login
        </Box>
      </Flex>
    </SignupContainer>
  );
}
