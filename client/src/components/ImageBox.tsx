import * as React from "react";
import { Image, useDisclosure } from "@chakra-ui/react";
import styled from "styled-components";
import If from "../components/If";
import { useMutation, useQuery } from "react-query";
import {
  Button as ChakraButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
// import { Link, useNavigate } from "react-router-dom";
import { ImageInfo } from "../interfaces";
import { getAllImagesOfAUser } from "../api/queries";
import { deleteImage } from "../api/mutations";

export interface IAppProps {
  src: string;
  alt: string;
}

const Container = styled.div`
  display: flex;
  cursor: pointer;
  width: 100%;
  max-height: 100%;
  border-radius: 16px;
  overflow: hidden;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s;
    background-color: black;
  }
`;

export default function App({ src, alt }: IAppProps) {
  // const [openImage, setOpenImage] = React.useState<boolean>(false);
  // const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

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
      // refetch and display content
      fetchAllImagesOfMe.refetch();

      // close the opened image
      if (closeButtonRef.current != null) {
        closeButtonRef.current.click();
      }
      console.log("success => ", data, variables, context);
    },
  });

  const deleteImageOnClick = async () => {
    deleteImageMutation.mutate(src as string);
    console.log("delete button");
  };

  return (
    <React.Fragment>
      <Container onClick={onOpen}>
        <Image src={src} alt={alt} objectFit="cover" />
      </Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="var(--primary)">
          <ModalBody p="44px">
            <Image src={src} alt={alt} objectFit="cover" />
          </ModalBody>

          <ModalFooter>
            <ChakraButton
              bg="var(--secondary)"
              color="white"
              border="1px solid var(--secondary)"
              _hover={{
                border: "1px solid black",
                color: "black",
                backgroundColor: "white",
              }}
              mr={3}
              onClick={onClose}
              ref={closeButtonRef}
            >
              Close
            </ChakraButton>
            <ChakraButton variant="ghost" onClick={deleteImageOnClick}>
              Delete
            </ChakraButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
}
