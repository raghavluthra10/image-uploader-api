import * as React from "react";
import { Image, Flex } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import styled from "styled-components";
import axios from "axios";
import axiosConfig from "../axios.config";
import { useMutation, useQuery } from "react-query";
import { deleteImage } from "../api/mutations";
import { getAllImagesOfAUser } from "../api/queries";

export interface IAppProps {
  src?: string;
  alt?: string;
  setOpenImage?: any;
}

const Container = styled.div`
  position: absolute;
  border-radius: 8px;
  padding: 40px;
  width: 60%;
  overflow: hidden;
  top: 200px;
  box-shadow: 13px 52px 80px rgba(0, 0, 0, 0.15);
`;

export default function App({ src, alt, setOpenImage }: IAppProps) {
  const fetchAllImagesOfMe = useQuery({
    queryKey: ["getMyImages"],
    queryFn: getAllImagesOfAUser,
    refetchOnWindowFocus: false,
  });

  const deleteImageMutation = useMutation({
    mutationFn: deleteImage,
    onMutate: (variable) => {
      return variable;
    },
    onError: (error, variables, context) => {
      console.log("error =>", error, variables, context);
    },
    onSuccess: async (data, variables, context) => {
      // close the opened image
      setOpenImage(false);
      // refetch and display content
      fetchAllImagesOfMe.refetch();
      console.log("success => ", data, variables, context);
    },
  });

  const deleteImageOnClick = async () => {
    deleteImageMutation.mutate(src as string);
  };

  return (
    <Container>
      <Flex justifyContent="space-between" mb="24px">
        <RxCrossCircled
          onClick={() => setOpenImage(false)}
          size="32px"
          cursor="pointer"
        />
        <AiFillDelete
          onClick={deleteImageOnClick}
          cursor="pointer"
          size="32px"
        />
      </Flex>
      <Image src={src} alt={alt} objectFit="contain" />
    </Container>
  );
}
