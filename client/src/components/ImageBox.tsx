import * as React from "react";
import { Image } from "@chakra-ui/react";
import styled from "styled-components";
import If from "../components/If";
import { Button as ChakraButton, Flex } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import DisplayImage from "./DisplayImage";
// import { Link, useNavigate } from "react-router-dom";
import { ImageInfo } from "../interfaces/user";

export interface IAppProps {
  src: string;
  alt: string;
  data: ImageInfo;
  // close: () =>
}

const Container = styled.div`
  display: flex;
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s;
    background-color: black;
  }
`;

export default function App({ src, alt, data }: IAppProps) {
  const [openImage, setOpenImage] = React.useState<boolean>(false);
  // const navigate = useNavigate();
  const viewImage = () => {
    setOpenImage(true);
    window.scrollTo(0, 0);
  };
  return (
    <React.Fragment>
      <Container onClick={viewImage}>
        <Image src={src} alt={alt} objectFit="contain" />
      </Container>
      <If condition={openImage}>
        <DisplayImage src={src} alt={alt} setOpenImage={setOpenImage} />
      </If>
    </React.Fragment>
  );
}
