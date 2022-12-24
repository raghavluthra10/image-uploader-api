import * as React from "react";
import { Image, Flex } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import styled from "styled-components";
import axios from "axios";
import axiosConfig from "../axios.config";

export interface IAppProps {
  src?: string;
  alt?: string;
  setOpenImage?: any;
}

const Container = styled.div`
  position: absolute;
  /* position: sticky; */
  border-radius: 8px;
  padding: 40px;
  /* height: 80vh; */
  width: 60%;
  overflow: hidden;
  top: 200px;
  box-shadow: 13px 52px 80px rgba(0, 0, 0, 0.15);
`;

export default function App({ src, alt, setOpenImage }: IAppProps) {
  console.log("open image =>", src, alt);
  const deleteImage = async () => {
    try {
      const response = await axios.delete(`${axiosConfig}/image`, {
        params: { firebase_public_url: src },
        headers: { auth: localStorage.getItem("Authenticate") },
        withCredentials: true,
      });
      console.log("delete image", response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Flex justifyContent="space-between" mb="24px">
        <RxCrossCircled
          onClick={() => setOpenImage(false)}
          size="32px"
          cursor="pointer"
        />
        <AiFillDelete onClick={deleteImage} cursor="pointer" size="32px" />
      </Flex>
      <Image src={src} alt={alt} objectFit="contain" />
    </Container>
  );
}
