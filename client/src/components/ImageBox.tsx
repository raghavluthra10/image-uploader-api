import * as React from "react";
import { Image } from "@chakra-ui/react";
import styled from "styled-components";
import If from "../components/If";
import { Button as ChakraButton, Flex } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

export interface IAppProps {
  src: string;
  alt: string;
  loading: boolean;
  // close: () =>
}

const Container = styled.div`
  display: flex;
  cursor: pointer;
  width: 100%;
  /* height: 100; */
  padding: 20px;
  border: 1px solid black;
  border-radius: 8px;
`;

export default function App({ src, alt, loading }: IAppProps) {
  console.log("isl;oading =>", loading);
  return (
    <React.Fragment>
      <If condition={loading}>
        <Flex alignItems="center" direction="column">
          <Spinner
            mt="124px"
            thickness="4px"
            speed="0.8s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      </If>
      <If condition={!loading}>
        <Container>
          <Image src={src} alt={alt} />
        </Container>
      </If>
    </React.Fragment>
  );
}
